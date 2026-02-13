import json
from llm import generate_with_mistral


def extract_persona(profile_text: str):
    prompt = f"""
You are an AI that extracts structured professional persona data.

From the profile text below, extract:

- name
- role
- seniority
- company
- industry
- recent_event (promotion, job change, etc.)
- likely_challenges (list of 2-3)
- communication_tone (formal / casual / friendly / technical)
- key_interests (list of 3)

Return ONLY valid JSON. No explanation.

Profile:
{profile_text}
"""

    response = generate_with_mistral(prompt)

    try:
        return json.loads(response)
    except:
        return {
            "error": "Failed to parse persona",
            "raw_output": response
        }
