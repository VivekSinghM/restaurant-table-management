from flask import Flask,jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
import json
from  werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime,timedelta
# from functools import warps
import secrets
import uuid
import jwt

from constant import *

app= Flask(__name__)
app.secret_key=secret_key


#print(RM_USER.query.max(RM_USER.id))

@app.route("/users")
def users():
    return jsonify({'user1':{'name':'vvk'}})

@app.route("/signup",methods=["POST"])
def getSignup():
    payload= json.loads(request.data)
    name, email, password = payload['name'], payload['email'], payload['password']
    user = RM_USER.query.filter_by(email=email).first()
    if not user:
        user = RM_USER(
            # id=RM_USER.query.query.with_entities(RM_USER.id).max(),
            public_id = str(uuid.uuid4()),
            name = name,
            email = email,
            password = generate_password_hash(password)
        )
        db.session.add(user)
        db.session.commit()
        return make_response('Signup successful',201)
    else:
        return make_response('User already exists go to login',202)

if __name__=='__main__':
    app.run(debug=True)