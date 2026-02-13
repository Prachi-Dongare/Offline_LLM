from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    outreach_history = relationship("OutreachHistory", back_populates="user")


class OutreachHistory(Base):
    __tablename__ = "outreach_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    platform = Column(String(50))  # email, whatsapp, linkedin, instagram

    target_name = Column(String(150))
    role = Column(String(150))
    industry = Column(String(150))
    tone = Column(String(50))

    subject_line = Column(String(255))
    email_body = Column(Text)

    cta_type = Column(String(50))
    spam_level = Column(String(20))

    message_length = Column(Integer)
    emoji_count = Column(Integer)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="outreach_history")

class IndustryPlaybook(Base):
    __tablename__ = "industry_playbooks"

    id = Column(Integer, primary_key=True, index=True)
    industry = Column(String(150), unique=True)

    most_common_tone = Column(String(50))
    most_common_cta = Column(String(50))
    average_length = Column(Integer)

    ai_insight_summary = Column(Text)

    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
