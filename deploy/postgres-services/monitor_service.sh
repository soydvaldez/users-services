SERVICE_NAME=users-postgres-services
WORKDIR=deploy/postgres-service

docker-compose logs -f ${SERVICE_NAME} | tee "${WORKDIR}/logs/monitor_postgres-service.txt"