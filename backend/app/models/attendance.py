from datetime import datetime
from app.extensions import db

class AttendanceRecord(db.Model):
    __tablename__ = 'attendance_records'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    clock_in = db.Column(db.String(20), nullable=True)
    clock_out = db.Column(db.String(20), nullable=True)
    status = db.Column(db.String(20), default='PRESENT')
