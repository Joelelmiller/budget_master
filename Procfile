pip install psycopg2 -I
pip install django-heroku -I
release: python manage.py migrate
web: gunicorn budget_master.wsgi:application --log-file -

