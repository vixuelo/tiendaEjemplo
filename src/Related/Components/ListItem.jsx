import React, { useEffect, useState } from 'react'
import { getNItemsRandomly } from '../../Item/helpers/helpersItems';
import { ItemContent } from '../../Item/components/ItemContent';
import { useFetchProductos } from '../../hooks/useFetchProductos';

export const ListItem = ({items,item}) => {
  const [productosData, setProductosData] = useState([]);
  
  const {isLoadingProductos, productos}= useFetchProductos(0,items,item);
  const [itemsUnidos, setitemsUnidos] = useState([])  
  useEffect(() => {
    console.log("Debug de items en ListItem")
    console.log({items})
    console.log(typeof items)
    console.log("Fin de items en ListItem")
    if(typeof items !== 'undefined' && items.length>0)
    {
      setitemsUnidos([...items,...productos]);
    }else{
      setitemsUnidos(productos)
      console.log("aquii")
    }
  }, [items])
  
  useEffect(() => {
    if (!isLoadingProductos) {
        if (itemsUnidos.length > 10) {
          setProductosData(itemsUnidos.slice(0, 10));
        } else if(itemsUnidos.length===0){

          setProductosData(productos);
        }else{
          setProductosData(itemsUnidos);

        }
        }

    
  }, [isLoadingProductos, productos,items,itemsUnidos]);
  useEffect(() => {
    console.log("Debug de itemsUnidos en ListItem")
    console.log({itemsUnidos})
    console.log("Fin de itemsUnidos en ListItem")

  }, [itemsUnidos]) 
  useEffect(() => {
    console.log("Debug de productosData en ListItem")
    console.log({productosData})
    console.log("Fin de productosData en ListItem")

  }, [itemsUnidos])
  useEffect(() => {
    console.log("Debug de productosData en ListItem")
    console.log({productosData})
    console.log("Fin de productosData en ListItem")

  }, [itemsUnidos])
  
  return (
    <div className='m-5'>
    <h1 style={{
    }}>
      Recomended Items: 
      {/* {items.length} */}
      </h1>
    <div className='row row-cols-6 d-flex justify-content-center'
        style={{
            padding:'10px'
          // maxHeight:'810px',
          // maxWidth:'1400px',

        }}>
         {isLoadingProductos ? (
                <p>Cargando productos...</p>
            ) : (
                Object.keys(productosData).map((clave) => (
            <ItemContent key={clave} item={productosData[clave] } col='col' related='true'/>
        ))
        //       productosData.forEach((clave) => (
        //             <ItemContent item={productosData[clave] } col='col' related='true'/>))
        )}
    </div>
    </div>
  )
}
