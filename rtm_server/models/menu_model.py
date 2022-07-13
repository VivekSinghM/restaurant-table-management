from services.database_connector import db
from item_type_model import ItemType, ItemRegion


class Menu(db.Model):
    item_id = db.Column(db.Integer, PrimaryKey=True, autoincrement=True)
    item_name = db.Column(db.String(30), nullable=False, unique=True)
    item_type = db.Column(db.Integer, db.ForeignKey('ItemType.id'))
    item_region = db.Column(db.Integer, db.ForeignKey('ItemRegion.id'))
    item_price = db.Column(db.Integer, nullable=False)
    item_decription = db.Column(db.String(30), nullable=False, unique=True)
    item_img = db.Column(db.String(500), nullable=True)

    @staticmethod
    def add_menu_item(item_name, item_type, item_region, item_price, item_decription, item_img):

        item_type_id = ItemType.add_item_type(name=item_type)
        item_region_id = ItemRegion.add_region_type(name=item_region)

        db.session.add(Menu(item_name=item_name,
                       item_type=item_type_id, item_region=item_region_id,
                       item_price=item_price, item_decription=item_decription,
                       item_img=item_img))
        return True

    @staticmethod
    def get_menu():
        return Menu.query.all()
