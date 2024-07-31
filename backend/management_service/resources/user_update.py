
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from token_decorator import token_required 
from schemas import PlainCandidateSchema, CandidateUpdateSchema
from models import CandidateModel
from db import db

blp = Blueprint("Update Candidate", __name__, description="Operations for Update candidates")


@blp.route("/candidate/<int:candidate_id>")
class CandidateUpdate(MethodView):
    decorators = [token_required]
    @blp.arguments(PlainCandidateSchema)
    @blp.response(200, PlainCandidateSchema)
    def put(self, request_data, candidate_id):
        #TODO ItemModel.query.get(item_id) because if it's not found will not go to if statement
        candidate = CandidateModel.query.get_or_404(candidate_id)
        if candidate:
            candidate.stage = request_data["stage"]
            candidate.role = request_data["job"]
            candidate.status = request_data["status"]
            candidate.date_for_interview = request_data["date"]
            candidate.feedback = request_data["feedback"]
        else:
            candidate = CandidateModel(id=candidate_id, **request_data)
        db.session.add(candidate)
        db.session.commit()
        return candidate
