from datetime import datetime
from services.database_connector import db, mongo_col
from models.menu_model import Menu, TempMenu


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
            db.session.add(table_no=table_no,
                           table_order=table_order, occupied=occupied)
            return True
        except Exception:
            return False

    @staticmethod
    def genrate_tables(no_of_table):
        try:
            for i in range(int(no_of_table)):
                db.session.add(
                    Table(table_no=str(i), table_order=None, occupied=False))
            db.session.commit()
            return True
        except Exception as e:
            print(e)
            return False

    @staticmethod
    def update_occupied(id):
        try:
            Table.query.filter_by(table_id=id).first(
            ).occupied = not Table.query.filter_by(table_id=id).first().occupied
            return True
        except Exception:
            return False

    @staticmethod
    def add_order(id, order, uid=None):
        p_order = {}
        
        try:
            now = datetime.now()
            order_dict = {
                'user': 'temp',
                'date': now.strftime("%m/%d/%Y"),
                'time': now.strftime("%H:%M:%S"),
                'order': p_order
            }
            print(TempMenu.menu)
            if TempMenu.menu=={}: Menu.get_menu_dict()
            for [item_id, qty] in order.items():
                p_order.update({TempMenu.menu[int(item_id)]['name']:qty})
            print(p_order)

            order_id = str(mongo_col.insert_one(order_dict).inserted_id)
            print("Order Id:", order_id,"\n order:",order_dict)
            Table.query.filter_by(table_id=id).first().table_order = order_id
            if (not Table.query.filter_by(table_id=id).first().occupied):
                Table.update_occupied(id)
            db.session.commit()
            return order_id
        except Exception as e:
            print("hi error: ",e)
            print("error occurred in adding order")
            return False

    @staticmethod
    def get_tabels_dict():
        return {k: v for d in Table.get_all_tables() for k, v in d.serialize.items()}

    @property
    def serialize(self):
        return {
            self.table_id: {
                "table_no": self.table_no,
                "table_order": self.table_order,
                "occupied": self.occupied,
            }
        }


db.create_all()
