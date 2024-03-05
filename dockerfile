FROM python:alpine

WORKDIR /app

COPY execute_code.py .

CMD ["python", "execute_code.py"]