from flask import Blueprint, request, jsonify, current_app
from extensions import db
from models.enquiryModel import Enquiry
from utils.decorators import token_required
import jwt

enquiry_bp = Blueprint('enquiries', __name__)

@enquiry_bp.route('/enquiry', methods=['POST'])
def create_enquiry():
    data = request.get_json()

    # Check if user is logged in
    user_id = None
    token = request.headers.get('Authorization')
    if token:
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            decoded = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            user_id = decoded['user_id']
        except:
            pass

    enquiry = Enquiry(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        location=data.get('location'),
        roof_type=data.get('roof_type'),
        electricity_bill=data.get('electricity_bill'),
        subject=data.get('subject'),
        message=data.get('message'),
        user_id=user_id
    )
    db.session.add(enquiry)
    db.session.commit()

    return jsonify({'message': 'Enquiry submitted successfully!'}), 201

@enquiry_bp.route('/enquiries', methods=['GET'])
@token_required
def get_user_enquiries(current_user):
    enquiries = Enquiry.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'id': e.id,
        'name': e.name,
        'email': e.email,
        'phone': e.phone,
        'location': e.location,
        'roof_type': e.roof_type,
        'electricity_bill': e.electricity_bill,
        'subject': e.subject,
        'message': e.message,
        'status': e.status,
        'created_at': e.created_at.isoformat()
    } for e in enquiries]), 200
