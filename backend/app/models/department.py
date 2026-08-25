from app.extensions import db

class Department(db.Model):
    __tablename__ = 'departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)

    positions = db.relationship('JobPosition', backref='department', lazy=True)
    employees = db.relationship('Employee', backref='department', lazy=True)

class JobPosition(db.Model):
    __tablename__ = 'job_positions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=False)
    description = db.Column(db.Text, nullable=True)

    employees = db.relationship('Employee', backref='position', lazy=True)
