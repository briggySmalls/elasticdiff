echo "Installing netcat..."
apt-get install -yq netcat
echo "Netcat installed!"

echo "Waiting for Elasticsearch..."

while ! nc -z elasticsearch 9200; do
  sleep 0.1
done

echo "Elasticsearch started!"

echo "Importing data..."
elasticdump --input=/data/tmdb-dump.json --output=$ELASTIC_SEARCH --output-index=$INDEX_NAME --type=data
echo "Data imported!"
