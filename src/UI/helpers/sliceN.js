export const sliceN = (array, tamanoTrozo) => {
  // Verificar si array no es nulo ni undefined
  if (array && typeof array !== "undefined") {
    const resultados = [];
    for (var i = 0; i < array.length; i += parseInt(tamanoTrozo)) {

      //console.log("trozo: ",i)
      if (tamanoTrozo === 1) {
        resultados.push([array[i]]);
      } else {
        resultados.push(array.slice(i, i + parseInt(tamanoTrozo)));
      }
    }
    //console.log({resultados,tamanoTrozo})
    return resultados;
  } else {
    return [];
  }
}
