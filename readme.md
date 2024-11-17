# PROYECTO 2: SISTEMA DE DETECCIÓN DE INTRUSOS EN TIEMPO REAL CON APRENDIZAJE AUTOMÁTICO
## DESCRIPCIÓN:
Crea una aplicación que analice un conjunto de datos de tráfico de red preexistente para detectar posibles intrusiones utilizando un algoritmo básico de clustering como K-Means con Tensorflow.js.
Utiliza Node.js para procesar los datos y React para visualizar alertas y estadísticas simples.
Implementa una API REST básica para manejar los datos. Realiza pruebas unitarias enfocadas en el algoritmo de detección con Jest. Conteneriza el proyecto con un contenedor para el backend y otro para el frontend.

=========

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
