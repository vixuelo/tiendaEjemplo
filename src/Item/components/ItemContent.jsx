import React, { useEffect, useState } from 'react';
import { items } from '../../assets/productos';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getImgs } from '../../helpers/getImgs';
import { useFetchImgs } from '../../hooks/useFetchImgs';
import { getItemById, verificarURL } from '../helpers/helpersItems';
import { traductor } from '../../Traductor/traductor';

export const ItemContent = ({ item, col, related }) => {
  if (!related) {
    //console.log("nombre del desaparecido: ", item.nombre);
  }
  const navigate = useNavigate();
  const params = useParams();

  if (!isNaN(item)) {
    //console.log({ item });
    item = getItemById(item);

    //console.log({ item });
  } //console.log(item);
  const nombre = item.subcategoria.replaceAll(' ', '+');
  const { imagenes, cargando } = useFetchImgs(nombre);

  const [image, setImage] = useState(item.url);
  const [indexImg, setIndexImg] = useState(0);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    if (imagenes.length > 0) {
      setIndexImg(item.referencia % imagenes.length);
      const imagen = document.getElementById(`image${item.referencia}`);
      imagen.src = imagenes[indexImg]?.url;
    }
    //console.log('Debug de imagenes en itemContent');
    //console.log({ imagenes, indexImg });
    //console.log('nombre:', item.nombre);
    //console.log('fin de imagenes en itemContent');
    const likedJSON = JSON.parse(localStorage.getItem("loveList")) || [];
    //console.log({ likedJSON })
    setFavorito(likedJSON.includes(item.referencia));
  }, [cargando, imagenes, indexImg, item]);

  // Función para manejar errores de carga de imagen
  const errorImg = () => {
    const imagen = document.getElementById(`image${item.referencia}`);
    imagen.alt = 'cargando...';
    imagen.src = imagenes[indexImg]?.url;
  };
  useEffect(() => {
    (async () => {
      const resultado = await verificarURL(item.url);
      if (resultado === false) {
        setImage(imagenes[indexImg]?.url);
      }
    })();
  }, []);

  const onClickItem = () => {
    if (item.referencia !== params.itemId) {
      navigate(`/item/${item.referencia}`);
    }
  };

  const toggleFavorito = (e) => {
    e.stopPropagation(); // Evitar que el clic se propague al botón padre
    const likeList = JSON.parse(localStorage.getItem("loveList")) || [];
    //console.log({ likeList })
    if (!likeList.includes(item.referencia)) {
      likeList.push(item.referencia);
      const likeJSON = JSON.stringify(likeList);
      localStorage.setItem("loveList", likeJSON);
      setFavorito(true);
    } else {
      likeList.pop(item.referencia);
      setFavorito(false);
      const likeJSON = JSON.stringify(likeList);
      localStorage.setItem("loveList", likeJSON);
    }
  };

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
          <hr className='' />
        </div>
        {related ? null : <hr style={{ color: "#0056b2" }} />
        }
        <div className="d-flex justify-content-between">
          <div className={`related-txtBox`}>
            <h1>
              <b>{traductor("$")} {item.precio}</b>
            </h1>
            <h4>
              <img
                src={`Layout/Stars/${Math.floor(item.rating)}stars.png`}
                alt='stars'
              />
              - <small className='text-warning'>{item.rating}</small>
            </h4>
            <h4>
              <small>{traductor(item.nombre)}</small>
            </h4>
            <h4>
              <small>{traductor(item.subcategoria)}</small>
            </h4>
          </div>
          <div className=""

          >
            <button className='mt-3 btn border' onClick={(e) => toggleFavorito(e)}>

              {!favorito ? <img className="" src="Layout\Button\likeIt.svg" alt="like" /> : <img src="Layout\Button\likedIt2.svg" alt="like" />}
            </button>
          </div>
        </div>
      </button>
    </>
  );
};
