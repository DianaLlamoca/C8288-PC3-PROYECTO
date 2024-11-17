//Aquí es donde utilizo las funciones que procesarán el csv, y procesará la data
const express=require("express");
//const bodyParser=require("body-parser");
const tf=require("@tensorflow/tfjs");
const path=require("path");

//Usaré el middleware cors para permitir el acceso
const cors=require("cors");


//Importo las funciones para el procesamiento
const {ProcesarCSV,ProcesarData}=require("./procesamiento/data_process");

//Importo la función del modelo K-Means, para realizar la predicción y mostrar las coordenadas de los centroides
const {K_Means} =require("./algoritmo/kmeans");

//Creo el servidor
const app=express();
const puerto=3001; //Ya que la aplicación del frontend estará usando el puerto 3000


//Uso el middleware cors para permitir el acceso
app.use(cors());

//Uso el middleware para leer los datos de tipo JSON (número de clústeres e iteraciones) enviados mediante la solicitud POST
app.use(express.json());


//Api para procesar los datos y realizar la predicción
app.post("/procesar",async (req,res)=>{
    //Obtengo los datos de la solicitud. Para ello, usaré req.body (es un objeto, por lo que usaré desestructuración)
    const {centroides,iteraciones}=req.body;

    //Proceso el archivo csv
    const Datos=await ProcesarCSV(path.join(__dirname,"train_set.csv"));
    
    //Proceso la data
    const DatosProcesados=ProcesarData(Datos);

    //Ahora que tengo la data en tensores numéricos, realizo la predicción. Para ello, uso la función del modelo exportada
    const [pred,cent]=K_Means(DatosProcesados,centroides,iteraciones); //const [pred,cent]=K_Means(DatosProcesados,5,2);

    console.log(pred);
    console.log(cent);


    //Creo un objeto que contenga los arrays, pues lo que quiero mostrar son arrays como estadísticas y en base a ello hacer operaciones
    //sobre las respuestas para contar cuántos clusters de cada tipo hay, etc.
    const respuesta={
        pred,
        cent
    };

    //Convierto este objeto a una cadena json para enviarlo como respuesta
    const respuesta_json=JSON.stringify(respuesta);

    //Envío la respuesta indicando que será un json
    res.setHeader("Content-Type","application/json");
    res.send(respuesta_json);
})

//Establezco el servidor en escucha
app.listen(puerto,()=>{
    console.log(`Puerto ${puerto} en escucha`);
})
