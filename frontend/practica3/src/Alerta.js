//Este componente mostrará mensajes de alerta indicando cuántos puntos fueron asignados a cada clúster
const Alertas=({predic})=>{
    //Para mostrar cuántos puntos fueron asignados a cada clúster, crearé un objeto que almacenará la
    //cantidad de puntos por clúster e iteraré el array
    const contador={};
    predic.map((cluster)=>{
        //Si ya existe esa "key" que indica el cluster, pues solo se añade 1, indicando que un punto más se le fue asignado ese clúster
        if (cluster in contador){
            return contador[cluster]+=1;
        }
        //En caso no exista ese cluster en el objeto contador, se inicializará con 0
        else{
            return contador[cluster]=0;
        }
    })

    //Obtengo los valores por cada cluster en un array
    const cantidad=Object.values(contador);
    

    return(
        <div>
            <h3>Cantidad de puntos asignados al clúster:</h3>
            <ol>
                {cantidad.map((datos)=>{
                    return <li>{datos}</li>
                })}
            </ol>
        </div>
    )
}

export default Alertas;
