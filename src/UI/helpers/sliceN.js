export const sliceN=(array, tamanoTrozo)=> {
  if (typeof array !== "undefined"){
    const resultados = [];
  for (var i = 0; i < array.length; i += tamanoTrozo) {
      resultados.push(array.slice(i, i + tamanoTrozo));
  }
  return resultados;
  }else{
    return [];
  }
 }