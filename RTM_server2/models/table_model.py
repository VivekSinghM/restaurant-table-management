from datetime import datetime
from services.database_connector import db, mongo_col
from models.menu_model import Menu, TempMenu
from bson.objectid import ObjectId


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
        p_items = {}
        try:
            
            if TempMenu.menu=={}: Menu.get_menu_dict()

            for [item_id, qty] in order.items():
                p_items.update({TempMenu.menu[int(item_id)]['name']:qty})

            order_id = Order.set_order(p_items)
            
            Table.query.filter_by(table_id=id).first().table_order = order_id
            if (not Table.query.filter_by(table_id=id).first().occupied):
                Table.update_occupied(id)
            db.session.commit()
            return order_id
        except Exception as e:
            print("error occurred in adding order")
            return False

    @staticmethod
    def add_items(id, order):
        temp_order = {}
        try:
            if TempMenu.menu=={}: Menu.get_menu_dict()
            for [item_id, qty] in order.items():
                item_name=TempMenu.menu[int(item_id)]['name']
                temp_order.update({item_name:qty})

            order_id = Order.update_order(id,temp_order)

            print("data",mongo_col.find_one(id))

            return True
        except Exception as e:
            print("error occurred in adding items in order:",id)
            return False

    @staticmethod
    def get_tabels_dict():
        return {k: v for d in Table.get_all_tables() for k, v in d.serialize.items()}

    @property
    def serialize(self):
        print(self.table_order==None)
        return {
            self.table_id: {
                "table_no": self.table_no,
                "order_id": self.table_order,
                "occupied": self.occupied,
            }
        }


db.create_all()

class Order:
    @staticmethod
    def get_order(id):
        try:
            query={
                '_id': ObjectId(id)
            }
            return mongo_col.find_one(filter=query)['order']
        except Exception as e:
            print("erroe in loadin order for id:",id)

    @staticmethod
    def get_orders(ids):
        temp_orders={}
        try:
            for id in ids:
                query={
                    '_id': ObjectId(id) 
                }
                items= mongo_col.find_one(filter=query)['order']
                temp_orders[id]=items
            print('order:',temp_orders)
            return temp_orders
        except Exception as e:
            print("erroe in loadin order for id:",id)
            return False
    
    @staticmethod
    def set_order(p_items):
        try:
            now = datetime.now()
            order_dict = {
                'user': 'temp',
                'date': now.strftime("%m/%d/%Y"),
                'time': now.strftime("%H:%M:%S"),
                'order': p_items
            }

            order_id = str(mongo_col.insert_one(order_dict).inserted_id)
            # print("Order Id:", order_id,"\n order:",order_dict)
            return order_id
        except Exception as e:
            print("error in adding order")
            return False


    @staticmethod
    def update_order(id,items):
        try:
            temp_order= Order.get_order(id)

            print(temp_order,items)

            for [key,val] in items.items():
                if key in temp_order: temp_order[key]+=val
                else: temp_order[key]=val
            query={
                '_id': ObjectId(id)
            }
            data={'order':temp_order}
            print(data)
            return mongo_col.update_one(query, {'$set':data} , upsert=False).inserted_id
        except Exception as e:
            print("erroe in loadin order for id:",id)


# class CurrentOrders:
#     orders={}
#     # @staticmethod
#     # def set_menu(menu_items):
#     #     print('setting up currentOrders')
#     #     CurrentOrders.orders=menu_items
#     @staticmethod
#     def add_item(item):
#         if CurrentOrders.orders=={}: print('setting up CurrentOrders')
#         CurrentOrders.orders.update(item)
#     @staticmethod
#     def remove_item(key):
#         CurrentOrders.orders.pop(key)
#     @staticmethod
#     def update_item(item):
#         CurrentOrders.orders.update(item)
