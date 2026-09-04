from app import create_app
from app.extensions import db

app = create_app()

with app.app_context():
    # Create new tables (EmployeePromotion)
    db.create_all()
    
    # Add indexes manually since create_all() doesn't alter existing tables
    try:
        db.session.execute(db.text('CREATE INDEX IF NOT EXISTS ix_employees_user_id ON employees (user_id);'))
        db.session.execute(db.text('CREATE INDEX IF NOT EXISTS ix_employees_employee_code ON employees (employee_code);'))
        db.session.execute(db.text('CREATE INDEX IF NOT EXISTS ix_employees_email ON employees (email);'))
        db.session.execute(db.text('CREATE INDEX IF NOT EXISTS ix_employees_department_id ON employees (department_id);'))
        db.session.execute(db.text('CREATE INDEX IF NOT EXISTS ix_employees_position_id ON employees (position_id);'))
        db.session.execute(db.text('CREATE INDEX IF NOT EXISTS ix_employees_manager_id ON employees (manager_id);'))
        
        db.session.execute(db.text('CREATE INDEX IF NOT EXISTS ix_users_email ON users (email);'))
        db.session.execute(db.text('CREATE INDEX IF NOT EXISTS ix_users_role ON users (role);'))
        db.session.execute(db.text('CREATE INDEX IF NOT EXISTS ix_users_is_active ON users (is_active);'))
        
        db.session.commit()
        print("Successfully created tables and added indexes!")
    except Exception as e:
        print(f"Error adding indexes: {e}")
        db.session.rollback()
