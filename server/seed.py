#!/usr/bin/env python3

# Standard library imports
from random import randint, choice

# Remote library imports
from faker import Faker
from flask_bcrypt import Bcrypt
import datetime

# Local imports
from app import app
from models import db, Sensor, DataPoint, Status, User

# Manufacturer and model information
manu_model_list = [
    {'Dexcom': ['G7', 'G6 Personal', 'G6 Pro']}, 
    {'Medtronic': ['Guardian Sensor 3']}, 
    {'Abbott': ['FreeStyle Libre 2', 'FreeStyle Libre 3']}, 
    {'Eversense': ['E3']}, 
    {'Roche': ['Accu-Chek SmartGuide']}
    ]

# Base Users
users_dict = [
    {'first_name': 'Jeanette',
     'last_name': 'Burr',
     'manufacturer': 'Dexcom',
     'model': 'G6 Pro',
     'gender': 'F',
     'date_joined': datetime.date(2016, 10, 2)
    },
    {'first_name': 'Tracy',
     'last_name': 'Axel',
     'manufacturer': 'Abbott',
     'model': 'FreeStyle Libre 3',
     'gender': 'F',
     'date_joined': datetime.date(2016, 3, 17)
    },
    {'first_name': 'Chance',
     'last_name': 'Nickels',
     'manufacturer': 'Medtronic',
     'model': 'Guardian Sensor 3',
     'gender': 'M',
     'date_joined': datetime.date(2015, 1, 1)
    },
    {'first_name': 'Justin',
     'last_name': 'Bacon',
     'manufacturer': 'Eversense',
     'model': 'E3',
     'gender': 'M',
     'date_joined': datetime.date(2017, 4, 19)
    },
    {'first_name': 'Patrick',
     'last_name': 'Charles',
     'manufacturer': 'Dexcom',
     'model': 'G7',
     'gender': 'M',
     'date_joined': datetime.date(2016, 6, 30)
    }
]

# Seeding for sensors
def create_sensors():
    sensors = []
    for _ in range(20):
        num = randint(0,4)
        date_list = generate_app_rem_dates()
        s = Sensor(
            manufacturer = users_dict[num]['manufacturer'],
            model = users_dict[num]['model'],
            application_date = date_list[0],
            removal_date = date_list[1],
            user_id = num
        )
        sensors.append(s)
    return sensors

def generate_app_rem_dates():
    app = fake.date_between(start_date='-5y', end_date='now')
    rem = app + datetime.timedelta(days=14)
    return [app, rem]

# Seeding for users
def create_users():
    users = []
    for user in users_dict:
        password = fake.word() + str(randint(0,99)) + fake.word()
        u = User(
            username = fake.word() + fake.word() + str(randint(0,99)),
            _password_hash = bcrypt.generate_password_hash(password),
            date_joined = user['date_joined'],
            first_name = user['first_name'],
            last_name = user['last_name'],
            age = randint(21, 99),
            gender = user['gender'],
        )
        users.append(u)
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
    bcrypt = Bcrypt()
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