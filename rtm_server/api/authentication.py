from flask import request, make_response, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime,timedelta
import jwt
import json
import uuid

from services.database_connector import RM_USER, db
from app import app


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


@app.route("/login",methods=["POST"])
def getLogin():
    payload= json.loads(request.data)
    if not payload or not payload['email'] or not payload['password']:
        print('error 401 returned')
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="Login required !!"'}
        )
    (password,public_id) = RM_USER.query.with_entities(RM_USER.password,RM_USER.public_id).filter_by(email=payload['email']).first()
    if not password :
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="User does not exist !!"'}
        )
    print(check_password_hash(password,payload['password']))
    if check_password_hash(password,payload['password']):
        token_key= jwt.encode({
            'public_id': public_id,
            'exp': datetime.utcnow() + timedelta(minutes = 30)
        }, app.secret_key)
        return make_response(jsonify({"x-token-key":token_key}),201)

    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate' : 'Basic realm ="Wrong Password !!"'}
    )