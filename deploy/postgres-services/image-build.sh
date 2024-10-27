
WORK_DIR=deploy/postgres-service
DOCKER_FILE=deploy/postgres-service/Dockerfile

echo "${WORK_DIR}"
docker build -f "${DOCKER_FILE}" \
 -t localhost:5000/server-heroes-postgres:1.0.0 \
 -t localhost:5000/server-heroes-postgres:latest \
 ${WORK_DIR}