# docker run --name server-heroes -p 3000:3000 --rm localhost:5000/server-heroes:latest
# source buildimage.sh

WORK_DIR=deploy/server-heroes
SERVICE_NAME=server-heroes

docker-compose up ${SERVICE_NAME} -d
docker-compose logs -f ${SERVICE_NAME} | tee ${WORK_DIR}/logs_server_heroes.txt