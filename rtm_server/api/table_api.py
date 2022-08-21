import json
from models.table import Order, Table
from pyqrcode import create as create_qr
from constant import base_file_path, table_base_URL
from flask import Blueprint, make_response, jsonify, request

from services.token_manager import auth_token_required

table_blueprint = Blueprint(name='table_routes',import_name=__name__)

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

@table_blueprint.route("/table", methods=["GET"])
def load_table_data():
    args = request.args
    t_data = Table.get_Table(args.get("tId")).__dict__
    return make_response( jsonify(t_data) ,201)

@table_blueprint.route("/deleteTables", methods=["DELETE"])
@auth_token_required
def delete_tables():
    t_data = Table.delete_tables()
    return make_response( jsonify({'isDelete':t_data}) ,201)

@table_blueprint.route("/addTables", methods=["POST"])
@auth_token_required
def add_tables():
    print("data ",request.data)
    num = json.loads(request.data)['tables']
    t_data = Table.genrate_tables(num)
    return make_response( jsonify(t_data) ,201)

@table_blueprint.route("/tables", methods=["GET"])
@auth_token_required
def load_all_tables():
    t_data = Table.get_tabels_dict()
    return make_response( jsonify(t_data) ,201)

@table_blueprint.route('/place_order', methods=['POST'])
def place_order():
    tid = request.args.get('tid')
    # print(json.loads(request.data))
    order= json.loads(request.data)['order']
    order_id=Table.create_order(tid,order)
    return jsonify({'order_id':order_id})

@table_blueprint.route('/close_order', methods=['GET','POST'])
@auth_token_required
def close_order():
    tid = request.args.get('tid')
    oid = json.loads(request.data)['order_id']
    paid = json.loads(request.data)['paid_amount']
    result = Table.close_order(tid,oid,paid)
    return make_response( jsonify({'closed':result}) ,201)
    

@table_blueprint.route('/getOrders', methods=['GET'])
# @auth_token_required
def get_orders():
    print("getOrder order_ids:")
    orders=Order.get_orders()
    return jsonify(orders)

@table_blueprint.route('/order/addItems', methods=['GET','POST'])
def add_items():
    tid = request.args.get('tid')
    order= json.loads(request.data)
    [(order_id,items)]=order.items()
    print(Table.add_items(order_id,items))
    return jsonify({'order_id':order_id})
