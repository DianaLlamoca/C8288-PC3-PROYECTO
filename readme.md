# PROYECTO 2: SISTEMA DE DETECCIÓN DE INTRUSOS EN TIEMPO REAL CON APRENDIZAJE AUTOMÁTICO
## DESCRIPCIÓN:
Crea una aplicación que analice un conjunto de datos de tráfico de red preexistente para detectar posibles intrusiones utilizando un algoritmo básico de clustering como K-Means con Tensorflow.js.
Utiliza Node.js para procesar los datos y React para visualizar alertas y estadísticas simples.
Implementa una API REST básica para manejar los datos. Realiza pruebas unitarias enfocadas en el algoritmo de detección con Jest. Conteneriza el proyecto con un contenedor para el backend y otro para el frontend.

=========
# BACKEND:

# 1) Analizando el conjunto de datos de tráfico de red preexistente para detectar posibles intrusiones utilizando el algoritmo K-Means con Tensorflow.js 
**Nota**: El conjunto de datos preexistente que utilicé fue UNSW-NB15 DataSet.

Para leer, analizar el conjunto de datos e implementar el algoritmo K-Means, utilicé los siguientes módulos:

**- csv-parser**: Este módulo me sirvió para leer el conjunto de datos que inicialmente estaba en CSV y convertirlos a formato JSON. Posteriormente, tuve que realizar el procesamiento para convertir los datos en formato JSON a arrays de JS; y posteriormente convertirlos a tensores. 

**- @tensorflow/tfjs:** Este módulo me ayudó para convertir los arrays de JavaScript a tensores y realizar operaciones matemáticas que las usé para el procesamiento de los datos.
El algoritmo K-Means, al ser un algoritmo basado en distancias, para evitar sesgos y que el cálculo de los clústers al ejecutar el modelo sea más eficiente, realicé la estandarización.

**- tf-kmeans**: Este módulo me sirvió para aplicar el algoritmo K-Means a los datos ya procesados.

## a) Procesamiento de datos

El archivo .js que se encargará de procesar los datos se encuentra dentro del directorio del backend, en la carpeta "procesamiento":

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I1.JPG)

En primer lugar, estoy leyendo el archivo CSV con el módulo "fs" mediante "createReadStream", que recibirá como parámetro la ruta para ubicar al archivo CSV:

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I2.JPG)

Una vez que haya leído y almacenado los datos CSV, realicé el procesamiento de datos.
De forma resumida, en el procesamiento, lo que hice fue lo siguiente:
- Convertir a arrays de JS la data; y posteriormente a tensores con el módulo "tensorflow/tfjs"
- En el dataset habían 3 columnas categóricas. Por lo que, en el procesamiento, separé dichas columnas (ya se les había aplicado el Label Encoder) para solamente aplicar el StandardScaling a las variables numéricas. Calculé la media y desviación estandar mediante el módulo "tensorflow/tfjs" y realicé el procesamiento.
- Finalmente, junté las variables numéricas ya estandarizadas, con las variables categóricas y exporté ambas funciones: la que se encargará de leer el archivo CSV; y la segunda función que se encargará de realizar el procesamiento de los datos.

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I3.JPG)

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I4.JPG)

## b) Algoritmo K-Means

Ya que la data fue procesada, ahora debo implementar el algoritmo. Para ello, como ya lo mencioné anteriormente, usé el módulo "tf-kmeans".

El algoritmo K-Means lo ubiqué dentro del directorio del backend, en la carpeta "algoritmo":

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I5.JPG)

Ahora, la forma en como implementé el algoritmo fue la siguiente:
- Importé el módulo y creé una función "K_Means", de tal forma que pueda posteriormente exportarla y usarla en la solicitud a la API cuando se realiza una solicitud mediante el método POST. 
- Dicha función la cree para que recibe 3 parámetros: la data procesada, el número de clústers y las iteraciones del algoritmo.
- Posteriormente, mediante KMeans.default estoy obteniendo el modelo K-Means y el modelo se ajustará en base a los hiperparámetros que se le pase mediante la solicitud a la API con el método POST en el body de la solicitud.
- Realizo, luego, el entrenamiento.
- Finalmente, devuelvo las predicciones de los clústers a los que pertenece cada dato, así como las coordenadas de los centroides.
- Exporto la función para usarla en el servidor.

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I6.JPG)

## c) El servidor

Ya que las funciones para leer los datos del archivo CSV, el procesamiento de datos, así como la implementación de K-Means están listas para usar, puesto que ya las exporté, crearé el servidor en express para recibir los datos enviados mediante la solicitud POST.

Para implementar el servidor, usé los siguientes módulos:
- **express:** Para crear los endpoints de la API
- **path:** Para leer el archivo csv que se encuentra en el directorio del backend.
- **cors:** Este middleware es necesario para permitir el acceso a recursos alojados en diferentes dominios. Lo usé para conectar el backend (el servidor de express) con el frontend (en react), y poder así evitar el error de "No 'Access-Control-Allow-Origin' header is present on the requested resource."

-----

- Exporté, en el servidor, las funciones que se encargarán de leer los datos del archivo CSV, el procesamiento de datos y la implementación de K-Means en el servidor. También usé los middlewares necesarios: "cors" y "express.json()" para permitir el intercambio de datos entre el servidor y el cliente. 

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I7.JPG)

- Cree un endpoint para las solicitudes POST:

  ![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I8.JPG)

  En dicho endpoint, realizo lo siguiente:
  - Obtengo los datos pasados en el body de la solitud al realizar el método POST. Dichos datos serán el número de clúster y las iteraciones (como lo mencioné anteriormente).
  - Obtengo la ruta del archivo CSV que se encuentra en el backend y mando a procesar el archivo CSV para posteriormente realizar el procesamiento de los datos mediante la función "ProcesarData".
  - Ya que la data fue procesada, uso la función exportada que se encargará de implementar el algoritmo K-Means a la data ya procesada.
  - Envío, finalmente, la respuesta en formato JSON: las predicciones de a qué clúster pertenece cada punto de dato y las coordenadas de los clústers.
  - Uso app.listen para iniciar el servidor.
 
  ![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I8.JPG)
  
  ![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I9.JPG)

=======

# FRONTEND:
Ahora, ya que implementé el backend, procederé con el frontend.

Para el frontend implementé React, y creé 4 archivos .js. 

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I10.JPG)

* **Alerta.js:** Componente que se encargará de mostrar las alertas.
* **MostrarEstadistica.js:** Componente que se encargará de mostrar las estadísticas.
* **SolicitarDatos.js:**: Componente que se encargará de solicitar los datos al backend.
* **index.js**: Aquí se renderizarán y mostrarán los componentes.

-----
## a) Componente 'SolicitarDatos.js':
En este componente, hago lo siguiente de manera resumida:
- Hooks useEffect y useState: Usé 'useEffect' para realizar la solicitud POST al endpoint de la API cuando se renderiza por primera vez el componente. Usé 'useState' para almacenar la data que obtuve como respuesta del servidor express y para mostrar la data cuando se haya obtenido una respuesta por parte del servidor.
- Importé los componentes 'MostrarEstadistica.js' y 'Alerta.js' y los anidé (componentes anidados), con el objetivo de pasar las respuestas del servidor express para a partir de ello pasarlas como 'props' a dichos componentes y puedan mostrar las estadísticas y alertas correspondientes.
- Utilicé el operador ternario en el JSX del componente 'SolicitarDatos.js' para que solamente se muestren los datos cuando se haya obtenido una respuesta por parte del servidor y finalmente exporto el componente.

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I11.JPG)

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I12.JPG)

![](https://github.com/DianaLlamoca/C8288-PC3-PROYECTO/blob/main/Imagenes/I13.JPG)
