from app import app
from flask_sqlalchemy import SQLAlchemy

from constant import *

app.config['SQLALCHEMY_DATABASE_URI']= SQL_URI[postgress]
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)