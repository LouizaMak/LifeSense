FROM python:3.9.20-alpine3.20
WORKDIR /app
COPY . /app
RUN pip install --upgrade pip 
RUN pip install -r requirements.txt
EXPOSE 5555
CMD python ./app.py