//Importo el hook useEffect y useState
import {useEffect, useState} from "react";

//Importo el componente al que le pasaré como props los clústeres que fueron predichos por el modelo K-Means
import Estadistica from "./MostrarEstadistica";

//Importo el componente que mostrará las alertas indicando cuántos puntos fueron asignados a qué clúster
import Alertas from "./Alerta";

const Aplicacion=()=>{
    //Al iniciar la aplicación, realizaré la petición post al servidor

    //Almaceno la respuesta
    const [respuesta,setRespuesta]=useState([]);

    //Estableceré un valor booleano para indicar que los datos ya se cargaron. Al inicio será "true"
    const [cargando,setCargando]=useState(true);

    //Uso useEffect para que al iniciar la app, se realice la petición
    useEffect(()=>{
        //Como estoy realizando una solicitud post, uso una función async
        const soliDatos=async()=>{
            console.log("Realizando la soli")
            //Realizo una solicitud POST al servidor
            const datos=await fetch("http://localhost:3001/procesar",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    centroides: 5,
                    iteraciones:2
                })
            })

            //Obtengo la data usando .json, ya que el servidor devuelve una respuesta en este formato 
            const resp=await datos.json();


            //Almaceno la respuesta
            setRespuesta(resp)

            //Cambio el valor de la variable booleana, pues ya se terminó el procesamiento y predicción del modelo K-Means
            setCargando(false);

            };

        //Llamo a la función soliDatos para realizar la solicitud ni bien se renderice por primera vez el componente
        soliDatos();

    },[]);

        
    return(
        <div>
            <h1>Aplicación</h1>
            {cargando ? <h2>Cargando estadísticas...</h2> : (
                <div>
                    
                    <Alertas predic={respuesta.pred}/>
                    <Estadistica predic={respuesta.pred}/>
                </div>
            )}
        </div>
    )
}

export default Aplicacion;
