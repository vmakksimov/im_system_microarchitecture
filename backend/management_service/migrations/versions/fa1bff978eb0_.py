"""empty message

Revision ID: fa1bff978eb0
Revises: 858ab929d6bd
Create Date: 2024-07-22 21:18:52.376636

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa1bff978eb0'
down_revision = '858ab929d6bd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('candidates', schema=None) as batch_op:
        batch_op.alter_column('stage',
               existing_type=sa.INTEGER(),
               type_=sa.String(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('candidates', schema=None) as batch_op:
        batch_op.alter_column('stage',
               existing_type=sa.String(),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###
