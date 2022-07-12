from flask import request, make_response
from app import app
import json

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