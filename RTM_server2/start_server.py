from models.menu_model import TempMenu
from app import app
import api.all_api_call

TempMenu.load_All_Menu()
if __name__ == '__main__':
    app.run(debug=True)