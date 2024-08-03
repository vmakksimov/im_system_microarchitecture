echo "Waiting for postgres..."
while ! timeout 1 bash -c 'echo > /dev/tcp/db-flask-ms/5430' 2>/dev/null; do
  sleep 1
done

echo "PostgreSQL started"

# Run migrations
flask db upgrade

# Start the the local server
# exec flask run --host=0.0.0.0 --port=5000
# Start the production server
exec gunicorn --bind 0.0.0.0:5000 app:myapp