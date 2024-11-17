const fs=require("fs");
const csv=require("csv-parser");
const tf=require("@tensorflow/tfjs");


//Leo el archivo CSV
const ProcesarCSV=(filePath)=>{
    const data=[];

    return new Promise((resolve,reject)=>{
        fs.createReadStream(filePath)
        .pipe(csv())
        .on("data",(row)=>{
            data.push(row);
        })
        .on("end",()=>{
            resolve(data);
        })
        .on("error",(error)=>{
            reject(error);
        });
    });
};

const ProcesarData= (data)=>{
    try{
       //Convierto en un array de arrays para convertirlo a tensor, puesto que estos inicialmente se guardan en forma de objetos
       const datos_arrays=data.map((elem)=>{
        return Object.values(elem);
       })

       //Estos datos, al almacenarse, son de tipo string. Así que lo convierto a numérico
       let datos_num_arrays=datos_arrays.map(array=> {
        return array.map(valor => parseFloat(valor));
        });


       //Ahora, ya que son arrays numéricos, puedo convertirlo a un tensor
       const datos_tensor=tf.tensor(datos_num_arrays);


        //Ahora, si bien los datos son numéricos, hay valores que representan categorías, puse usé LabelEncoder.
        //Entonces, separo los datos numéricos de categóricos. Los datos categóricos se encuentran en las columnas [1,2,3]
        //Así que selecciono las columnas a escalar. Así que uso gather
        const ind_col_escalar=[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41];
        const ColumnasAEscalar = datos_tensor.gather(ind_col_escalar, 1); //Selecciono las columnas que son distintas de 1,2,3 en el eje "1"


        //Ahora, obtengo la media y varianza. A LO LARGO DEL EJE '0' (FILAS), pues quiero estandarizar los datos
        const {mean,variance}=tf.moments(ColumnasAEscalar,axes=[0]);

        //Ya que tengo la media y varianza, realizo el escalado (broadcastin) entra en juego acá
        const TensorEscalado=ColumnasAEscalar.sub(mean).div(variance.sqrt());
        
        //Ahora, debo reconstruir el tensor. Para ello, uso tf.concat
        //La columna no escalada está dada por datos_tensor.gather([1,2,3],1) (columnas 1,2,3; por eso el seg. parámetro es '1')
        const recTensor=tf.concat([TensorEscalado,datos_tensor.gather([1,2,3],1)],1) //El segundo parámetro es para indicar que concatenaré en el eje "1" --> Columnas
        //recTensor.print();
        return recTensor;
       
    }catch(error){
        console.log("Errorsito");
    }
}


//Exporto las funciones que se encargarán de procesar el csv, y la otra función que procesará la data
module.exports={ProcesarCSV,ProcesarData};

