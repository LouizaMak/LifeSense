# LifeSense

LifeSense is a data tracking and analysis software designed to help people diagnosed with diabetes monitor their health and receive instant medical suggestions in the comfort of their own home. Using the OPENAI API, we can submit sets of data for AI analysis that check for at-risk readings as well as noticeable trends overtime. This can help people learn about their daily habits as well as what they can change for the betterment of their health and diagnosis.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Where Do I Start?](#wheredoistart?)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [License](#license)

## Features
- Login/Logout
- User session data maintained
- Add, delete, and manage each datapoint
- Personalize profile page
- AI Analysis toggle
- AI Analysis of data sets
- Datapoint's color assigned by statuses/risk
- Database for users, sensors, datapoints, and statuses

## Prerequisites
- Node.js
- npm
- Python
- Pipenv
- React
- Flask
- MUI
- flask-sqlalchemy==3.0.3
- flask-migrate
- sqlalchemy-serializer
- flask-restful
- flask-cors
- openai
- formik
- yup

## Installation

1. Clone the repository:
```
$ git clone https://github.com/PartSloth/LifeSense
```

2. Install the client dependencies:
```
$ cd client
$ npm install --prefix client
```

3. Set up the Python environment and install dependencies:
```
$ cd ../server
$ pipenv install
```

## Fully Deployed Version

I have fully deployed my backend on an AWS EC2 container and an AWS S3 bucket.
http://lifesense-client.s3-website-us-east-1.amazonaws.com/profile

## Where Do I Start?

In the project directory, run:

```
$ npm start --prefix client
```

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In a separate terminal, run:

```
$ pipenv shell
$ cd server
$ export FLASK_APP=app.py
$ flask db init
$ python seed.py
```

This will initiate the database and seed the data for the backend. After, run:

```
$ python app.py
```

Backend JSON data can be found at:\
[http://127.0.0.1:5555/data_points/<id>](http://127.0.0.1:5555/data_points/1)\
[http://127.0.0.1:5555/sensors/<id>](http://127.0.0.1:5555/sensors/1)\
[http://127.0.0.1:5555/statuses](http://127.0.0.1:5555/statuses)

Your app is ready to be deployed!
See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

## Usage
Demo video [here](https://www.youtube.com/watch?v=RkpTeuWT4yM).

## Roadmap
![Static Badge](https://img.shields.io/badge/09%2F20%2F24-blue)

Future implementations:

- Adding, updating, and deleting your own statuses
- Uploading profile pictures
- Function to compile selected sensor data sets into printable file
- Deleting profile

## License
[MIT](https://choosealicense.com/licenses/mit/)