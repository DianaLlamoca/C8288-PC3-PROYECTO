//Importo el algoritmo K-Means para realizar pruebas y ver si me devuelve, o no, valores
const {K_Means}=require("../algoritmo/kmeans");

//Importo el módulo tensorflow, ya que crearé tensores
const T_F=require("@tensorflow/tfjs");

//Solo estoy colocando datos aleatorios, pues lo que quiero realizar son pruebas unitarias en el algoritmo de detección 
const tensor_prueba1=T_F.tensor([[2,4,3,5],
    [4,1,3,2],
    [2,5,7,2],
    [4,2,1,0]
]);

const tensor_prueba2=T_F.tensor([[1,5,7,2],
    [6,2,5,3],
    [1,7,9,2],
    [7,3,1,6],
    [5,8,2,1],
    [8,4,7,3]  
])

//Creo un conjunto de pruebas
describe("Probando el modelo K-Means",()=>{
    //Ya que tengo los tensores de prueba y el algoritmo, probaré el modelo de detección
    it("Prueba 1 - Algoritmo K-Means",()=>{
        const [pred,coord_cent]=K_Means(tensor_prueba1,3,10) //3 clusters, 10 iteraciones
    
        //Ahora, como quiero asegurarme de que el modelo devuelva datos, entonces usaré .toBeGreaterThan
        expect(pred.length).toBeGreaterThan(0);
        expect(coord_cent.length).toBeGreaterThan(0);

        //Además, quiero saber si la cantidad de clusters es igual es a la cantidad que especifiqué por parámetro
        expect(coord_cent.length).toBe(3);
    });

    it("Prueba 2 - Algoritmo K-Means",()=>{
        const [pred,coord_cent]=K_Means(tensor_prueba2,5,10) //5 clusters, 15 iteraciones
    
        //Quiero asegurarme de que el modelo devuelva datos, entonces usaré .toBeGreaterThan
        expect(pred.length).toBeGreaterThan(0);
        expect(coord_cent.length).toBeGreaterThan(0);

        //Además, quiero saber si la cantidad de clusters es igual es a la cantidad que especifiqué por parámetro
        expect(coord_cent.length).toBe(5);
    })
})

