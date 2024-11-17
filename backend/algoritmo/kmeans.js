//Importo el módulo para usar el algoritmo K-Means
const KMeans=require("tf-kmeans");

//Creo la función para entrenar el modelo y realizar las agrupaciones
function K_Means(datos,clusters,iteraciones){
    //Obtengo el modelo k_means. Al usar default, estoy obteniendo
    //la función principal del módulo "tf-kmeans".
    //Y la utilizo para crear un nuevo modelo de k-means
    const kmeans=new KMeans.default({
        k:clusters,
        maxIter:iteraciones,
        distanceFunction:KMeans.default.EuclideanDistance
    });

    //Ahora, realizo el entrenamiento con la data
    const predicciones=kmeans.Train(datos);

    //Devuelvo las predicciones y las coordenadas de los centroides
    return [predicciones.arraySync(),kmeans.Centroids().arraySync()];
}

//Exporto la función
module.exports={K_Means};

//Estoy usando arraySync() para convertir el tensor en un arreglo de JavaScript.
//De tal forma que los pueda manipular para mostrarlos en las estadísticas del FrontEnd.
