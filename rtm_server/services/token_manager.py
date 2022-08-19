from datetime import datetime,timedelta
import jwt
from flask import jsonify, request
from functools import wraps
from constant import *


def auth_token_required(func):
    @wraps(func)
    def decorated(*args,**kargs):
        _token= None
        if 'token' in request.headers:
            _token = request.headers.get('token')
        if not _token:
            return jsonify({"message": "no token found"}), 401
        
        try:
            print( "verify token: ", _token)
            user = Token.check_token(_token)
        except Exception as e:
            print(e)
            return jsonify({'message': "token invalid!"}), 401
        return func (*args, **kargs)
    return decorated

class Token:
    
    @staticmethod
    def get_token(public_id,exp_time):
        token = jwt.encode({
            'public_id': public_id,
            'exp': datetime.utcnow() + timedelta(minutes = exp_time)
        }, secret_key)
        print('toekn:',token)
        return token
    
    @staticmethod
    def check_token(token):
        # print(jwt.decode(token, secret_key, algorithms=['HS256']))
        data = jwt.decode(token, secret_key, algorithms=['HS256'])
        public_id = data['public_id']
        user="manager"
        return user

