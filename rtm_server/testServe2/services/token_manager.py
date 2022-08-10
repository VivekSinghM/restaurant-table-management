from datetime import datetime,timedelta
import jwt

from app import app

class Token:
    
    def get_token(public_id,exp_time):
        return jwt.encode({
            'public_id': public_id,
            'exp': datetime.utcnow() + timedelta(minutes = exp_time)
        }, app.secret_key)
    
    def check_token(token):
        pass

    def refresh_token(public_id,exp_time):
        pass
