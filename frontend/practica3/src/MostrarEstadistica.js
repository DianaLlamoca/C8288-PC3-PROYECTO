//Este componente mostrará los clústeres a los que los datos fueron asignados
const Estadistica=({predic})=>{
    return(
        <div>
            <h3>Cluster al que pertenece cada dato</h3>
            <ul>
                {predic.map((datos)=>{
                    return <li>{datos}</li>
                })}
            </ul>
        </div>
    )
}

//Exporto el componente que solo mostrará los clústeres
export default Estadistica;
