from sqlalchemy.orm import Session
from sqlalchemy import func
from models import OutreachHistory
from datetime import datetime, timedelta


def get_analytics_summary(user_id: int, db: Session):

    # ---------------------------
    # Total Messages
    # ---------------------------
    total_messages = (
        db.query(func.count(OutreachHistory.id))
        .filter(OutreachHistory.user_id == user_id)
        .scalar()
    )

    # ---------------------------
    # Platform Distribution
    # ---------------------------
    platform_data = (
        db.query(
            OutreachHistory.platform,
            func.count(OutreachHistory.id)
        )
        .filter(OutreachHistory.user_id == user_id)
        .group_by(OutreachHistory.platform)
        .all()
    )

    platform_distribution = {
        platform: count for platform, count in platform_data if platform
    }

    # ---------------------------
    # Industry Distribution
    # ---------------------------
    industry_data = (
        db.query(
            OutreachHistory.industry,
            func.count(OutreachHistory.id)
        )
        .filter(OutreachHistory.user_id == user_id)
        .group_by(OutreachHistory.industry)
        .all()
    )

    industry_distribution = {
        industry: count for industry, count in industry_data if industry
    }

    # ---------------------------
    # Tone Distribution
    # ---------------------------
    tone_data = (
        db.query(
            OutreachHistory.tone,
            func.count(OutreachHistory.id)
        )
        .filter(OutreachHistory.user_id == user_id)
        .group_by(OutreachHistory.tone)
        .all()
    )

    tone_distribution = {
        tone: count for tone, count in tone_data if tone
    }

    # ---------------------------
    # Spam Distribution
    # ---------------------------
    spam_data = (
        db.query(
            OutreachHistory.spam_level,
            func.count(OutreachHistory.id)
        )
        .filter(OutreachHistory.user_id == user_id)
        .group_by(OutreachHistory.spam_level)
        .all()
    )

    spam_distribution = {
        level: count for level, count in spam_data if level
    }

    # ---------------------------
    # Average Message Length
    # ---------------------------
    avg_length = (
        db.query(func.avg(OutreachHistory.message_length))
        .filter(OutreachHistory.user_id == user_id)
        .scalar()
    )

    # ---------------------------
    # Engagement Trend (Last 7 Days)
    # ---------------------------
    seven_days_ago = datetime.utcnow() - timedelta(days=7)

    trend_data = (
        db.query(
            func.date(OutreachHistory.created_at),
            func.count(OutreachHistory.id)
        )
        .filter(
            OutreachHistory.user_id == user_id,
            OutreachHistory.created_at >= seven_days_ago
        )
        .group_by(func.date(OutreachHistory.created_at))
        .all()
    )

    engagement_trend = [
        {
            "date": str(date),
            "count": count
        }
        for date, count in trend_data
    ]

    # ---------------------------
    # Top Performing Messages (By Length)
    # ---------------------------
    top_messages = (
        db.query(OutreachHistory)
        .filter(OutreachHistory.user_id == user_id)
        .order_by(OutreachHistory.message_length.desc())
        .limit(5)
        .all()
    )

    top_performing = [
        {
            "id": msg.id,
            "platform": msg.platform,
            "length": msg.message_length,
            "created_at": str(msg.created_at)
        }
        for msg in top_messages
    ]

    # ---------------------------
    # Activity Heatmap (MySQL Safe)
    # dayofweek() → 1 = Sunday, 7 = Saturday
    # ---------------------------
    heatmap_data = (
        db.query(
            func.dayofweek(OutreachHistory.created_at),
            func.count(OutreachHistory.id)
        )
        .filter(OutreachHistory.user_id == user_id)
        .group_by(func.dayofweek(OutreachHistory.created_at))
        .all()
    )

    activity_heatmap = {
        int(day): count for day, count in heatmap_data if day
    }

    # ---------------------------
    # Final Response
    # ---------------------------
    return {
        "total_messages": total_messages or 0,
        "platform_distribution": platform_distribution,
        "industry_distribution": industry_distribution,
        "tone_distribution": tone_distribution,
        "spam_risk_distribution": spam_distribution,
        "avg_message_length": round(avg_length or 0, 2),
        "engagement_trend": engagement_trend,
        "top_performing": top_performing,
        "activity_heatmap": activity_heatmap
    }
