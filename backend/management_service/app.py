import os
from flask import Flask, jsonify, request, Response, g
from dotenv import load_dotenv
from flask_cors import CORS
from flask_smorest import Api
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect
from flask_wtf.csrf import generate_csrf
from resources.user_create import blp as CandidateCreateBlueprint
from resources.user_get import blp as CandidateGetBlueprint
from resources.user_update import blp as CandidateUpdateBlueprint
from resources.user_delete import blp as CandidateDeleteBlueprint
from db import db
from functools import wraps
load_dotenv()
# from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('DJANGO_SECRET_KEY')
    # app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    # app.config['WTF_CSRF_ENABLED'] = True
    # app.config['WTF_CSRF_TIME_LIMIT'] = None

    # csrf = CSRFProtect(app)
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:3000", "http://localhost:5173", "http://localhost:9000", "https://www.vmakksimov.site"],
            "allow_headers": [
                "Content-Type",
                "X-CSRFToken",
                "cache-control",
                "Access-Control-Allow-Origin",
                "*"
            ],
            "expose_headers": [
                "Content-Type",
                "X-CSRFToken"
            ],
            "supports_credentials": True,
            "methods": ["DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"]
        }
    })
    @app.before_request
    def handle_options_request():
        if request.method.lower() == 'options':
            return Response(status=200)
        

    # @app.after_request
    # def set_csrf_token(response):
    #     response.set_cookie('csrftoken', generate_csrf())
    #     return response
        
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "STORES REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = (
        "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    )
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        os.getenv('POSTGRES_URI')
    )
    # app.config["REDIS_URL"] = (
    #     os.getenv('REDIS_URL')
    # )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    # initialize the SQLAlchemy and connects it to the app
    db.init_app(app)
    api = Api(app)
    migrate = Migrate(app, db, render_as_batch=True)

    app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
    # jwt = JWTManager(app)
 

    api.register_blueprint(CandidateCreateBlueprint)
    api.register_blueprint(CandidateGetBlueprint)
    api.register_blueprint(CandidateUpdateBlueprint)
    api.register_blueprint(CandidateDeleteBlueprint)
    return app


myapp = create_app()


if __name__ == "__main__":
    myapp.run()
