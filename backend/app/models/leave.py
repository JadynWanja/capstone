from datetime import datetime
from app.extensions import db

class LeaveType(db.Model):
    __tablename__ = 'leave_types'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    default_days_per_year = db.Column(db.Integer, default=21)
    description = db.Column(db.Text, nullable=True)

class LeaveBalance(db.Model):
    __tablename__ = 'leave_balances'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    leave_type_id = db.Column(db.Integer, db.ForeignKey('leave_types.id'), nullable=False)
    year = db.Column(db.Integer, default=2026)
    allocated_days = db.Column(db.Integer, default=21)
    used_days = db.Column(db.Integer, default=0)

class LeaveRequest(db.Model):
    __tablename__ = 'leave_requests'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    leave_type_id = db.Column(db.Integer, db.ForeignKey('leave_types.id'), nullable=False)
    start_date = db.Column(db.String(20), nullable=False)
    end_date = db.Column(db.String(20), nullable=False)
    reason = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='PENDING')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
