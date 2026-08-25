import sys
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from app.extensions import db
from app.models import user, department, employee, leave, attendance, audit_log
from app.models.user import User
from app.models.department import Department, JobPosition
from app.models.employee import Employee
from app.models.leave import LeaveType, LeaveBalance
from werkzeug.security import generate_password_hash

def seed_target_database(target_db_url=None, drop_first=False):
    app = create_app()
    with app.app_context():
        if target_db_url:
            if target_db_url.startswith('postgres://'):
                target_db_url = target_db_url.replace('postgres://', 'postgresql://', 1)
            if 'sslmode' not in target_db_url and 'postgresql://' in target_db_url:
                separator = '&' if '?' in target_db_url else '?'
                target_db_url = f"{target_db_url}{separator}sslmode=require"

            print(f"Connecting to remote target database: {target_db_url.split('@')[-1] if '@' in target_db_url else target_db_url}")
            engine = create_engine(target_db_url)
            if drop_first:
                print("Dropping existing tables on target database for a fresh start...")
                db.metadata.drop_all(engine)
            
            print("Creating database schema on target database...")
            db.metadata.create_all(engine)
            Session = sessionmaker(bind=engine)
            session = Session()
        else:
            print("Using local database configuration...")
            if drop_first:
                db.drop_all()
            db.create_all()
            session = db.session

        # Seed Departments
        if not session.query(Department).first():
            print("Seeding initial departments...")
            engineering = Department(name="Engineering", code="ENG", description="Software & Systems Engineering")
            hr = Department(name="Human Resources", code="HR", description="People Operations & Talent Management")
            sales = Department(name="Sales & Marketing", code="SALES", description="Client Outreach & Marketing")
            finance = Department(name="Finance", code="FIN", description="Financial Planning & Accounting")
            
            session.add_all([engineering, hr, sales, finance])
            session.commit()

            # Seed Job Positions
            dev = JobPosition(title="Software Engineer", department_id=engineering.id, description="Full Stack Developer")
            hr_lead = JobPosition(title="HR Lead", department_id=hr.id, description="People Operations Manager")
            sales_rep = JobPosition(title="Sales Executive", department_id=sales.id, description="Revenue Specialist")
            fin_analyst = JobPosition(title="Financial Analyst", department_id=finance.id, description="Financial Planning")

            session.add_all([dev, hr_lead, sales_rep, fin_analyst])
            session.commit()

        # Seed Leave Types
        if not session.query(LeaveType).first():
            print("Seeding leave types...")
            annual = LeaveType(name="Annual Leave", default_days_per_year=21, description="Standard paid vacation")
            sick = LeaveType(name="Sick Leave", default_days_per_year=10, description="Medical leave")
            maternity = LeaveType(name="Maternity/Paternity", default_days_per_year=90, description="Parental leave")

            session.add_all([annual, sick, maternity])
            session.commit()

        # Seed Primary Admin User (admin@capstonehub.com & admin@teamhub.com)
        admin_emails = [
            ("admin@capstonehub.com", "Admin123!"),
            ("admin@teamhub.com", "admin123")
        ]

        for email_addr, plain_pass in admin_emails:
            if not session.query(User).filter_by(email=email_addr).first():
                print(f"Seeding admin user ({email_addr})...")
                pass_hash = generate_password_hash(plain_pass)
                admin_user = User(
                    email=email_addr,
                    password_hash=pass_hash,
                    role="ADMIN",
                    is_active=True
                )
                session.add(admin_user)
                session.commit()

                eng_dept = session.query(Department).filter_by(code="ENG").first()
                dev_pos = session.query(JobPosition).filter_by(title="Software Engineer").first()

                admin_emp = Employee(
                    user_id=admin_user.id,
                    employee_code=f"EMP-00{admin_user.id}",
                    first_name="Admin",
                    last_name="User",
                    email=email_addr,
                    phone="+254 700 000 000",
                    department_id=eng_dept.id if eng_dept else 1,
                    position_id=dev_pos.id if dev_pos else 1,
                    employment_status="FULL_TIME",
                    hire_date="2024-01-01",
                    salary=150000.0,
                    national_id=f"1234567{admin_user.id}"
                )
                session.add(admin_emp)
                session.commit()

                # Seed leave balances for admin employee
                for lt in session.query(LeaveType).all():
                    lb = LeaveBalance(
                        employee_id=admin_emp.id,
                        leave_type_id=lt.id,
                        year=2026,
                        allocated_days=lt.default_days_per_year,
                        used_days=0
                    )
                    session.add(lb)
                session.commit()

        print("Database schema creation and seeding completed successfully!")

if __name__ == '__main__':
    target_url = None
    reset_flag = False

    for arg in sys.argv[1:]:
        if arg in ['--reset', '--fresh']:
            reset_flag = True
        elif arg.startswith('postgresql://') or arg.startswith('postgres://'):
            target_url = arg

    seed_target_database(target_db_url=target_url, drop_first=reset_flag)
