export const sliceN=(array, numeroDePartes)=> {
    const longitud = array.length;
    const longitudParte = Math.ceil(longitud / numeroDePartes);
    const partes = [];
    
    for (let i = 0; i < longitud; i += longitudParte) {
      const parte = array.slice(i, i + longitudParte);
      partes.push(parte);
    }
    
    return partes;
    }