FROM python:3.10

WORKDIR /app/backend
COPY . /app/backend
RUN pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install
