from pymongo import MongoClient
import os
from flask_sqlalchemy import SQLAlchemy

from constant import *
db = SQLAlchemy()

def config_db(app):
    LOCAL_DATABASE_URL = SQL_URI[postgress]
    app.config['SQLALCHEMY_DATABASE_URI'] = LOCAL_DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = app
    db.init_app(app)

mongo_client = MongoClient(NOSQL_URI[mongodb])

mongo_col = mongo_client['RTM']['Orders']
