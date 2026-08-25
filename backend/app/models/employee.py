from app.extensions import db

class Employee(db.Model):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    employee_code = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(30), nullable=True)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=True)
    position_id = db.Column(db.Integer, db.ForeignKey('job_positions.id'), nullable=True)
    employment_status = db.Column(db.String(50), default='FULL_TIME')
    hire_date = db.Column(db.String(20), nullable=True)
    salary = db.Column(db.Float, nullable=True)
    national_id = db.Column(db.String(50), nullable=True)
    is_deleted = db.Column(db.Boolean, default=False)

    leave_balances = db.relationship('LeaveBalance', backref='employee', lazy=True)
