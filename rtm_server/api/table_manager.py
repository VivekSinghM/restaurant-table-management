import json
from app import app
from flask import make_response, jsonify, request
from models.table_model import Order, Table
from pyqrcode import create as create_qr
from constant import base_file_path, table_base_URL


def get_table_qr():
    tables = Table.get_all_tables()
    try:
        for table in tables:
            temp_id = table.table_id
            qr_url = table_base_URL + str(temp_id)
            qr = create_qr(qr_url)
            qr.svg(base_file_path + temp_id + ".svg", qr)
            qr.png(base_file_path + temp_id + ".png", qr)
        return True
    except Exception as e:
        print(e)
        return False

@app.route("/table", methods=["GET"])
def load_table_data():
    args = request.args
    t_data = Table.get_Table(args.get("tId")).__dict__
    return make_response( jsonify(t_data) ,201)

@app.route('/order', methods=['POST'])
def place_order():
    tid = request.args.get('tid')
    print(json.loads(request.data))
    order= json.loads(request.data)['order']
    order_id=Table.add_order(tid,order)
    return jsonify({'order_id':order_id})

@app.route('/getOrders', methods=['POST'])
def get_orders():
    order_ids=json.loads(request.data)['ids']
    print("getOrder order_ids:",order_ids)
    orders=Order.get_orders(order_ids)
    return jsonify(orders)

@app.route('/order/addItems', methods=['GET','POST'])
def add_items():
    tid = request.args.get('tid')
    order= json.loads(request.data)
    [(order_id,items)]=order.items()
    print(Table.add_items(order_id,items))
    return jsonify({'order_id':order_id})

@app.route('/bill', methods=['GET'])
def get_bill():
    args = request.args
    pass

@app.route("/genrate_tables", methods=["GET"])
def genrate_tables():
    args = request.args
    t_data = Table.genrate_tables(args.get("totalNo"))
    return make_response( jsonify(t_data) ,201)

@app.route("/tables", methods=["GET"])
def load_all_tables():
    t_data = Table.get_tabels_dict()
    return make_response( jsonify(t_data) ,201)