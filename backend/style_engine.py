from sqlalchemy.orm import Session
from models import OutreachHistory
import re


def count_emojis(text):
    emoji_pattern = re.compile(
        "["
        u"\U0001F600-\U0001F64F"
        u"\U0001F300-\U0001F5FF"
        u"\U0001F680-\U0001F6FF"
        u"\U0001F700-\U0001F77F"
        u"\U0001F780-\U0001F7FF"
        u"\U0001F800-\U0001F8FF"
        u"\U0001F900-\U0001F9FF"
        u"\U0001FA00-\U0001FAFF"
        u"\U00002700-\U000027BF"
        "]",
        flags=re.UNICODE,
    )
    return len(emoji_pattern.findall(text))


def build_user_style_profile(user_id: int, db: Session):
    history = (
        db.query(OutreachHistory)
        .filter(OutreachHistory.user_id == user_id)
        .all()
    )

    if not history:
        return {
            "avg_length": 150,
            "emoji_preference": "low",
            "tone_preference": "professional",
            "cta_preference": "soft"
        }

    total_length = 0
    total_emojis = 0
    tone_counter = {}
    cta_counter = {}

    for item in history:
        if item.email_body:
            total_length += len(item.email_body.split())
            total_emojis += count_emojis(item.email_body)

        if item.tone:
            tone_counter[item.tone] = tone_counter.get(item.tone, 0) + 1

        if item.cta_type:
            cta_counter[item.cta_type] = cta_counter.get(item.cta_type, 0) + 1

    avg_length = total_length // len(history) if history else 150
    avg_emojis = total_emojis // len(history) if history else 0

    emoji_pref = "high" if avg_emojis > 3 else "medium" if avg_emojis > 1 else "low"

    tone_pref = max(tone_counter, key=tone_counter.get) if tone_counter else "professional"
    cta_pref = max(cta_counter, key=cta_counter.get) if cta_counter else "soft"

    return {
        "avg_length": avg_length,
        "emoji_preference": emoji_pref,
        "tone_preference": tone_pref,
        "cta_preference": cta_pref
    }
