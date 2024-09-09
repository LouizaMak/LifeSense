#!/usr/bin/env python3

# Standard library imports

# Remote library imports
import json
from flask import request, session, jsonify
from flask_restful import Resource
from openai import OpenAI

# Local imports
from config import app, db, api
from models import Sensor, Status, User, DataPoint
from datetime import datetime
from dateutil import parser

client = OpenAI()

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
            birthday = data['birthday'],
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
        else:
            return {"message": "Invalid username and password."}, 404
        
class Logout(Resource):
    def delete(self):
        session["user_id"] = None

class Profile(Resource):
    def patch(self):
        data = request.get_json()
        user = User.query.filter(User.id == session.get("user_id")).first()
        for attr in data:
            setattr(user, attr, data[attr])
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 200
    
    
# Sensor Views
class SensorIndex(Resource):
    def get(self):
        sensors_dict = [sensor.to_dict() for sensor in Sensor.query.filter(Sensor.user_id == session.get("user_id")).all()]
        return sensors_dict, 200
    
    def post(self):
        data = request.get_json()
        new_sensor = Sensor(
            manufacturer = data.get("manufacturer"),
            model = data.get("model"),
            application_date = data.get("application_date"),
            removal_date = data.get("removal_date"),
            serial = data.get("serial"),
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
    
class OpenAIAPI(Resource):
    def post(self):
        data = request.get_json()
        bgl_data = data.get('bgl_data', [])
        bgl_data_str = ', '.join(map(str, bgl_data))
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a diabetes data analyzer, skilled in explaining trends in blood glucose level and advising patients."},
                {f"role": "system", "content": f"Please look at this data list of BGL where each number was taken every 24 hours in a 2 week period. [{bgl_data_str}]"},
                {"role": "system", "content": "Return your response exactly in Python dictionary format with the following keys: 'recommendations' and 'lifestyle_changes'. Do not include any text outside of this format."},
                {"role": "system", "content": "'Recommendation key should only return your observations and not stats like average_bgl, highest_bgl, etc."},
                {"role": "system", "content": "Please make sure the values for the keys is in one string instead of an array of mutliple messages."},
            ]
        )
        res_str = completion.choices[0].message.content
        res_dict = json.loads(res_str)
        return jsonify(res_dict)
    
class DataPointIndex(Resource):
    def post(self):
        data = request.get_json()
        date_time_obj = parser.parse(data.get("date_time"))
        new_data_point = DataPoint(
            date_time = date_time_obj, 
            bgl = data.get("bgl"),
            sensor_id = data.get("sensor_id"),
            status_id = data.get("status_id")
        )
        db.session.add(new_data_point)
        db.session.commit()
        return new_data_point.to_dict(), 201
    
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Profile, '/profile', endpoint='profile')
api.add_resource(SensorIndex, '/sensors', endpoint='sensors')
api.add_resource(SensorDetails, '/sensors/<id>', endpoint='sensor_details')
api.add_resource(StatusIndex, '/statuses', endpoint='statuses')
api.add_resource(OpenAIAPI, '/ai_analyze', endpoint='ai_analyze')
api.add_resource(DataPointIndex, '/data_points', endpoint='data_points')

if __name__ == '__main__':
    app.run(port=5555, debug=True)