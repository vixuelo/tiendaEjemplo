import { useEffect, useState } from "react";
import { getAllItems } from "../../Item/helpers/helpersItems";

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


export const modeloIntegrado = async (num_products, cookies = [], setprediccion) => {
    console.log({ cookies });
    const cookiesLimpias = limpiarCookies(cookies);
    console.log({ cookiesLimpias })
    if (cookiesLimpias.length > 6) {
        const model = modelo(num_products);
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
        const number_epochs = 200;
        try {
            await model.fit(X, y, {
                epochs: number_epochs,
                callbacks: {
                    onEpochEnd: async (epoch, log) => {
                        console.log("epoch",epoch,log)
                        if (epoch === number_epochs - 1) {
                            const result = model.predict(tf.tensor1d(cookiesLimpias.slice(cookiesLimpias.length - 10, cookiesLimpias.length))).arraySync();
                            const predicciones = sliceTamanoN(result[0], getAllItems().length);
                            console.log({predicciones})
                            const prediccionesFinalesArr = predicciones.map((prediccion) =>
                                getAllItems()[argMax(prediccion)]
                            );
                            console.log({ prediccionesFinalesArr });
                             setprediccion(limpiarCookies(prediccionesFinalesArr));
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error ajustando el modelo:', error);
        }

    } else {
        console.log("Pocas cookies", cookiesLimpias);
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
      units: num_products * getAllItems().length,
      activation: 'softmax',
      name: "dense_layer_2"
  }));
  
  
  
model.compile({optimizer:'adam',
               loss:'sparseCategoricalCrossentropy', 
               metrics:['accuracy']})
return model;
}