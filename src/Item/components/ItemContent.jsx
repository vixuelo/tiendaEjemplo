import React, { useEffect, useState } from 'react';
import {items} from '../../assets/productos' 
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getImgs } from '../../helpers/getImgs';
import { useFetchImgs } from '../../hooks/useFetchImgs';
import { verificarURL } from '../helpers/helpersItems';

export const ItemContent = ({ item, col, related }) => {
  const navigate = useNavigate();
  const params = useParams();

 
  const nombre =item.subcategoria.replaceAll(" ", "+");
  const { imagenes, cargando } = useFetchImgs(nombre);

  const [image, setimage] = useState(item.url)
  const [indexImg, setindexImg] = useState(0)
 useEffect(() => {
  if(imagenes.length>0){
    setindexImg(item.referencia%imagenes.length)
    const imagen = document.getElementById(`image${item.referencia}`);
  imagen.src =imagenes[indexImg]?.url;
  }
  console.log("Debug de imagenes en itemContent")
   console.log({imagenes,indexImg})
   console.log("nombre:",item.nombre)
   console.log("fin de imagenes en itemContent")
   
 }, [cargando, imagenes,indexImg,item])
 

  // Función para manejar errores de carga de imagen
  const errorImg=()=>{

    const imagen = document.getElementById(`image${item.referencia}`);
    imagen.alt="cargando..."
    
    imagen.src =imagenes[indexImg].url;
  }
useEffect(() => {
  (async () => {
    const resultado = await verificarURL(item.url);
    if(resultado===false){
      setimage(imagenes[indexImg].url)
    }
  })();
}, [])


  

  const onClickItem = () => {
    if (item.referencia !== params.itemId) {
      navigate(`/item/${item.referencia}`);
    }
  };

  // const [image, setimage] = useState();

  return (
    <>
    <button
      className={` itemContent btn-related-${related} border rounded `}
      onClick={onClickItem}
      style={{
        background: 'white',
        margin: '10px',
        align: 'center',
      }}
    >
      <div
        className='d-flex justify-content-center'
        style={{
          height: '30%',
        }}
      >
        <img
          className={`related-${related}`}
          src={image}
          id={`image${item.referencia}`}
          onError={errorImg} // Manejar errores de carga de imagen
          alt={item.nombre}
        />
      </div>
      {related ? null : <hr />}
      <div className={`related-txtBox`}>
        <h1><b>$ {item.precio}</b></h1>
        <h4><img src={`/src/assets/Layout/Stars/${Math.floor(item.rating)}stars.png`} alt="stars" />- <small>{item.rating}</small></h4>
        <h4><small>{item.nombre}</small></h4>
        <h4><small>{item.subcategoria}</small></h4>
      </div>
    </button>
  </>
  );
};
