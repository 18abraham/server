from app.database.db import db

class OrderDetail(db.Model):
    __table__="order_detail"

    id = db.Column(db.Integer, primary_key=True)
    garment_id = db.Column(db.Integer, db.Foreignkey("garments.id"), nullable= False)
    service_id = db.Column(db.Integer, db.Foreignkey("services.id"), nullable= False)
    quantity_id = db.Column(db.Integer, nullable=False)
