from datetime import datetime
from app.extensions import db

class EmployeePromotion(db.Model):
    __tablename__ = 'employee_promotions'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False, index=True)
    old_position_id = db.Column(db.Integer, db.ForeignKey('job_positions.id'), nullable=True)
    new_position_id = db.Column(db.Integer, db.ForeignKey('job_positions.id'), nullable=False, index=True)
    promoted_by_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Store old and new salary to track changes (nullable in case salary is not specified)
    old_salary = db.Column(db.Float, nullable=True)
    new_salary = db.Column(db.Float, nullable=True)
    
    # Text field for storing details about benefits unlocked in this promotion
    benefits_unlocked = db.Column(db.Text, nullable=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    # Relationships
    employee = db.relationship('Employee', foreign_keys=[employee_id], backref=db.backref('promotions', lazy=True, cascade="all, delete-orphan"))
    old_position = db.relationship('JobPosition', foreign_keys=[old_position_id])
    new_position = db.relationship('JobPosition', foreign_keys=[new_position_id])
    promoter = db.relationship('User', foreign_keys=[promoted_by_id])

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'employee_name': f"{self.employee.first_name} {self.employee.last_name}" if self.employee else None,
            'old_position': self.old_position.title if self.old_position else "N/A",
            'new_position': self.new_position.title if self.new_position else "N/A",
            'old_salary': self.old_salary,
            'new_salary': self.new_salary,
            'benefits_unlocked': self.benefits_unlocked,
            'promoted_by': self.promoter.email if self.promoter else None,
            'date_promoted': self.created_at.isoformat() if self.created_at else None
        }
