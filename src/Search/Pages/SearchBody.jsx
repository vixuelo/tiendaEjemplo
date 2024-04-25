import React, { useEffect, useState } from 'react'
import { ItemContent } from '../../Item/components/ItemContent';
import { useFetchProductos } from '../../hooks/useFetchProductos';
import { sliceN } from '../../UI/helpers/sliceN';
import { getAllItems, getAllItemsBySearch } from '../../Item/helpers/helpersItems';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

export const MainBody = () => {
  const key = localStorage.getItem("actualKeyID");
  const {isLoadingProductos, productos}= useFetchProductos(getAllItems().length);
  // const [productosDivididos, setproductosDivididos] = useState([]);
  const productosDivididos= sliceN(productos,9)
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
  }, [productosDivididos,productosDivididos[pag]])
  
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
export const SearchBody = ({ search }) => {
  const location = useLocation();
  const [query, setQuery] = useState(queryString.parse(location.search).q || '');
  const [searchContent, setSearchContent] = useState([]);
  const [productosDivididos, setProductosDivididos] = useState([]);
  const [pag, setPag] = useState(0);

  useEffect(() => {
    // Actualizar la búsqueda cuando cambie la ubicación
    setQuery(queryString.parse(location.search).q || '');
  }, [location]);

  useEffect(() => {
    // Actualizar la búsqueda cuando cambie la prop 'search'
    if (search !== query) {
      setQuery(queryString.parse(location.search).q);
    }
  }, [search]);

  useEffect(() => {
    // Actualizar el contenido de búsqueda cuando cambie 'query'
    setSearchContent(getAllItemsBySearch(queryString.parse(location.search).q));
  }, [query]);

  useEffect(() => {
    // Actualizar productosDivididos cuando cambie 'searchContent'
    setProductosDivididos(sliceN(searchContent, 9));
  }, [searchContent]);

  useEffect(() => {
    console.log("Debug productosDivididos:");
    console.log({ productosDivididos });
    console.log("Fin productosDivididos:");
  }, [productosDivididos]);

  useEffect(() => {
    console.log(productosDivididos[pag]);
    console.log(pag);
  }, [pag]);

  const cambioPagina = (clave) => {
    setPag(clave - 1);
  };

  return (
    <>
      {productosDivididos.length > 0 ? (
        <>
          <div className='d-block-flex'>
            <div
              className="vw-100 row row-cols-4 d-flex justify-content-center"
              style={{
                paddingTop: '200px',
              }}
            >
              {productosDivididos[pag].map((_, index) => (
                <ItemContent key={index} item={productosDivididos[pag][index]} col='col-4' />
              ))}
            </div>
            <div className='d-flex flex-row-reverse'>
              {productosDivididos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => cambioPagina(productosDivididos.length - index)}
                  className={(productosDivididos.length - index) === pag + 1 ? 'btn btn-primary' : 'btn btn-secondary'}
                >
                  {productosDivididos.length - index}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-danger">
          No results for <b>{query}</b>
        </div>
      )}
    </>
  );
};
