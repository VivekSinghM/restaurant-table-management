from services.database_connector import db

class RM_USER(db.Model):
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    public_id = db.Column(db.String(50), unique = True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(70), unique = True)
    password = db.Column(db.String(200))

    @staticmethod
    def get_public(email):
        return RM_USER.query.with_entities(RM_USER.password,RM_USER.public_id).filter_by(email=email).first()
    @regis
    def 
db.create_all()