import json
from llm import generate_with_mistral
from style_engine import build_user_style_profile
from persona import extract_persona
from models import OutreachHistory
from spam_checker import analyze_spam_risk
from sqlalchemy.orm import Session


def generate_platform_message(
    user_id: int,
    platform: str,
    user_input: str,
    profile_text: str,
    db: Session
):
    # Step 1: Learn user style
    style_profile = build_user_style_profile(user_id, db)

    # Step 2: Extract persona if profile given
    persona_data = None
    if profile_text:
        persona_data = extract_persona(profile_text)

    # Step 3: Platform-specific instructions
    platform_instruction = {
        "email": "Write a full cold email with 3 subject lines.",
        "whatsapp": "Write a short WhatsApp message, conversational style.",
        "linkedin": "Write a concise LinkedIn DM (max 120 words).",
        "instagram": "Write a friendly Instagram DM."
    }.get(platform.lower(), "Write a professional message.")

    prompt = f"""
You are an expert outreach assistant.

User style preferences:
- Average length: {style_profile['avg_length']} words
- Emoji preference: {style_profile['emoji_preference']}
- Tone preference: {style_profile['tone_preference']}
- CTA preference: {style_profile['cta_preference']}

Platform: {platform}
Instruction: {platform_instruction}

User request:
{user_input}

Persona:
{json.dumps(persona_data, indent=2) if persona_data else "Not provided"}

Generate the message accordingly.
Return only the final message text.
"""

    # Step 4: Generate message
    message = generate_with_mistral(prompt)

    # Step 5: Analyze spam risk
    spam_result = analyze_spam_risk(message)

    # Step 6: Extract industry safely
    industry_value = None
    if persona_data is not None and "industry" in persona_data:
        industry_value = persona_data["industry"]

    # Step 7: Save to DB
    history_entry = OutreachHistory(
        user_id=user_id,
        platform=platform,
        industry=industry_value,
        email_body=message,
        tone=style_profile["tone_preference"],
        cta_type=style_profile["cta_preference"],
        spam_level=spam_result["spam_level"],
        message_length=len(message.split()),
        emoji_count=0  # simple placeholder for now
    )

    db.add(history_entry)
    db.commit()

    # Step 8: Return response
    return {
        "platform": platform,
        "style_profile_used": style_profile,
        "spam_analysis": spam_result,
        "generated_message": message
    }
