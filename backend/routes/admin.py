from flask import Blueprint, request, jsonify
from extensions import db
from models.enquiryModel import Enquiry
from models.userModel import User
from utils.decorators import token_required, admin_required

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/enquiries', methods=['GET'])
@token_required
@admin_required
def get_all_enquiries(current_user):
    enquiries = Enquiry.query.all()
    return jsonify([{
        'id': e.id,
        'name': e.name,
        'email': e.email,
        'phone': e.phone,
        'location': e.location,
        'roof_type': e.roof_type,
        'electricity_bill': e.electricity_bill,
        'message': e.message,
        'status': e.status,
        'created_at': e.created_at.isoformat(),
        'user_id': e.user_id
    } for e in enquiries]), 200

@admin_bp.route('/enquiry/<int:enquiry_id>/status', methods=['PUT'])
@token_required
@admin_required
def update_enquiry_status(current_user, enquiry_id):
    data = request.get_json()
    enquiry = Enquiry.query.get_or_404(enquiry_id)
    enquiry.status = data.get('status')
    db.session.commit()
    return jsonify({'message': 'Enquiry status updated successfully!'}), 200

@admin_bp.route('/users', methods=['GET'])
@token_required
@admin_required
def get_all_users(current_user):
    users = User.query.all()
    return jsonify([{
        'id': u.id,
        'username': u.username,
        'email': u.email,
        'phone': u.phone,
        'is_admin': u.is_admin,
        'created_at': u.created_at.isoformat()
    } for u in users]), 200

@admin_bp.route('/user/<int:user_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_user(current_user, user_id):
    if user_id == current_user.id:
        return jsonify({'message': 'Cannot delete your own account!'}), 400
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully!'}), 200

@admin_bp.route('/stats', methods=['GET'])
@token_required
@admin_required
def get_admin_stats(current_user):
    total_users = User.query.count()
    total_enquiries = Enquiry.query.count()
    pending_enquiries = Enquiry.query.filter_by(status='pending').count()
    completed_enquiries = Enquiry.query.filter_by(status='completed').count()
    return jsonify({
        'total_users': total_users,
        'total_enquiries': total_enquiries,
        'pending_enquiries': pending_enquiries,
        'completed_enquiries': completed_enquiries
    }), 200
