SERVICE_NAME=users-services
WORKDIR=deploy/users-services

docker-compose logs -f ${SERVICE_NAME} | tee "${WORKDIR}/logs/monitor_users-services.txt"