from app import app
import api.all_api_call
import models.menu_model
from models.table_model import Table

Table.get_tabels_dict()
if __name__ == '__main__':
    app.run(debug=True)