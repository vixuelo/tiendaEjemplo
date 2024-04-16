import React, { useEffect, useState } from 'react'
import { ItemContent } from '../../Item/components/ItemContent';
import { useFetchProductos } from '../../hooks/useFetchProductos';
import { sliceN } from '../../UI/helpers/sliceN';

export const SearchBody = ({random}) => {
  const key = localStorage.getItem("actualKeyID");
  const {isLoadingProductos, productos}= useFetchProductos(36);
  // const [productosDivididos, setproductosDivididos] = useState([]);
  const productosDivididos= sliceN(productos,4)
  const [pag, setpag] = useState(0)
  
  const cambioPagina=(clave)=>{
    setpag(clave-1);

  }
  useEffect(() => {
    console.log("Debug productos:")
    console.log({productos});
    console.log("Fin productos:")
  }, [productos])
  useEffect(() => {
    console.log("Debug isLoadingProductos:")
    console.log({isLoadingProductos})
    console.log("Fin isLoadingProductos:")
  }, [isLoadingProductos])
  useEffect(() => {
    console.log("Debug productosDivididos:")
    console.log({productosDivididos});
    console.log("Fin productosDivididos:")
  }, [productosDivididos])
  
  useEffect(() => {
    console.log(productosDivididos[pag])
    console.log(pag)
  }, [pag])
  
  return (
   <>
   
   {productos.length===0 ? (
                <p>Cargando productos...</p>
            ) : (
              <div className='d-block-flex'>
              <div className="vw-100 row row-cols-4 d-flex justify-content-center"
                    style={{
                      paddingTop:'200px',
                    }}>
                  {productosDivididos[pag].map((_, index)=>(

                        <ItemContent key={index} item={productosDivididos[pag][index] } col='col-4'/>
                
                  ))}
              
              </div>
              <div className='d-flex flex-row-reverse'>
             
              {productosDivididos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => cambioPagina(productosDivididos.length-index)}
                      className={(productosDivididos.length-index)===pag+1 ? 'btn btn-primary' : 'btn btn-secondary'}
                    >
                      {productosDivididos.length-index}
                    </button>
                  //    {Object.keys(productosDivididos).map((clave)=>(
                  //     <button key={clave} onClick={()=>cambioPagina(productosDivididos.length-clave)} 
                  //     className={(productosDivididos.length-clave)===pag+1?' btn btn-primary':'btn btn-secondary'}>
                  //       {productosDivididos.length-clave}</button>
                  // )
                  // )}
                  ))}
              </div>
              </div>
            )}
   
   </>)
}
