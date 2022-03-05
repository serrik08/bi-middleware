# Descargando la imagen alpine de Node.js
FROM node:14-alpine3.10

RUN apk update && \
    apk add curl && \
    apk add --update nano

# Ir a la carpeta de trabajo
WORKDIR /usr/src/app

# copiando archivos del package.json desde la maquina local a la imagen
COPY package.json ./

# run npm install in our local machine

RUN npm install -g node-gyp

# Instalación de dependencias
RUN npm install

# Copiando todo de la maquina local a la imagen
COPY . .

# Exponiendo el puerto 8080
EXPOSE 8080

# El comando con el cual se inicializara el contenedor
CMD ["node", "index.js"]