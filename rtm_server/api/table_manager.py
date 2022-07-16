from app import app
from flask import make_response, jsonify
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

@app.route('table/<str:t_id>')
def load_table_data(t_id):
    t_data = Table.get_Table().__dict__; t_data.pop()
    return make_response( jsonify(Table.get_Table().__dict__) ,201)

@app.route('order/<str:t_id>', mtehod=['GET'])
def order_food():
    pass

@app.route('bill/<str:t_id>', mtehod=['GET'])
def get_bill():
    pass