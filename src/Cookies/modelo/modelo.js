var modelo = null;var modelo2 = null;

//Cargar modelo
(async () => {
    console.log("Cargando modelo...");
    modelo = await tf.loadGraphModel("src/assets/modeloIA/Modelo5/model.json");
    modelo2 = await tf.loadGraphModel("src/assets/modeloIA/Modelo10/model.json");
    console.log("Modelo cargado...");
})();
function sliceN(array, numeroDePartes) {
  const longitud = array.length;
  const longitudParte = Math.ceil(longitud / numeroDePartes);
  const partes = [];
  
  for (let i = 0; i < longitud; i += longitudParte) {
    const parte = array.slice(i, i + longitudParte);
    partes.push(parte);
  }
  
  return partes;
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
const pred2index=(prediccion)=>{
    const indexPredicciones=[]
    
    prediccion.map((pred)=>{
        indexPredicciones.push(argMax(pred))
    })
    
    return indexPredicciones;
}
function predecirSiguiente5(anterior) {
  if (modelo != null) {
    if(anterior.length<11){
      return null
    }
    var tensor = tf.tensor([anterior]);

    const prediccion = modelo.predict(tensor).dataSync();
    console.log({prediccion})
    const arrayPredicciones = sliceN(prediccion,5);
    indexArray= pred2index(arrayPredicciones)
    // console.log({indexArray});
    return indexArray;

  } else {
    console.log("Intenta de nuevo en un momento...");
  }
}
function predecirSiguiente10(anterior) {
  if (modelo != null) {
    if(anterior.length<3){
      return null
    }
    var tensor = tf.tensor([anterior]);

    const prediccion = modelo2.predict(tensor).dataSync();
    const arrayPredicciones = sliceN(prediccion,10);
    indexArray= pred2index(arrayPredicciones)
    // console.log({indexArray});
    return indexArray;

  } else {
    console.log("Intenta de nuevo en un momento...");
  }
}