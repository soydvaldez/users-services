# Este script es util para volver a generar la imagen perzonalizada docker y levantar el contenedor

WORK_DIR=deploy/postgres-service

${WORK_DIR}/image-build.sh && ${WORK_DIR}/container-run.sh