FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN useradd -m venkat
COPY . .
EXPOSE 8080
USER venkat
CMD ["python", "app.py"]
