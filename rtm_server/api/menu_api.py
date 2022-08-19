import json
from models.menu import Menu, TempMenu
from flask import Blueprint, make_response, jsonify, request

menu_blueprint = Blueprint(name='menu_routes',import_name=__name__)

@menu_blueprint.route('/getMenu', methods=['GET'])
def get_menu():
    return make_response(jsonify(TempMenu.menu) ,201)

@menu_blueprint.route('/addMenuItem',methods=['POST'])
def add_menu_item():
    temp_items=json.loads(request.data)
    print("adding : ", temp_items)
    Menu.add_menu_item(item_name = temp_items['name'], item_price = int(temp_items['price']), item_img = temp_items['img'], item_description = temp_items['desc'])
    return make_response('true',201)
