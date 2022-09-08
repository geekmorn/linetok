FROM python:3.10
WORKDIR /app
COPY ./ /app
COPY ./requirements.txt /app
COPY ./run.py /app

RUN pip3 install --no-cache-dir --upgrade -r requirements.txt
EXPOSE 8000