import {items} from '../../assets/productos'
import {empresas} from '../../assets/empresas'
export const verificarURL = async (url) => {
  if (url === '') {
    return false;
  }

  try {
    const response = await fetch(url);
    if (!response.ok || response.headers.get('status') === '404' || response.headers.get('Content-Type').startsWith('text/plain')) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export const getNRefsRandomly = async (number, itemsActuales = [],item) => {
  console.log("hola1")
  if (number === 0) {
    return [];
  }

  const itemsReturn = [];
  
  // Obtén los índices disponibles excluyendo los elementos actuales
  const indicesDisponibles = itemsActuales.length > 0
  ? Array.from({ length: items.length }, (_, i) => i).filter(index => !itemsActuales.includes(items[index]) && items[index] !== item)
  : Array.from({ length: items.length }, (_, i) => i).filter(index=>items[index] !== item);
  
  for (let index = 0; index < number; index++) {
    const index = Math.floor(Math.random() * indicesDisponibles.length);
    const randomIndex = indicesDisponibles[index];
    const item = items[randomIndex];
    itemsReturn.push(item.referencia);
    indicesDisponibles.pop(index); // Elimina el índice utilizado
  }
  return itemsReturn;
}


export const getNItemsRandomly = async (number, itemsActuales = [],item) => {
  console.log("hola1")
  if (number === 0) {
    return [];
  }

  const itemsReturn = [];
  
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
  prediccion.map((pred)=>{
      indexPredicciones.push(getItemById(pred))
  })
  return indexPredicciones;
}


export const filterUniques=(array)=>{return array.filter((value, index, arr) => 
  value !== undefined && arr.indexOf(value) === index
);
}

export const getAllItemsBySearch = (search) => {
  console.log("entrada a search:", search)
  return items.filter(item => {
    // Itera sobre cada campo del item
    for (let key in item) {
      // Verifica si el valor del campo es una cadena y si contiene la búsqueda
      if (typeof item[key] === 'string' && item[key].toLowerCase().includes(search.toLowerCase())) {
        return true; // Retorna true si se encuentra la cadena de búsqueda en algún campo
      }
    }
    return false; // Retorna false si la búsqueda no se encuentra en ningún campo
  });
}
export const getAllItems=()=>{

  return items;
}

export const getAllBusiness=()=>{

  return empresas;
}