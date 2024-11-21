//Uso la imagen de node
FROM node

//Establezco /app como directorio de trabajo 
WORKDIR /app

//Copio los archivos que inician con package y terminan en json (incluye en package.json como el package.lok)
COPY package*.json ./

//Instalo npm para ejecutar y correr el servidor
RUN npm install

//Copio todos los archivos de la carpeta al directorio actual del contenedor
COPY . .

//Expongo el puerto 3001 (pues allí corre el servidor)
EXPOSE 3001

//Ejecuto y corro el servidor
CMD ["node","server.js"]
