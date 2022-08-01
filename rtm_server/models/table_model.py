from services.database_connector import db, mongo_col


class Table(db.Model):
    table_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    table_no = db.Column(db.String(20), nullable=False, unique=True)
    table_order = db.Column(db.String(50), unique=True, nullable=True) 
    occupied = db.Column(db.Boolean, nullable=False)
    
    @staticmethod
    def get_all_tables():
        return Table.query.all()
    
    @staticmethod
    def add_table(table_no, table_order, occupied):
        try:
            db.session.add(table_no = table_no, table_order = table_order, occupied = occupied)
            return True
        except Exception:
            return False
    @staticmethod
    def update_occupied(id):
        try:
            Table.query.filter_by(table_id=id).first().occupied = not Table.query.filter_by(table_id=id).first().occupied
            return True
        except Exception:
            return False
    @staticmethod
    def add_order(id,order):
        try:
            order_id = str(mongo_col.insert_one(order).inserted_id)
            print("Order Id:",order_id)
            Table.query.filter_by(table_id=id).first().table_order= order_id
            if (not Table.query.filter_by(table_id=id).first().occupied): Table.update_occupied(id)
            db.session.commit()
            return order_id
        except Exception:
            print("error occurred in adding order")
            return False
db.create_all()