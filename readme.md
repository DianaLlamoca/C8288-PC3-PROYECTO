# PROYECTO 2: SISTEMA DE DETECCIÓN DE INTRUSOS EN TIEMPO REAL CON APRENDIZAJE AUTOMÁTICO
## DESCRIPCIÓN:
Crea una aplicación que analice un conjunto de datos de tráfico de red preexistente para detectar posibles intrusiones utilizando un algoritmo básico de clustering como K-Means con Tensorflow.js.
Utiliza Node.js para procesar los datos y React para visualizar alertas y estadísticas simples.
Implementa una API REST básica para manejar los datos. Realiza pruebas unitarias enfocadas en el algoritmo de detección con Jest. Conteneriza el proyecto con un contenedor para el backend y otro para el frontend.

=========

# 1) Analizando el conjunto de datos de tráfico de red preexistente para detectar posibles intrusiones utilizando el algoritmo K-Means con Tensorflow.js 
**Nota**: El conjunto de datos preexistente que utilicé fue UNSW-NB15 DataSet.

Para analizar el conjunto de datos e implementar el algoritmo K-Means, utilicé los siguientes módulos:

**- @tensorflow/tfjs:** Este módulo me ayudó para realizar operaciones matemáticas que las usé para el procesamiento de los datos, como la estandarización.
El algoritmo K-Means, al ser un modelo basado en distancias, para evitar sesgos y que el cálculo de los clústers al ejecutar el modelo sea más eficiente, realicé la estandarización.

**- tf-kmeans**: Este módulo me sirvió para aplicar el algoritmo K-Means a los datos ya procesados.
