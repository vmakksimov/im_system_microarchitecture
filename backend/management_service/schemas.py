from marshmallow import Schema, fields

class PlainCandidateSchema(Schema):
    # dump_only only to output data field
    # load_only only to input data field
    id = fields.Int(dump_only=True)
    email = fields.Email(required=True, unique=True)
    name = fields.Str(required=True)
    img = fields.Str(required=False)
    date = fields.Date(required=True)
    stage = fields.Str(required=True)
    job =  fields.Str(required=True)
    status = fields.Str(required=False, default='Pending')
    feedback = fields.Bool(required=False, default=False)

class CandidateUpdateSchema(Schema):
    stage = fields.String(required=False)
    role = fields.String(required=False)
    status = fields.String(required=False)
    date_for_interview = fields.Date(required=False)

class CandidateFeedBackSchema(Schema):
    feedback = fields.Bool(dump_only=True)