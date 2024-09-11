FROM python:3-alpine3.8
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 5555
CMD python ./app.py