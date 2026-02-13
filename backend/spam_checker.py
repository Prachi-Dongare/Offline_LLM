import re


SPAM_PHRASES = [
    "buy now",
    "limited offer",
    "act fast",
    "exclusive deal",
    "guaranteed results",
    "risk free",
    "free trial",
    "click here"
]


def analyze_spam_risk(message: str):
    score = 0
    message_lower = message.lower()

    # Check spam phrases
    for phrase in SPAM_PHRASES:
        if phrase in message_lower:
            score += 2

    # Excessive exclamation marks
    if message.count("!") > 3:
        score += 1

    # Message too long
    if len(message.split()) > 300:
        score += 1

    # Determine level
    if score <= 1:
        level = "low"
    elif score <= 3:
        level = "medium"
    else:
        level = "high"

    return {
        "spam_score": score,
        "spam_level": level
    }
