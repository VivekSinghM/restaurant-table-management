from services.database_connector import db


class ItemType(db.Model):
    id = db.Column(db.Integer, PrimeryKey=True, autoincrement=True)
    name = db.Column(db.String(30), nullable=False, unique=True)

    @staticmethod
    def add_item_type(name):
        db.session.add(ItemType(name=name))
        db.session.commit()
        return ItemType.query.filter_by(name=name).first()[0]

    @staticmethod
    def get_item_type_id(name):
        return ItemType.query.filter_by(name=name).first()[0]


class ItemRegion(db.Model):
    id = db.Column(db.Integer, PrimeryKey=True, autoincrement=True)
    name = db.Column(db.String(30), nullable=False, unique=True)

    @staticmethod
    def add_region_type(name):
        db.session.add(ItemRegion(name=name))
        db.session.commit()
        return ItemType.query.filter_by(name=name).first()[0]

    @staticmethod
    def get_item_region_id(name):
        return ItemType.query.filter_by(name=name).first()[0]
