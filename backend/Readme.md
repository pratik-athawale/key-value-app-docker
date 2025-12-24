1. ./start-db.sh 
make sure script is running and mongodb container is up

2. docker ps

3. docker run \
--rm -it --name=mongosh \
--network=key-value-net \
mongodb/mongodb-community-server:7.0-ubuntu2204 \
mongosh mongodb://key-value-user:key-value-password@mongodb/key-value-db
make sure this works

