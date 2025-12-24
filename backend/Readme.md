1. ./start-db.sh 
make sure script is running and mongodb container is up

2. docker ps

3. docker run \
--rm -it --name=mongosh \
--network=key-value-net \
mongodb/mongodb-community-server:7.0-ubuntu2204 \
mongosh mongodb://key-value-user:key-value-password@mongodb_c/key-value-db
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

8. echo "node_modules" > .dockerignore

9. now run `npm start`
this wont work and gives `MongooseServerSelectionError: getaddrinfo ENOTFOUND mongodb_c` because it doesnt know what mongodb_c is like how we know its a container, for this what we can do is we can create a dockerimage for our express app, run its container in the same network in which mongodb_c is, then it should be able to resolve and connect to it.

# dockerize express app

10. create Dockerfile.dev to dockerize application

11. docker build \
-t key-value-backend \
-f Dockerfile.dev \
.

12. docker images

13. docker run \
-d --name=backend \
--network=key-value-net \
-p 3000:3000 \
key-value-backend

14. docker ps

15. docker logs backend
this should show logs that express app is working and listening, connected to db and all.

16. curl http://localhost:3000/health
show show `up`
*note we were able to connect to mongodb container just be specifying container name mongodb_c and it resolved it, we didnt have to specify full address.s