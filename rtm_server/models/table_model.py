from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import table
from services.database_connector import db


class Table(db.Model):
    table_id = db.Column(db.Integer, PrimaryKey=True, autoincrement=True)
    table_no = db.Column(db.String(20), nullable=False, unique=True)
    table_order = db.Column(db.String(10), db.ForeignKey('Order.id'), nullable=True)
    occupied = db.Column(db.Boolean, nullable=False)
    
    @staticmethod
    def get_all_tables():
        return Table.query.all()
    
    @staticmethod
    def add_table(table_no, table_order, occupied):
        try:
            db.session.add(table_no = table_no, table_order = table_order, occupied = occupied)
        except Exception:
            return False
        return True
    
    @staticmethod
    def update_occupied(id,occupied):
        try:
            Table.query.filter_by(table_id=id).first().occupied = not Table.query.filter_by(table_id=id).first().occupied
            return True
        except Exception:
            return False
    @staticmethod
    def add_order():
        pass