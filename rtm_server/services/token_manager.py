from datetime import datetime,timedelta
import jwt

from app import app

class Token:
    def get_token(public_id):
        return jwt.encode({
            'public_id': public_id,
            'exp': datetime.utcnow() + timedelta(minutes = 30)
        }, app.secret_key)
    def check_token(token):
        pass
