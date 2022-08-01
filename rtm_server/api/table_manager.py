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

@app.route('/order', methods=['GET'])
def order_food():
    data = request.args.to_dict()
    print(data['tId'],data)
    order_id=Table.add_order(data.pop('tId'),data)
    return jsonify({'order_id':order_id})

@app.route('/bill', methods=['GET'])
def get_bill():
    args = request.args
    pass