#!/usr/bin/env bash

set -u   # crash on missing env variables
set -e   # stop on any error
set -x

# Run from project root
test ! -d scripts && echo "scripts dir not found in $PWD, exiting..." && exit 1

echo "Starting cantaloupe"
exec java -Dcantaloupe.config=/app/cantaloupe/cantaloupe.properties -Xmx2g -jar /usr/local/cantaloupe/cantaloupe-${CANTALOUPE_VERSION}.war  \
    2>&1 | tee /var/log/cantaloupe/cantaloupe.log

## Command to start cantaloupe with debug options
#exec java -Dcantaloupe.config=/app/cantaloupe/cantaloupe.properties -Xmx2g "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" -jar /usr/local/cantaloupe/cantaloupe-${CANTALOUPE_VERSION}-SNAPSHOT.war  \
#    2>&1 | tee /var/log/cantaloupe/cantaloupe.log
