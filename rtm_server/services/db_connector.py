from pymongo import MongoClient
import os
from flask_sqlalchemy import SQLAlchemy

from constant import *
db = SQLAlchemy()

mongo_client = MongoClient(NOSQL_URI[mongodb])

mongo_col = mongo_client['RTM']['Orders']
