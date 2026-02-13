import os

class Settings:
    DB_USER = "root"
    DB_PASSWORD = "G$9v!rXy@2Lp#qTz"
    DB_HOST = "localhost"
    DB_PORT = "3306"
    DB_NAME = "outreach_engine"

    SECRET_KEY = "supersecretkey123"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 60

settings = Settings()
