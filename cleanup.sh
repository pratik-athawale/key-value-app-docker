# 1. stop and remove mongodb containers
# 2. stop and remove app containers
# 3. remove volumes
# 4. remove networks

source .env.db
source .env.backend
source .env.volume
source .env.network

if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Removing container $DB_CONTAINER_NAME"
    docker kill $DB_CONTAINER_NAME # docker rm $DB_CONTAINER_NAME add if not using --rm flag while running container
else
    echo "A container with name $DB_CONTAINER_NAME does not exists, skiping container deletion"
fi

if [ "$(docker ps -aq -f name=$BACKEND_CONTAINER_NAME)" ]; then
    echo "Removing container $BACKEND_CONTAINER_NAME"
    docker kill $BACKEND_CONTAINER_NAME # docker rm $BACKEND_CONTAINER_NAME add if not using --rm flag while running container
else
    echo "A container with name $BACKEND_CONTAINER_NAME does not exists, skiping container deletion"
fi

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "Removing volume $VOLUME_NAME"
    docker volume rm $VOLUME_NAME
else
    echo "A volume with name $VOLUME_NAME does not exists. skipping volume deletion."
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "Removing network $NETWORK_NAME"
    docker network rm $NETWORK_NAME
else
    echo "A network with name $NETWORK_NAME does not exists. skipping network deletion."
fi