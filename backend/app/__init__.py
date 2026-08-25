import os
from flask import Flask
from app.extensions import db, jwt, cors

def create_app():
    app = Flask(__name__)
    
    db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'capstone.db'))
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', f'sqlite:///{db_path}')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'hrms-capstone-secret-key')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-capstone-secret-key')

    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    return app
