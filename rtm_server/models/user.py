from services.db_connector import db

class RM_USER(db.Model):

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    public_id = db.Column(db.String(50), unique = True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(70), unique = True)
    password = db.Column(db.String(200))

    # get password by email
    @staticmethod
    def get_pass_ID_by_email(email):
        return RM_USER.query.with_entities(RM_USER.password,RM_USER.public_id).filter_by(email=email).first()


    @staticmethod
    def register_user(self):
        db.session.add(self)
        db.session.commit()
        return True
    
    
    @staticmethod
    def check_user(email):
        return not RM_USER.query.filter_by(email=email).first()
    
db.create_all()