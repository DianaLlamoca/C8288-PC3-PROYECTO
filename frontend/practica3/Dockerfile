//Uso la imagen de node
FROM node

//Establezco 'app' como directorio actual del contenedor
WORKDIR /app

//Uso la expresión regular, para copiar los archivos que empiecen con 'package' y terminen en 'json'
//y los copio al directorio actual
COPY package*.json ./

//Instalo las dependencias definidas en el package.json con npm install
RUN npm install

//Copio todos los archivos del directorio al directorio de trabajo actual en el contenedor
COPY . .

//Expongo el puerto 3000 (allí se ejecuta el frontend)
EXPOSE 3000

//Uso npm start, porque usé create react app 
CMD ["npm","start"]
