import json
from llm import generate_with_mistral
from style_engine import build_user_style_profile
from persona import extract_persona
from models import OutreachHistory
from spam_checker import analyze_spam_risk
from sqlalchemy.orm import Session

def detect_intent(user_input: str):
    text = user_input.lower()

    if any(word in text for word in ["hi", "hello", "hey"]):
        return "greeting"

    if "birthday" in text:
        return "birthday"

    if "cold email" in text or "outreach" in text:
        return "cold_outreach"

    return "general"


def generate_platform_message(
    user_id: int,
    platform: str,
    user_input: str,
    profile_text: str,
    db: Session
):

    # 1️⃣ Learn user style
    style_profile = build_user_style_profile(user_id, db)

    # 2️⃣ Extract persona
    persona_data = None
    if profile_text:
        persona_data = extract_persona(profile_text)

    # 3️⃣ Detect intent
    intent = detect_intent(user_input)

    # 4️⃣ Platform behavior rules
    platform_rules = {
        "email": "Professional but modern. Avoid stiff corporate tone.",
        "whatsapp": "Conversational, short, friendly.",
        "linkedin": "Professional but natural. Not robotic.",
        "instagram": "Casual, engaging, slightly energetic."
    }.get(platform.lower(), "Natural conversational response.")

    # 5️⃣ Intent behavior rules
    if intent == "greeting":
        intent_rule = """
Reply like a smart, friendly assistant.
Keep it under 2 sentences.
Use at most 1 emoji.
Sound human and natural.
"""

    elif intent == "birthday":
        intent_rule = """
Write a warm, natural birthday message.
Keep under 80 words.
Use 2-3 emojis maximum.
Sound personal and modern.
"""

    elif intent == "cold_outreach":
        intent_rule = """
Write a persuasive but concise outreach message.
No fluff.
No generic phrases.
Make it specific and relevant.
Avoid phrases like:
- "I hope this message finds you well"
- "Dear Sir/Madam"
"""

    else:
        intent_rule = """
Respond naturally and directly.
Avoid corporate template language.
Keep it concise unless user asks for detailed response.
"""

    # 6️⃣ Build stronger prompt
    prompt = f"""
You are a high-quality conversational AI assistant.

You MUST:
- Avoid generic templates.
- Avoid robotic tone.
- Avoid corporate clichés.
- Write like a real human would in 2026.
- Keep responses engaging and natural.
- Adapt tone based on platform.

User Style Preferences:
- Average Length: {style_profile['avg_length']}
- Emoji Preference: {style_profile['emoji_preference']}
- Tone: {style_profile['tone_preference']}
- CTA Type: {style_profile['cta_preference']}

Platform: {platform}
Platform Rule: {platform_rules}

Intent Rule:
{intent_rule}

User Input:
{user_input}

Persona:
{json.dumps(persona_data, indent=2) if persona_data else "None"}

Return ONLY the final message text.
"""

    # 7️⃣ Generate from Mistral
    message = generate_with_mistral(prompt)

    # 8️⃣ Spam Analysis
    spam_result = analyze_spam_risk(message)

    # 9️⃣ Industry extraction
    industry_value = None
    if persona_data and "industry" in persona_data:
        industry_value = persona_data["industry"]

    # 🔟 Save history
    history_entry = OutreachHistory(
        user_id=user_id,
        platform=platform,
        industry=industry_value,
        email_body=message,
        tone=style_profile["tone_preference"],
        cta_type=style_profile["cta_preference"],
        spam_level=spam_result["spam_level"],
        message_length=len(message.split()),
        emoji_count=message.count("😀")  # simple placeholder
    )

    db.add(history_entry)
    db.commit()

    return {
        "platform": platform,
        "style_profile_used": style_profile,
        "spam_analysis": spam_result,
        "generated_message": message
    }
