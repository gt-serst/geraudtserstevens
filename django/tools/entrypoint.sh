#!/bin/sh
sleep 3
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser \
    --noinput \
    --username ${DJANGO_SUPERUSER_USERNAME} \
    --email ${DJANGO_SUPERUSER_EMAIL}
python manage.py collectstatic --noinput
python manage.py runserver 0.0.0.0:8000
