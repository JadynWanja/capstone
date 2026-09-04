from flask import Flask, jsonify, request
from flask_cors import CORS
from app.config import Config
from app.extensions import db
from werkzeug.middleware.proxy_fix import ProxyFix

def create_app(config_class=Config):
    app = Flask(__name__)
    
    # Trust the Render reverse proxy to extract the correct IP and prevent spoofing
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)
    
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    CORS(app, supports_credentials=True, resources={r"/api/*": {
        "origins": [
            "http://localhost:5173", 
            "http://127.0.0.1:5173", 
            "https://capstone-kaf3ker2n-jadyn-bots-projects.vercel.app",
            "https://capstone-pi-liart.vercel.app",
            "https://cadrehub.dpdns.org"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"]
    }})

    @app.after_request
    def add_security_and_cors_headers(response):
        response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:;"
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'SAMEORIGIN'
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        return response



    @app.route('/api/ping', methods=['GET'])
    def ping():
        """Lightweight health check endpoint to keep Render server warm via a cron job."""
        return jsonify({'status': 'alive', 'message': 'Cadre Hub Backend is warm!'}), 200

    with app.app_context():
        try:
            # Explicitly import models so SQLAlchemy metadata registers all tables
            from app.models.user import User
            from app.models.employee import Employee
            from app.models.department import Department, JobPosition
            from app.models.leave import LeaveType, LeaveBalance, LeaveRequest
            from app.models.attendance import AttendanceRecord
            from app.models.notification import Notification
            from app.models.audit_log import AuditLog
            from app.models.promotion import EmployeePromotion
            from app.utils.seed import seed_database

            db.create_all()
            seed_database()
        except Exception as e:
            app.logger.error(f"Error during auto-seeding: {e}")

    # Register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.employee_routes import employee_bp
    from app.routes.department_routes import department_bp
    from app.routes.leave_routes import leave_bp
    from app.routes.attendance_routes import attendance_bp
    from app.routes.report_routes import report_bp
    from app.routes.notification_routes import notification_bp
    from app.routes.audit_routes import audit_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(employee_bp)
    app.register_blueprint(department_bp)
    app.register_blueprint(leave_bp)
    app.register_blueprint(attendance_bp)
    app.register_blueprint(report_bp)
    app.register_blueprint(notification_bp)
    app.register_blueprint(audit_bp)

    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({'status': 'healthy', 'service': 'HRMS Flask REST API', 'version': '1.0.0'})

    @app.errorhandler(404)
    def not_found(e):
        response = jsonify({'success': False, 'message': 'Endpoint not found'})
        return response, 404

    @app.errorhandler(500)
    def internal_error(e):
        response = jsonify({'success': False, 'message': 'An internal server error occurred'})
        return response, 500

    return app
