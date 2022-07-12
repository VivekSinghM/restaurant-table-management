token_key= jwt.encode({
            'public_id': public_id,
            'exp': datetime.utcnow() + timedelta(minutes = 30)
        }, app.secret_key)