from flask import Flask, request, jsonify
from flask_cors import CORS
from constant import *

app = Flask(__name__)
app.secret_key = secret_key

CORS(app)
cors=CORS(app,resources={
    r"/*":{
        "origins":"*"
    }
})

def config_db():
    from services.db_connector import db
    LOCAL_DATABASE_URL = SQL_URI[postgress]
    app.config['SQLALCHEMY_DATABASE_URI'] = LOCAL_DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = app
    db.init_app(app)

config_db()

def register_blueprints(app):
    from api.all_api import auth_blueprint, base_blueprint, menu_blueprint, table_blueprint

    app.register_blueprint(auth_blueprint)
    app.register_blueprint(base_blueprint)
    app.register_blueprint(menu_blueprint)
    app.register_blueprint(table_blueprint)

register_blueprints(app)

if __name__ == '__main__':
    app.run(debug=True)
