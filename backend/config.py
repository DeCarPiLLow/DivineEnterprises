import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql+psycopg://solarpostgres_user:vPBngkkjpOL7BDtin68KawH39F1z257Y@dpg-d3cj0ridbo4c73e7dopg-a.singapore-postgres.render.com/solarpostgres')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-string-change-in-production')

