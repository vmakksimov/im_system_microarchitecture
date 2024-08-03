echo "Waiting for postgres..."
while ! timeout 1 bash -c 'echo > /dev/tcp/db-django-auth/5432' 2>/dev/null; do
  sleep 1
done

echo "PostgreSQL started"

# Run migrations
python manage.py makemigrations
python manage.py migrate


# Start the the local server
# exec python manage.py runserver 0.0.0.0:8000
# Start the production server
exec gunicorn api_users.wsgi:application -w 2 -b 0.0.0.0:8000