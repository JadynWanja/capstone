import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.department import Department, JobPosition
from app.models.employee import Employee
from app.models.leave import LeaveType, LeaveBalance, LeaveRequest
from app.models.attendance import AttendanceRecord
from app.models.audit_log import AuditLog
from werkzeug.security import generate_password_hash

def seed_database():
    app = create_app()
    with app.app_context():
        print("Creating database tables...")
        db.create_all()

        # Seed Departments if empty
        if not Department.query.first():
            print("Seeding initial departments...")
            engineering = Department(name="Engineering", code="ENG", description="Software & Systems Engineering")
            hr = Department(name="Human Resources", code="HR", description="People & Talent Management")
            finance = Department(name="Finance", code="FIN", description="Finance & Accounting")
            
            db.session.add_all([engineering, hr, finance])
            db.session.commit()

            # Seed Job Positions
            dev = JobPosition(title="Software Engineer", department_id=engineering.id, description="Full Stack Developer")
            hr_lead = JobPosition(title="HR Lead", department_id=hr.id, description="People Operations Manager")
            fin_analyst = JobPosition(title="Financial Analyst", department_id=finance.id, description="Financial Planning")

            db.session.add_all([dev, hr_lead, fin_analyst])
            db.session.commit()

        # Seed Leave Types if empty
        if not LeaveType.query.first():
            print("Seeding leave types...")
            annual = LeaveType(name="Annual Leave", default_days_per_year=21, description="Standard paid vacation")
            sick = LeaveType(name="Sick Leave", default_days_per_year=10, description="Medical leave")
            maternity = LeaveType(name="Maternity/Paternity", default_days_per_year=90, description="Parental leave")

            db.session.add_all([annual, sick, maternity])
            db.session.commit()

        # Seed Admin & Employee User
        if not User.query.filter_by(email="admin@company.com").first():
            print("Seeding default admin user & employee...")
            admin_pass = generate_password_hash("Admin123!")
            admin_user = User(
                email="admin@company.com",
                password_hash=admin_pass,
                role="ADMIN",
                is_active=True
            )
            db.session.add(admin_user)
            db.session.commit()

            eng_dept = Department.query.filter_by(code="ENG").first()
            dev_pos = JobPosition.query.filter_by(title="Software Engineer").first()

            admin_emp = Employee(
                user_id=admin_user.id,
                employee_code="EMP-001",
                first_name="Admin",
                last_name="User",
                email="admin@company.com",
                phone="+254 700 000 000",
                department_id=eng_dept.id if eng_dept else 1,
                position_id=dev_pos.id if dev_pos else 1,
                employment_status="FULL_TIME",
                hire_date="2024-01-01",
                salary=150000.0,
                national_id="12345678"
            )
            db.session.add(admin_emp)
            db.session.commit()

            # Seed leave balances
            for lt in LeaveType.query.all():
                lb = LeaveBalance(
                    employee_id=admin_emp.id,
                    leave_type_id=lt.id,
                    year=2026,
                    allocated_days=lt.default_days_per_year,
                    used_days=0
                )
                db.session.add(lb)
            db.session.commit()

        print("Database capstone.db created and seeded successfully!")

if __name__ == '__main__':
    seed_database()
