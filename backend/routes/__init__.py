from flask import Blueprint
from .auth import auth_bp
from .enquiries import enquiry_bp
from .admin import admin_bp

def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(enquiry_bp, url_prefix='/api')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')