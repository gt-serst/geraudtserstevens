FROM python:3.13-slim

WORKDIR /app

COPY . .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY /tools/entrypoint.sh ../usr/local/bin/

EXPOSE 8000

RUN chmod +x ../usr/local/bin/entrypoint.sh

ENTRYPOINT ["bash", "../usr/local/bin/entrypoint.sh"]
