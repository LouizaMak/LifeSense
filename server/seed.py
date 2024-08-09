#!/usr/bin/env python3

# Standard library imports
from random import randint, choice

# Remote library imports
from faker import Faker
import datetime

# Local imports
from app import app
from models import db, Sensor, DataPoint, Status, User

# Seeding for sensors
def create_sensors():
    sensors = []
    for _ in range(20):
        manu_model = generate_manu_model(randint(0,4))
        date_list = generate_app_rem_dates()
        s = Sensor(
            manufacturer = manu_model[0],
            model = manu_model[1],
            application_date = date_list[0],
            removal_date = date_list[1],
            user_id = randint(0,5)
        )
        sensors.append(s)
    return sensors

def generate_manu_model(num):
    manu_model_list = [
        {'Dexcom': ['G7', 'G6 Personal', 'G6 Pro']}, 
        {'Medtronic': 'Guardian Sensor 3'}, 
        {'Abbott': ['FreeStyle Libre 2', 'FreeStyle Libre 3']}, 
        {'Eversense': 'E3'}, 
        {'Roche': 'Accu-Chek SmartGuide'}
        ]
    manu_model = manu_model_list[num]
    manu = list(manu_model.keys())[0]
    model_length = len(manu_model[manu]) - 1
    model = manu_model[manu][randint(0, model_length)]
    return [manu, model]

def generate_app_rem_dates():
    app = fake.date_between(start_date='-2y', end_date='now')
    rem = app + datetime.timedelta(days=14)
    return [app, rem]

# Seeding for users
def create_users():
    users = []
    return users

# Seeding for datapoints
def create_datapoints():
    datapoints = []
    return datapoints

# Seeding for statuses
def create_statuses():
    statuses = []
    return statuses

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        print("Clearing db...")
        Sensor.query.delete()
        DataPoint.query.delete()
        Status.query.delete()
        User.query.delete()

        print("Seeding sensors...")
        sensors = create_sensors()
        db.session.add_all(sensors)
        db.session.commit()

        print("Seeding datapoints...")
        datapoints = create_datapoints()
        db.session.add_all(datapoints)
        db.session.commit()

        print("Seeding statuses...")
        statuses = create_statuses()
        db.session.add_all(statuses)
        db.session.commit()

        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Done seeding!")