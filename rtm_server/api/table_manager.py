import json
from app import app
from flask import make_response, jsonify, request
from models.table_model import Table
from pyqrcode import create as create_qr

tables = Table.get_all_tables()
table_base_URL="/"
base_file_path="/"
try:
    for table in tables:
        temp_id = table.table_id
        qr_url = table_base_URL + str(temp_id)
        qr = create_qr(qr_url)
        qr.svg(base_file_path + temp_id + ".svg", qr)
        qr.png(base_file_path + temp_id + ".png", qr)
except Exception:
    pass

@app.route("/table", methods=["GET"])
def load_table_data():
    args = request.args
    t_data = Table.get_Table(args.get("tId")).__dict__
    return make_response( jsonify(t_data) ,201)

@app.route('/order', methods=['POST'])
def order_food():
    tid = request.args.get('tid')
    print(tid)
    order= json.loads(request.data)['order']
    print(order)
    order_id=Table.add_order(tid,order)
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
    print([i.serialize for i in Table.get_all_tables()])
    t_data = Table.get_tabels_dict()
    return make_response( jsonify(t_data) ,201)