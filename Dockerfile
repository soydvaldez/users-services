# Etapa 1: Construcción
FROM node:20-alpine3.20 as build
# FROM node AS build

# Definir el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package.json package-lock.json ./

# Instalar las dependencias (devDependencies también para la compilación)
RUN npm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Compilar el código TypeScript
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine3.20 AS production
# FROM node AS production

# RUN apt update && apt install -y curl
# Definir el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (solo las dependencias de producción)
COPY package.json package-lock.json ./
COPY .env.production ./

# Instalar solo las dependencias necesarias para producción
RUN npm install --only=production

# Copiar los archivos compilados desde la etapa anterior
COPY --from=build /app/dist ./dist

# Definir el comando para ejecutar la aplicación en producción
CMD ["node", "dist/index.js"]

