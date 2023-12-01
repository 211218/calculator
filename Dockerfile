# Usa la imagen base de React.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

COPY package*.json ./

# Instala todas las dependencias, incluyendo las de desarrollo
RUN npm install

# Copia los archivos de la aplicación al contenedor
COPY . .

# Construye la aplicación React para producción
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación (puede variar según tu aplicación)
CMD ["npm", "start"]