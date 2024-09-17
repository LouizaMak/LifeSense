# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from dotenv import load_dotenv
import os

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.secret_key = os.getenv('APP_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

bcrypt = Bcrypt(app)

# Instantiate CORS
CORS(app, resources={r"/*": {"origins": "http://lifesense-client.s3-website-us-east-1.amazonaws.com"}}, expose_headers=["User_id"], supports_credentials=True)
