#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api, bcrypt
from models import Sensor, DataPoint, Status, User
from datetime import datetime

# User Views
class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        user = User.query.filter(user_id == User.id).first()
        if not user:
            return {}, 204
        else:
            return user.to_dict(), 200

class Signup(Resource):
    def post(self):
        data = request.get_json()
        user = User(
            username=data['username'],
            email=data['email'],
            first_name = data['first_name'],
            last_name = data['last_name'],
            age = data['age'],
            gender = data['gender'],
            date_joined = datetime.fromisoformat(data['date_joined'].replace("Z", "+00:00")).date()
        )
        user.password_hash = data['password']
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
        
class Logout(Resource):
    def delete(self):
        session["user_id"] = None

class Profile(Resource):
    def patch(self):
        data = request.get_json()
        user = User.query.filter(User.username == data['username']).first()
        for attr in data:
            setattr(user, attr, data[attr])
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 200
    
    
# Sensor Views
class SensorIndex(Resource):
    def get(self):
        sensors_dict = [sensor.to_dict() for sensor in Sensor.query.filter_by(Sensor.user_id == session.get("user_id")).all()]
        return sensors_dict, 200
    
    def post(self):
        data = request.get_json()
        new_sensor = Sensor(
            manufacturer = data.get("manufacturer"),
            model = data.get("model"),
            application_date = data.get("application_date"),
            removal_date = data.get("removal_date"),
            user_id = session.get("user_id")
        )
        db.session.add(new_sensor)
        db.session.commit()
        return new_sensor.to_dict(), 201 
    
class SensorDetails(Resource):
    def get(self, id):
        sensor = Sensor.query.get(id)
        if sensor:
            return sensor.to_dict(), 200
        return {"message": "Sensor not found"}, 404
    
    def patch(self, id):
        data = request.get_json()
        sensor = Sensor.query.get(id)
        for attr in data:
            setattr(sensor, attr, data[attr])
        db.session.add(sensor)
        db.session.commit()
        return sensor.to_dict()
    
# Status Views
class StatusIndex(Resource):
    def get(self):
        statuses_dict = [status.to_dict() for status in Status.query.all()]
        return statuses_dict, 200
    
    def post(self):
        data = request.get_json()
        new_status = Status(
            severity = data.get("severity"),
            min = data.get("min"),
            max = data.get("max")
        )
        db.session.add(new_status)
        db.session.commit()
        return new_status.to_dict(), 201 
    
    def patch(self, id):
        data = request.get_json()
        status = Status.query.get(id)
        for attr in data:
            setattr(status, attr, data[attr])
        db.session.add(status)
        db.session.commit()
        return status.to_dict()
    
    def delete(self, id):
        status = Status.query.get(id)
        status_dict = status.to_dict()
        db.session.delete(status)
        db.session.commit()
        return status_dict, 200
    
# Datapoint Views
class DataPoint(Resource):
    def get(self):
        datapoints_dict = [datapoint.to_dict() for datapoint in DataPoint.query.all()]
        return datapoints_dict, 200
    
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Profile, '/profile', endpoint='profile')
api.add_resource(SensorIndex, '/sensors', endpoint='sensors')
api.add_resource(SensorDetails, '/sensors/<id>', endpoint='sensor_details')
api.add_resource(StatusIndex, '/statuses', endpoint='statuses')

if __name__ == '__main__':
    app.run(port=5555, debug=True)