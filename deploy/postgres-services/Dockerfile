# Contexto de la imagen: deploy/postgres-service
FROM postgres:16.3-alpine3.20
EXPOSE 5432
# Copia el script en el entry-point del contenedor para que el servidor postgres se inicialice con las tablas: roles y users.
COPY sql/roles-users.sql /docker-entrypoint-initdb.d/