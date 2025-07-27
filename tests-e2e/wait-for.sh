#!/bin/sh
# wait-for.sh

host="$1"
shift

until nc -z -v -w30 $(echo $host | cut -d':' -f1) $(echo $host | cut -d':' -f2); do
  echo "⏳ Waiting for $host..."
  sleep 2
done

echo "✅ $host is up — executing command"
exec "$@"