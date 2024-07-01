import { useEffect, useState } from "react";
import { getAllItems, getNItemsRandomly, getNRefsRandomly } from "../../Item/helpers/helpersItems";

const limpiarCookies = (cookies)=>{
    const resultado = [];


    // Recorrer el array desde el segundo elemento
    for (let i = 0; i < cookies.length; i++) {
        // Si el elemento actual es diferente al anterior, añadirlo al resultado
        if (cookies[i] !== cookies[i - 1]) {
            resultado.push(cookies[i]);
        }
    }

    return resultado.filter(item => item);

}


export const modeloIntegrado = async (num_results, cookies = [], setprediccion,mainpage=false) => {
    
    //console.log({ cookies, mainpage });
    var cookiesLimpias = limpiarCookies(cookies);
    if (cookiesLimpias.length < 6) {
        cookiesLimpias=await getNRefsRandomly(6);
    }
    
    //console.log({ cookiesLimpias })
    if(mainpage===true){
        const model = modelo(15);
        const secuencias_truncadas = sliceTamanoN(cookiesLimpias, 3);
        const clientes = [];

        for (const cliente of secuencias_truncadas) {
            const cliente_productosAnteriores = cliente.slice(0, -1);
            const cliente_productoSig = cliente[cliente.length - 1];

            const clienteObj = {
                anteriores: cliente_productosAnteriores,
                actual: cliente_productoSig
            };

            clientes.push(clienteObj);
        }

        const { X, y } = prepararDatos(clientes);
        const number_epochs = 50;
        try {
            await model.fit(X, y, {
                epochs: number_epochs,
                callbacks: {
                    onEpochEnd: async (epoch, log) => {
                        console.log("epoch",epoch,log)
                        if (epoch === number_epochs - 1) {
                            const result = model.predict(tf.tensor1d(cookiesLimpias.slice(cookiesLimpias.length - 10, cookiesLimpias.length))).arraySync();
                            //const predicciones = sliceTamanoN(result[0], getAllItems().length);
                            const predicciones = result[0];
                            //console.log({predicciones})
                            const prediccionesFinalesArr = top10ArgMax(predicciones);
                            /* predicciones.map((prediccion) =>
                                //getAllItems()[argMax(prediccion)]
                            ); */
                            //console.log({ prediccionesFinalesArr });
                            
                                setprediccion(limpiarCookies(prediccionesFinalesArr).slice(-num_results,-1));
                             
                             //console.log("predicciones",limpiarCookies(prediccionesFinalesArr),num_results)
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error ajustando el modelo:', error);
        }
        const saveResult = await model.save('localstorage://modelo');
        //console.log(saveResult)
    
    }else{ 
        // Paso 1: Obtén el JSON del modelo almacenado en localStorage
 
 const model = await tf.loadLayersModel('localstorage://modelo').then(modeloTensorFlow => {
   // El modelo se ha cargado correctamente
   console.log('Modelo cargado:', modeloTensorFlow);
   const result = modeloTensorFlow.predict(tf.tensor1d(cookiesLimpias.slice(cookiesLimpias.length - 10, cookiesLimpias.length))).arraySync();
   const predicciones = sliceTamanoN(result[0], getAllItems().length);
   //console.log({predicciones})
   const prediccionesFinalesArr = predicciones.map((prediccion) =>
       getAllItems()[argMax(prediccion)]
   );
   //console.log({ prediccionesFinalesArr });
 
    setprediccion(limpiarCookies(prediccionesFinalesArr));
 
 //console.log("predicciones no main",limpiarCookies(prediccionesFinalesArr),num_results)
   // Ahora puedes usar el modelo TensorFlow aquí
 }).catch(error => {
   // Ocurrió un error al cargar el modelo
   console.error('Error al cargar el modelo:', error);
 });
     }
  
};

export const sliceTamanoN=(array, tamanoTrozo)=> {
  if (typeof array !== "undefined"){
    const resultados = [];
  for (var i = 0; i < array.length; i += tamanoTrozo) {
      const arrayResultante=array.slice(i, i + tamanoTrozo);
      if(arrayResultante.length<tamanoTrozo)
         { null}else{
          resultados.push(arrayResultante)
         }
  }
  return resultados;
  }else{
    return [];
  }
 }
function argMax(array) {
  // console.log({array})
  const numericArray = array.filter(function(value) {
      return typeof value === 'number' && !isNaN(value);
  });
  // Verificar si el array está vacío
  if (numericArray.length === 0) {
      return -1;
  }

  return array.indexOf(Math.max(...numericArray));
}
function top10ArgMax(array) {
    // Filtrar el array para mantener solo los valores numéricos válidos
    const numericArray = array.map((value, index) => {
        return { value: value, index: index };
    }).filter(item => typeof item.value === 'number' && !isNaN(item.value));

    // Verificar si el array está vacío
    if (numericArray.length === 0) {
        return -1;
    }

    // Ordenar el array numérico en orden descendente basado en los valores
    numericArray.sort((a, b) => b.value - a.value);

    // Seleccionar los primeros 10 elementos
    const top10 = numericArray.slice(0, 10);

    // Devolver los índices de los 10 valores más altos
    return top10.map(item => item.index);
}

const prepararDatos = (clientes) => {
const  anteriores = [];
const  siguientes = [];


for (var i = 0; i < clientes.length; i++) {
  var cliente_productosAnteriores = clientes[i].anteriores;
  var cliente_productoSig = clientes[i].actual;

  
  anteriores.push(cliente_productosAnteriores);
  siguientes.push(cliente_productoSig);
}
const X=tf.tensor2d(anteriores)
const y=tf.tensor1d(siguientes)
// Retornar un objeto con los arreglos de IDs y nombres
return { X, y };
}
const modelo=(num_products)=>{
  const model = tf.sequential();

  model.add(tf.layers.embedding({
      inputDim: getAllItems().length,
      outputDim: 64,
      name: "embedding_layer"
  }));
  
  model.add(tf.layers.globalAveragePooling1d({
      name: "global_avg_pooling"
  }));
  
  model.add(tf.layers.dense({
      units: 128,
      activation: 'relu',
      name: "dense_layer_1"
  }));
  
  model.add(tf.layers.dense({
      //units: num_products * getAllItems().length,
      units:getAllItems().length,
      activation: 'softmax',
      name: "dense_layer_2"
  }));
  
  
  
model.compile({optimizer:'adam',
               loss:'sparseCategoricalCrossentropy', 
               metrics:['accuracy']})
return model;
}