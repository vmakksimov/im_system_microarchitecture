
from flask.views import MethodView
from flask_smorest import Blueprint
from token_decorator import token_required 
from models import CandidateModel
from db import db

blp = Blueprint("Delete Candidate", __name__, description="Operations for Delete candidates")


@blp.route("/candidate/<int:candidate_id>")
class CandidateDelete(MethodView):
    decorators = [token_required]
    def delete(self, candidate_id):
        candidate = CandidateModel.query.get_or_404(candidate_id)
        # jwt = get_jwt()
        # if not jwt.get("is_admin"):
        #     abort(401, message="Admin privileges required.")

        db.session.delete(candidate)
        db.session.commit()
        return {"message": "Candidate deleted!"}