from flask_jwt_extended import jwt_required, get_jwt
from flask.views import MethodView
from flask import request
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
        status = request.args.get('status')
        
        # Query candidates with optional status filter
        if status:
            status_list = status.split(',')
            candidates = CandidateModel.query.filter(CandidateModel.status.in_(status_list)).all()
        else:
            # No status filter, return all candidates
            candidates = CandidateModel.query.all()
        return candidates
    
    

@blp.route("/candidates/<int:candidate_id>")
class Candidate(MethodView):
    @blp.response(200, PlainCandidateSchema)
    def get(self, candidate_id):
        candidate = CandidateModel.query.get_or_404(candidate_id)
        return candidate