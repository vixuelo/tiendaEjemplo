import React, { useState, useEffect } from 'react';
import { useFetchImgs } from '../../hooks/useFetchImgs';
import { Modal, ModalContent } from './PopUp';
import { useParams } from 'react-router-dom';
import { getImgs } from '../../helpers/getImgs';

export const PhotosContent = ({ item }) => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [imagePrc, setImagePrc] = useState(item.url);
  const [imagePrcName, setImagePrcName] = useState("img1");
  const nombre = item.subcategoria.replaceAll(" ", "+");
  //console.log("nombre en peticion:", nombre)
  const { imagenes, cargando } = useFetchImgs(nombre, item.referencia);
  useEffect(() => {

    //console.log("Debug de imagenes en PhotosContent")
    //console.log({imagenes,index,cargando})
    //console.log("nombre:",item.nombre)
    //console.log("fin de imagenes en PhotosContent")
  }, [cargando, imagenes, index, item])
  useEffect(() => {
    if (imagenes.length > 0) {
      setImagePrc(imagenes[0].url)
      setIndex(item.referencia % imagenes.length);
    }
  }, [item.referencia, imagenes]);

  const handleOpen = () => {
    setOpen(true);
  };



  const selectPhoto = (index) => {
    if (imagePrc === imagenes[index].url) {
      setImagePrc(imagenes[0].url);
      setImagePrcName("img1");
    } else {
      setImagePrc(imagenes[index].url);
      setImagePrcName(`img${index}`);
    }
  };

  const [isOpen, setIsopen] = useState(false);
  const showModal = () => setIsopen((prev) => !prev);
  if (cargando) {
    return <div>Cargando...</div>;
  }
  return (
    <div className='detailsContainer PhotoCnt d-block-flex align-items-center'>
      <img
        src={imagePrc}
        alt={imagePrcName}
        id={`image${item.referencia}`}
        onClick={showModal}
        // You might want to handle image loading errors here
        className='principal border rounded'
      />

      {isOpen && (
        <ModalContent onClose={() => setIsopen(false)}>
          <img
            className='d-flex justify-content-center'
            src={imagePrc}
            alt={imagePrcName}
          />
        </ModalContent>
      )}
      <div className="d-flex justify-content-center">
        <div className="w-100 d-flex justify-content-center">
          {/* Correctly return JSX elements inside the map function */}
          {imagenes.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`img${index}`}
              onClick={() => selectPhoto(index)}
              className={(image.url === imagePrc ? "galleryPrc" : "") + " gallery rounded"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
