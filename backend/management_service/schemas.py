from marshmallow import Schema, fields
from marshmallow_enum import EnumField
from utils.enums import RoleEnum, StageEnum 


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


# class CandidateSchema(PlainCandidateSchema):
#     store_id = fields.Int(required=True, load_only=True)


# class PlainStoreSchema(Schema):
#     id = fields.Int(dump_only=True)
#     name = fields.Str(required=True)


# class PlainTagSchema(Schema):
#     id = fields.Int(dump_only=True)
#     name = fields.Str()


# class ItemUpdateSchema(Schema):
#     type = fields.Str()
#     price = fields.Float()





# class StoreSchema(PlainStoreSchema):
#     items = fields.List(fields.Nested(PlainItemSchema(), dump_only=True))
#     tags = fields.List(fields.Nested(PlainTagSchema(), dump_only=True))


# class TagSchema(PlainTagSchema):
#     store_id = fields.Int(load_only=True)
#     store = fields.Nested(PlainStoreSchema(), dump_only=True)
#     items = fields.List(fields.Nested(PlainItemSchema()), dump_only=True)


# class TagAndItemSchema(Schema):
#     message = fields.Str()
#     item = fields.Nested(ItemSchema)
#     tag = fields.Nested(TagSchema)


# class UserSchema(Schema):
#     id = fields.Int(dump_only=True)
#     username = fields.Str(required=True)
#     password = fields.Str(required=True, load_only=True)


# class UserRegisterSchema(UserSchema):
#     email = fields.Str(required=True)
