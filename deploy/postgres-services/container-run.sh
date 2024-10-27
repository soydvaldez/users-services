WORK_DIR=deploy/postgres-service
DOCKER_FILE=deploy/postgres-service/Dockerfile

SERVICE_NAME=postgres-service

docker-compose up ${SERVICE_NAME} -d
docker-compose logs -f ${SERVICE_NAME} | tee ${WORK_DIR}/logs/logs_postgres-service.txt