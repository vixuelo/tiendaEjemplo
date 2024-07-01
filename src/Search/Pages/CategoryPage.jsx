
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


export const CategoryBody = ({ search }) => {
  const [searchContent, setSearchContent] = useState();
  const [number, setnumber] = useState(() => {
    if (searchContent?.length < 9) {
      return searchContent.length
    } else {
      return 9
    }
  })


  const [productosDivididos, setProductosDivididos] = useState([]);
  const [pag, setPag] = useState(0);

  const { imagenes, cargando } = useFetchImgs(queryString.parse(search).c)


  useEffect(() => {


    //console.log("Debug de location en SearchBody")
    //console.log(search)
    //console.log(queryString.parse(search))

    // if(searchType==="f"){
    //   const likeList= localStorage.getItem("loveList")
    //   setSearchContent(Array.from(new Set(JSON.parse(likeList))))
    //   setnumber(()=>{
    //    if(searchContent?.length>0 && searchContent?.length<9){
    //      return searchContent.length
    //    }else{
    //      return 9;
    //    }
    //   })
    //   //console.log("debug de number: ",number);
    //  }

    //console.log(queryString.parse(search).c)
    setSearchContent(getAllItemsBySearch(queryString.parse(search).c));
  }, [search]);
  useEffect(() => {
    //console.log("debug searchContent: ", searchContent)
    setnumber(() => {
      if (searchContent?.length > 0 && searchContent?.length < 9) {
        return searchContent.length;
      } else {
        return 9;
      }
    })
    //console.log("debug de number: ",number);
  }, [searchContent])


  useEffect(() => {
    //console.log("Debug searchContent")
    //console.log({searchContent})  
    //console.log(parseInt(number))
    const numero = number < searchContent / 10 ? searchContent / 10 : number;
    setProductosDivididos(sliceN(searchContent, parseInt(numero)));
    //console.log({productosDivididos,pag})
  }, [searchContent, number]);
  useEffect(() => {
    setPag(0)
  }, [number])

  useEffect(() => {
    //console.log("Debug productosDivididos:");
    //console.log({ productosDivididos }); 
    //console.log("Fin productosDivididos:");
  }, [productosDivididos]);
  const rePag = () => {
    //console.log("repag")
    //console.log({pag})
    const nuevaPagina = (pag - 1);
    //console.log("nueva pagina", nuevaPagina);
    //console.log({productosDivididos})
    //console.log("productos div tam",productosDivididos.length);

    //console.log("nueva pagina revisada",nuevaPagina<0?productosDivididos.length-1:nuevaPagina)
    setPag(nuevaPagina < 0 ? productosDivididos.length - 1 : nuevaPagina)
    //console.log({pag})

  }
  const avPag = () => {
    //console.log("avpag")
    //console.log({pag})
    const nuevaPagina = (pag + 1);
    //console.log("nueva pagina", nuevaPagina);
    //console.log({productosDivididos})
    //console.log("productos div tam",productosDivididos.length);
    const nuevaPaginaFinal = nuevaPagina > productosDivididos.length - 1 ? 0 : nuevaPagina % productosDivididos.length

    //console.log("nueva pagina revisada",nuevaPaginaFinal)

    setPag(nuevaPaginaFinal)
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

          setPag(nuevaPagina > productosDivididos.length - 1 ? nuevaPagina - productosDivididos.length : nuevaPagina);
          //console.log({ pag });
          break;
        case 37:
          nuevaPagina = pag - 1;
          //console.log({ nuevaPagina });
          //console.log(productosDivididos.length);
          setPag(nuevaPagina < 0 ? nuevaPagina + productosDivididos.length : nuevaPagina);

          //console.log({ pag });
          break;

      }
    };

    document.addEventListener("keyup", keyDownCallback);

    return () => document.removeEventListener("keyup", keyDownCallback);
  }, [productosDivididos[pag]]);


  useEffect(() => {
    //console.log(productosDivididos[pag]);
    //console.log(pag);
  }, [pag]);

  const cambioPagina = (clave) => {
    setPag(clave - 1);
  };

  return (
    <>
      {productosDivididos.length > 0 ? (
        <>

          <div className='d-block-flex'>

            <div className='d-flex justify-content-center'>
              <div className=" text-center">
                <h1>{traductor(queryString.parse(search).c)}</h1> <img className='w-25' src={imagenes[0]?.url} />
              </div>
            </div>

            <div className=" d-flex flex-row">
              <div className=" pl-5 d-flex align-items-center">
                <button className="btn btn-primary" onClick={rePag}>{"<"}</button>
              </div>
              <div className='d-block-flex'>
                <div className="row row-cols-4 d-flex justify-content-center"
                  style={{
                    paddingTop: '200px',
                    width: '60vw'
                  }}>
                  {productosDivididos[pag] && productosDivididos[pag].map((_, index) => (

                    <ItemContent key={index} item={productosDivididos[pag][index]} col='col-4' />

                  ))}

                </div>
                <div className='d-flex flex-row-reverse'>
                  <DropDownItemsNumber number={number} setNumber={setnumber} min={Math.ceil(searchContent.length / 10)} max={searchContent.length} />
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
          </div>
        </>
      ) :
        (
          // !f?
          (<div className="alert alert-danger">
            {traductor("404search")}<b>{queryString.parse(search).c}</b>
          </div>)
          // :
          //  <div className="alert alert-danger">
          //   {traductor("no_favorites")}
          // </div>
        )
      }
    </>
  );
};
