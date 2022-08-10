from flask import Flask
from constant import *

app= Flask(__name__)
app.secret_key=secret_key


