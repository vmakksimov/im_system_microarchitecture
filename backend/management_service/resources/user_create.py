from flask_jwt_extended import jwt_required, get_jwt
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

from schemas import PlainCandidateSchema
from models import CandidateModel
from db import db

blp = Blueprint("Create Candidates", __name__, description="Operations for Create candidates")


@blp.route("/candidates")
class CandidatesCreate(MethodView):

    @blp.arguments(PlainCandidateSchema)
    @blp.response(201, PlainCandidateSchema)
    def post(self, request_data):
        candidate = CandidateModel(**request_data)

        try:
            db.session.add(candidate)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="Something went wrong!")

        return candidate

