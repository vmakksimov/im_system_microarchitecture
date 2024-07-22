from db import db


class CandidateModel(db.Model):
    __tablename__ = "candidates"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False)
    date = db.Column(db.Date(), nullable=False)
    stage = db.Column(db.String, nullable=False)
    img = db.Column(db.String, nullable=True)
    job = db.Column(db.String, nullable=False)
    status = db.Column(db.String, default='Pending', nullable=False)
