from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import null
from services.database_connector import db
from models.item_type_model import ItemType, ItemRegion


class Menu(db.Model):
    item_id = db.Column(db.Integer, primary_key= True, autoincrement= True)
    item_name = db.Column(db.String(150), nullable= False, unique= True)
    item_type = db.Column(db.Integer, db.ForeignKey(ItemType.id))
    item_region = db.Column(db.Integer, db.ForeignKey(ItemRegion.id), nullable= True)
    item_price = db.Column(db.Integer, nullable= False)
    item_description = db.Column(db.String(200), nullable= True)
    item_img = db.Column(db.String(500), nullable= True)

    @staticmethod
    def add_menu_item(item_name, item_price, item_description=None, item_img=None, item_type=None, item_region=None):

        if item_type != None: item_type_id = ItemType.add_item_type(name=item_type)
        else: item_type_id = None
        if item_region != None: item_region_id = ItemRegion.add_region_type(name=item_region)
        else: item_region_id = None
        item = Menu(item_name=item_name,
                       item_type=item_type_id, item_region=item_region_id,
                       item_price=item_price, item_description=item_description,
                       item_img=item_img)
        db.session.add(item)
        TempMenu.add_item(item.serialize)
        return True

    @staticmethod
    def get_menu():
        return Menu.query.all()
        
    @staticmethod
    def get_item_name(id):
        return Menu.query.with_entities(Menu.item_name).filter_by(Menu.item_id.in_((id))).all()
    
    @staticmethod
    def get_menu_dict():
        TempMenu.set_menu({k:v for d in Menu.get_menu() for k,v in d.serialize.items()})
        return True

    @property
    def serialize(self):
        return {self.item_id:{
            'name':self.item_name,
            'rate':self.item_price,
            'img':self.item_img,
            'desc':self.item_description
        }}
db.create_all()

class TempMenu:
    menu={}
    @staticmethod
    def set_menu(menu_items):
        print('setting up tempMenu')
        TempMenu.menu=menu_items
    @staticmethod
    def add_item(item):
        TempMenu.menu.update(item)