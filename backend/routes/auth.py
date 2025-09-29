from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt

from extensions import db
from models.userModel import User
from utils.decorators import token_required

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(username=data.get('username')).first():
        return jsonify({'message': 'Username already exists!'}), 400
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'message': 'Email already exists!'}), 400

    user = User(
        username=data.get('username'),
        email=data.get('email'),
        phone=data.get('phone', ''),
        password_hash=generate_password_hash(data.get('password'))
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'}), 201

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(username=data.get('username')).first()

#     if user and check_password_hash(user.password_hash, data.get('password')):
#         token = jwt.encode({
#             'user_id': user.id,
#             'username': user.username,
#             'is_admin': user.is_admin,
#             'exp': datetime.utcnow() + timedelta(hours=24)
#         }, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')

#         return jsonify({
#             'token': token,
#             'user': {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#                 'phone': user.phone,
#                 'is_admin': user.is_admin
#             }
#         }), 200

#     return jsonify({'message': 'Invalid credentials!'}), 401

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()  # 🔹 Use email instead of username

    if user and check_password_hash(user.password_hash, data.get('password')):
        token = jwt.encode({
            'user_id': user.id,
            'email': user.email,  # 🔹 Store email in JWT instead of username
            'is_admin': user.is_admin,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')

        return jsonify({
            'token': token,
            'user': {
                'id': user.id,
                'username': user.username,  # keep username for frontend use
                'email': user.email,
                'phone': user.phone,
                'is_admin': user.is_admin
            }
        }), 200

    return jsonify({'message': 'Invalid credentials!'}), 401

@auth_bp.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    return jsonify({
        'user': {
            'id': current_user.id,
            'username': current_user.username,
            'email': current_user.email,
            'phone': current_user.phone,
            'is_admin': current_user.is_admin
        }
    }), 200
