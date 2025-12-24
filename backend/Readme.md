1. ./start-db.sh 
make sure script is running and mongodb container is up

2. docker ps

3. docker run \
--rm -it --name=mongosh \
--network=key-value-net \
mongodb/mongodb-community-server:7.0-ubuntu2204 \
mongosh mongodb://key-value-user:key-value-password@mongodb/key-value-db
make sure this works

# setup express application

4. cd into backend folder

5. npm init -y

6. create .gitignore file and add node_modules/ to it

7. npm i \
express@4.19.2 \
mongoose@8.5.1 \
body-parser@1.20.2 \
--save-exact
