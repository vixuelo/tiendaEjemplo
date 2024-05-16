import React, { useEffect, useState } from 'react'
import { getNItemsRandomly } from '../../Item/helpers/helpersItems';
import { ItemContent } from '../../Item/components/ItemContent';
import { useFetchProductos } from '../../hooks/useFetchProductos';
import { traductor } from '../../Traductor/traductor';
import { useGlobalVariable } from '../../Context/MyContextProvider';

export const ListItem = ({items,item}) => {
  const { globalVariable, setGlobalVariable } = useGlobalVariable();
console.log({globalVariable})
  const [productosData, setProductosData] = useState([]);
  console.log(items.length)
  
  const {isLoadingProductos, productos}= useFetchProductos(10-items.length,items,item);
  console.log({productos})
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

          setProductosData(productos.slice(0, 10));
        }else{
          setProductosData(itemsUnidos.concat(productos).slice(0, 10));

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
  
  return (
    <div className='m-5'>
    <h1 style={{
    }}>
      {traductor("Recomended Items",globalVariable)}: 
      {/* {items.length} */}
      </h1>
    <div className='Related-list row row-cols-6 d-flex justify-content-center'
        style={{
            padding:'10px'
          // maxHeight:'810px',
          // maxWidth:'1400px',

        }}>
         {isLoadingProductos ? (
                <p>{traductor("loading")}</p>
            ) : (
                Object.keys(productosData).map((clave) => (
            <ItemContent  item={productosData[clave] } col='col' related='true' key={clave}/>
        ))
        //       productosData.forEach((clave) => (
        //             <ItemContent item={productosData[clave] } col='col' related='true'/>))
        )}
    </div>
    </div>
  )
}
