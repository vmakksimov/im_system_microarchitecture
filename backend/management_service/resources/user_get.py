from flask_jwt_extended import jwt_required, get_jwt
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

from schemas import PlainCandidateSchema
from models import CandidateModel
from db import db

blp = Blueprint("Get Candidates", __name__, description="Operations for GET candidates")


@blp.route("/candidates")
class CandidatesList(MethodView):
    @blp.response(200, PlainCandidateSchema(many=True))
    def get(self):
        return CandidateModel.query.all()
    

@blp.route("/candidates/<int:candidate_id>")
class Candidate(MethodView):
    @blp.response(200, PlainCandidateSchema)
    def get(self, candidate_id):
        candidate = CandidateModel.query.get_or_404(candidate_id)
        return candidate