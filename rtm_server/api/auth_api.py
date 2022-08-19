from flask import Blueprint, request, make_response, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import json
import uuid
from services.token_manager import Token

from models.user import RM_USER

auth_blueprint= Blueprint( name='auth_blueprint', import_name=__name__)

@auth_blueprint.route("/signup",methods=["POST"])
def getSignup():
    payload= json.loads(request.data)
    name, email, password = payload['name'], payload['email'], payload['password']
    if RM_USER.check_user(email=email):
        user = RM_USER(
            # id=RM_USER.query.query.with_entities(RM_USER.id).max(),
            public_id = str(uuid.uuid4()),
            name = name,
            email = email,
            password = generate_password_hash(password)
        )
        RM_USER.register_user(user)
        return make_response('Signup successful',201)
    else:
        return make_response('User already exists go to login',202)


@auth_blueprint.route("/login",methods=["POST"])
def getLogin():
    payload= json.loads(request.data)
    print(payload)
    if not payload or not payload['email'] or not payload['password']:
        print('error 401 returned')
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="Login required !!"'}
        )
    (password, public_id)= RM_USER.get_pass_ID_by_email(payload['email'])
    if not password :
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="User does not exist !!"'}
        )

    if check_password_hash(password,payload['password']):
        token= Token.get_token( public_id, 30)

        return make_response( jsonify({"token": token,"exp_time":30}), 201)
    # print(password,payload['password'])
    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate' : 'Basic realm ="Wrong Password !!"'}
    )