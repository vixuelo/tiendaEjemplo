import {items} from '../../assets/productos'
export const  verificarURL=(url) =>{
  fetch(url)
    .then(response => {
      if (!response.ok) {
        return(false)
      } else {
        console.log("La URL está funcionando correctamente.");
        return(true)
      }
    })
    .catch(error => {
      console.error(`error con ${url}: `,error)
      return(false)
    });
}
export const getNItemsRandomly = async (number, itemsActuales = [],item) => {
  console.log("hola1")
  if (number === 0) {
    return [];
  }

  const itemsReturn = [];
  
  console.log({ number });
  // Obtén los índices disponibles excluyendo los elementos actuales
  const indicesDisponibles = itemsActuales.length > 0
  ? Array.from({ length: items.length }, (_, i) => i).filter(index => !itemsActuales.includes(items[index]) && items[index] !== item)
  : Array.from({ length: items.length }, (_, i) => i).filter(index=>items[index] !== item);
  
  for (let index = 0; index < number; index++) {
    const index = Math.floor(Math.random() * indicesDisponibles.length);
    const randomIndex = indicesDisponibles[index];
    const item = items[randomIndex];
    itemsReturn.push(item);
    indicesDisponibles.pop(index); // Elimina el índice utilizado
    console.log({indicesDisponibles})
  }
  return itemsReturn;
}
export const getItemById=(id)=>{
  return items.find(item=>item.referencia==id);
}
export const parseoPredicion=(prediccion)=>{
  if(prediccion===null){
    return [];
  }
  const indexPredicciones=[]
  console.log({prediccion});
  prediccion.map((pred)=>{
      indexPredicciones.push(getItemById(pred))
  })
  return indexPredicciones;
}


export const filterUniques=(array)=>{return array.filter((value, index, arr) => 
  value !== undefined && arr.indexOf(value) === index
);
}