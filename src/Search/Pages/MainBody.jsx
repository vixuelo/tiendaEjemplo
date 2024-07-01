import React, { useEffect, useState } from 'react'
import { ItemContent } from '../../Item/components/ItemContent';
import { useFetchProductos } from '../../hooks/useFetchProductos';
import { sliceN } from '../../UI/helpers/sliceN';
import { getAllItems, getAllItemsBySearch } from '../../Item/helpers/helpersItems';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { addItemOnCookies } from '../../Cookies/helpers/clients';
import { SellerInfo } from '../../Item/components/SellerInfo';
import { getVendedorbyName } from '../../Item/helpers/getVendedorbyName';
import { useFetchImgs } from '../../hooks/useFetchImgs';
import { useGlobalVariable } from '../../Context/MyContextProvider.jsx';
import { LikeContent } from '../../UI/Components/LikeContent.jsx';
import { use } from 'i18next';
import { traductor } from '../../Traductor/traductor.js';
import { DropDownItemsNumber } from '../../UI/Components/DropDown.jsx';

export const MainBody = () => {

  const [number, setnumber] = useState(9)
  const { isLoadingProductos, productos } = useFetchProductos(getAllItems().length);
  // const [productosDivididos, setproductosDivididos] = useState([]);
  const productosDivididos = sliceN(productos, number)
  const [pag, setpag] = useState(0)
  const [Counter, setCounter] = useState(0)
  const rePag = () => {
    //console.log("repag")
    const nuevaPagina = (pag - 1);
    //console.log(nuevaPagina);
    //console.log(productosDivididos.length);
    setpag(nuevaPagina < 0 ? nuevaPagina + productosDivididos.length : nuevaPagina)
    //console.log({pag})

  }
  const avPag = () => {
    //console.log("avpag")
    const nuevaPagina = (pag + 1);
    //console.log(nuevaPagina);
    //console.log(productosDivididos.length);
    //console.log(nuevaPagina%productosDivididos.length<0?nuevaPagina%productosDivididos.length+productosDivididos.length+1:nuevaPagina%productosDivididos.length);
    setpag(nuevaPagina > productosDivididos.length - 1 ? 0 : nuevaPagina)
    //console.log({pag})
  }




  useEffect(() => {
    const keyDownCallback = function (e) {
      var nuevaPagina
      switch (e.keyCode) {
        case 39:
          nuevaPagina = pag + 1;
          //console.log(nuevaPagina);
          //console.log(productosDivididos.length);
          //console.log(nuevaPagina > productosDivididos.length ? nuevaPagina - productosDivididos.length : nuevaPagina);

          setpag(nuevaPagina > productosDivididos.length - 1 ? 0 : nuevaPagina);
          //console.log({ pag });
          break;
        case 37:
          nuevaPagina = pag - 1;
          //console.log({ nuevaPagina });
          //console.log(productosDivididos.length);
          setpag(nuevaPagina < 0 ? productosDivididos.length - 1 : nuevaPagina);

          //console.log({ pag });
          break;
      }
    };

    document.addEventListener("keydown", keyDownCallback);

    return () => document.removeEventListener("keydown", keyDownCallback);
  }, [productosDivididos]);

  const cambioPagina = (clave) => {
    setpag(clave - 1);
    //console.log({pag})

  }
  useEffect(() => {
    //console.log("Debug productos:")
    //console.log({productos});
    //console.log("Fin productos:")
  }, [productos])
  useEffect(() => {
    //console.log("Debug isLoadingProductos:")
    //console.log({isLoadingProductos})
    //console.log("Fin isLoadingProductos:")
  }, [isLoadingProductos])
  useEffect(() => {
    //console.log("Debug productosDivididos:")
    //console.log({productosDivididos});
    //console.log("Fin productosDivididos:")
  }, [productosDivididos, productosDivididos[pag]])

  useEffect(() => {
    if (pag < 0) {
      setpag(pag + productosDivididos.length)
    }
    //console.log("productos divididos debug")
    //console.log({pag})
    //console.log({productosDivididos})
    //console.log(productosDivididos[pag])



  }, [pag])
  useEffect(() => {
    setpag(0)
  }, [number])

  return (
    <>

      {productos.length === 0 ? (
        <p>{traductor("loading")}</p>
      ) : (
        <div className=" d-flex flex-row">
          <div className=" pl-5 d-flex align-items-center">
            <button className="btn btn-primary" onClick={rePag}>{"<"}</button>
          </div>
          <div className='d-block-flex'>
            <div className="vw-75 row row-cols-4 d-flex justify-content-center"
              style={{
                paddingTop: '200px',
              }}>
              {productosDivididos[pag] && productosDivididos[pag].map((_, index) => (

                <ItemContent key={index} item={productosDivididos[pag][index]} setCounter={setCounter} col='col-4' />

              ))}

            </div>
            <div className='d-flex flex-row-reverse'>
              <DropDownItemsNumber number={number} min={5} setNumber={setnumber} />
              {productosDivididos.length > 1 ? productosDivididos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => cambioPagina(productosDivididos.length - index)}
                  className={(productosDivididos.length - index) === pag + 1 ? 'btn btn-primary' : 'btn btn-secondary'}
                >
                  {productosDivididos.length - index}
                </button>
                //    {Object.keys(productosDivididos).map((clave)=>(
                //     <button key={clave} onClick={()=>cambioPagina(productosDivididos.length-clave)} 
                //     className={(productosDivididos.length-clave)===pag+1?' btn btn-primary':'btn btn-secondary'}>
                //       {productosDivididos.length-clave}</button>
                // )
                // )}
              )) : null}
            </div>

          </div>
          <div className="d-flex align-items-center">
            <button onClick={avPag} className="btn btn-primary">{">"}</button>
          </div>

        </div>
      )}

    </>)
}