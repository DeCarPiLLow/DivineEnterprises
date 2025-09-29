from flask import Flask
from extensions import db, cors, migration
from config import Config
from routes import register_blueprints

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    cors.init_app(app, supports_credentials=True)
    migration.init_app(app, db)

    # Register routes
    register_blueprints(app)

    return app

# Create a global app instance for WSGI servers like Gunicorn
app = create_app()
