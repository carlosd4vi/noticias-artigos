FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# O --host 0.0.0.0 é obrigatório no Docker para aceitar conexões externas
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]