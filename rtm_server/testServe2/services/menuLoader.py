from services.database_connector import mongo_client
from models.menu_model import Menu,db
result = mongo_client['RTM']['foodx'].aggregate([{'$sample': {'size': 10}}])
for data in result:
    # id = data['_id']
    name = data['Category']
    Description = data['Description']
    price = data['price']
    Menu.add_menu_item(item_name= name, item_price= price, item_decription= Description)
db.session.commit()