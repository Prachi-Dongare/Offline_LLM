from sqlalchemy.orm import Session
from models import OutreachHistory, IndustryPlaybook
from llm import generate_with_mistral
from collections import Counter


def update_industry_playbook(industry: str, db: Session):
    records = (
        db.query(OutreachHistory)
        .filter(OutreachHistory.industry == industry)
        .all()
    )

    if not records:
        return None

    tones = []
    ctas = []
    lengths = []

    for r in records:
        if r.tone:
            tones.append(r.tone)
        if r.cta_type:
            ctas.append(r.cta_type)
        if r.message_length:
            lengths.append(r.message_length)

    most_common_tone = Counter(tones).most_common(1)[0][0] if tones else "professional"
    most_common_cta = Counter(ctas).most_common(1)[0][0] if ctas else "soft"
    average_length = sum(lengths) // len(lengths) if lengths else 150

    # Generate AI insight summary
    prompt = f"""
Analyze outreach performance trends for {industry} industry.

Most common tone: {most_common_tone}
Most common CTA: {most_common_cta}
Average message length: {average_length}

Generate a short strategic insight explaining why this pattern might work.
"""

    ai_summary = generate_with_mistral(prompt)

    existing = (
        db.query(IndustryPlaybook)
        .filter(IndustryPlaybook.industry == industry)
        .first()
    )

    if existing:
        existing.most_common_tone = most_common_tone
        existing.most_common_cta = most_common_cta
        existing.average_length = average_length
        existing.ai_insight_summary = ai_summary
    else:
        new_playbook = IndustryPlaybook(
            industry=industry,
            most_common_tone=most_common_tone,
            most_common_cta=most_common_cta,
            average_length=average_length,
            ai_insight_summary=ai_summary
        )
        db.add(new_playbook)

    db.commit()

    return {
        "industry": industry,
        "most_common_tone": most_common_tone,
        "most_common_cta": most_common_cta,
        "average_length": average_length,
        "ai_summary": ai_summary
    }
