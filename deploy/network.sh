#!/bin/bash
# Script para inspeccionar la red Docker especificada a través de docker-compose.
# Extrae el nombre de la red y los contenedores asociados, mostrando los resultados en formato JSON.
# Dependencias: jq

NAME_NETWORK=app-network
docker network inspect ${NAME_NETWORK} | jq '{"Name": .[].Name ,"Containers": .[].Containers}'