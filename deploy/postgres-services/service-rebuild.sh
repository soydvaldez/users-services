SERVICE_NAME=users-postgres-services

docker-compose down  ${SERVICE_NAME} && 
docker-compose build ${SERVICE_NAME} && 
docker-compose up -d ${SERVICE_NAME}

docker tag localhost:5000/${SERVICE_NAME}:1.0.0 localhost:5000/${SERVICE_NAME}:latest

echo "users-postgres-services"
