from datetime import datetime
from services.db_connector import db, mongo_col
from models.menu import Menu, TempMenu
from sqlalchemy import null
from bson.objectid import ObjectId


class Table(db.Model):
    table_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    table_no = db.Column(db.String(20), nullable=False, unique=True)
    table_order = db.Column(db.String(50), unique=True, nullable=True)
    occupied = db.Column(db.Boolean, nullable=False)

    @staticmethod
    def get_all_tables():
        return Table.query.all()

    #  to add more table in db
    @staticmethod
    def add_table(table_no, table_order, occupied):
        try:
            db.session.add(table_no=table_no,
                           table_order=table_order, occupied=occupied)
            return True
        except Exception:
            return False

    #  to add multi. tables in db
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

    #  to change occupied for a table by id
    @staticmethod
    def update_occupied(id):
        try:
            Table.query.filter_by(table_id=id).first(
            ).occupied = not Table.query.filter_by(table_id=id).first().occupied
            return True
        except Exception:
            return False

    # to create order and set it to a table with table id, order items
    @staticmethod
    def create_order(tId, order, uid=None):
        p_items = {}
        try:

            if TempMenu.menu == {}:
                Menu.get_menu_dict()
            total = 0
            for [item, qty] in order.items():
                p_items.update({item: qty})
                total+= qty*TempMenu.menu[item]['rate']

            order_id = Order.add_order(p_items, uid, total)
            tempTable=Table.query.filter_by(table_id=tId).first()
            tempTable.table_order = order_id
            if (not tempTable.occupied):
                Table.update_occupied(tId)
            db.session.commit()
            return order_id
        except Exception as e:
            print("error occurred in adding order")
            return False

    # to add more items in order
    @staticmethod
    def update_order(oId, order):
        temp_order = Order.get_order(oId)['order']
        try:
            if TempMenu.menu == {}:
                Menu.get_menu_dict()
            for [item, qty] in order.items():
                if qty < 0 : 
                    raise Exception('nagetive qty is passed')
                elif qty == 0 : 
                    temp_order.pop(item,None) 
                else :
                    if item in temp_order : temp_order[item]+= qty
                    else: temp_order[item] = qty

            Order.update_order(id, temp_order)
            return True
        except Exception as e:
            print("error occurred in adding items in order:", id)
            return False
    
    # to complete a order and set table occupied false
    @staticmethod
    def close_order(tId,oId,paid):
        tempTable=Table.query.filter_by(table_id=tId).first()
        # print(Order.get_order(id=oId), paid)
        # if Order.get_order(id=oId)['paid']==paid :
        tempTable.table_order = None
        if (tempTable.occupied):
            Table.update_occupied(tId)
        db.session.commit()
        return True
        

    # to create a dict of table data to passed to client
    @staticmethod
    def get_tabels_dict():
        return {k: v for d in Table.get_all_tables() for k, v in d.serialize.items()}

    # to create a proper dict to be passed as json
    @property
    def serialize(self):
        order = {}
        if self.table_order != None:
            order = Order.get_order_items(self.table_order)
        return {
            self.table_id: {
                "table_no": self.table_no,
                "order_id": self.table_order,
                "order": order,
                "occupied": self.occupied,
            }
        }


db.create_all()

# Oredr class to manage all order related oprations.
class Order:

    # get full order details by order id
    @staticmethod
    def get_order(id):
        query = {
            '_id': ObjectId(id)
        }
        try:            
            return mongo_col.find_one(filter=query)
        except Exception as e:
            print("erroe in loadin order for id:", id)

    # get only order items by order id
    @staticmethod
    def get_order_items(id):
        try:
            query = {
                '_id': ObjectId(id)
            }
            return mongo_col.find_one(filter=query)['order']
        except Exception as e:
            print("erroe in loading order items for id:", id)

    # get multi order by id
    @staticmethod
    def get_orders_by_id(ids):
        temp_orders = {}
        try:
            for id in ids:
                query = {
                    '_id': ObjectId(id)
                }
                items = mongo_col.find_one(filter=query)
                temp_orders[id] = items
            print('order:', temp_orders)
            return temp_orders
        except Exception as e:
            print("erroe in loadin order for id:", id)
            return False

    # get all orders
    @staticmethod
    def get_orders():
        try:
            orders = {}
            cursor = mongo_col.find({}).sort([('_id',-1)]).limit(20)
            for doc in cursor:
                # print(doc)
                temp = doc.copy()
                temp['invoice id'] = str(temp['_id'])
                del temp['_id']
                orders[str(doc['_id'])] = temp
            # print(orders)
            return orders
        except Exception as e:
            print("erroe in loadin order for id:", e)
            return False

    # create new order in order db
    @staticmethod
    def add_order(p_items, uid, total):
        try:
            now = datetime.now()
            order_dict = {
                'user': uid,
                'date': now.strftime("%m/%d/%Y"),
                'time': now.strftime("%H:%M:%S"),
                'order': p_items,
                "paid": total
            }

            order_id = str(mongo_col.insert_one(order_dict).inserted_id)
            # print("Order Id:", order_id,"\n order:",order_dict)
            return order_id
        except Exception as e:
            print("error in adding order")
            return False

    # add item in order 
    @staticmethod
    def update_order(id, items):
        try:
            query = {
                '_id': ObjectId(id)
            }
            data = {'order': items}
            print(data)
            return mongo_col.update_one(query, {'$set': data}, upsert=False).inserted_id
        except Exception as e:
            print("erroe in loadin order for id:", id)
