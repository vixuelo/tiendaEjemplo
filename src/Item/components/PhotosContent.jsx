import React, { useState, useEffect } from 'react';
import { useFetchImgs } from '../../hooks/useFetchImgs';
import { PopUp } from './PopUp';
import { useParams } from 'react-router-dom';
import { getImgs } from '../../helpers/getImgs';

export const PhotosContent = ({ item }) => {
  const params= useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if(!open){
      setOpen(true);
    }
  };
  
  const [index, setindex] = useState(0)
  const [Loading, setLoading] = useState(true)
  const [imagePrc, setimagePrc] = useState(item.url)
  const [imagePrcName, setimagePrcName] = useState("img1")

  const { imagenes, cargando } = useFetchImgs(item.subcategoria.replace(" ","+"),item.referencia);

  if(imagenes.length>0){
    setindex(item.referencia%imagenes.length);
  }

 
  const errorImg=()=>{

    const imagen = document.getElementById(`image${item.referencia}`);
    imagen.alt="cargando..."
    
    imagen.src =imagenes[indice].url;
    
  }
 
  
  const SelectPhoto=(index)=>{
    if(imagePrc===imagenes[index].url){
      setimagePrc(item.url)
      setimagePrcName("img1")
    }else{
      setimagePrc(imagenes[index].url);
    setimagePrcName(`img${index}`);
    }
  }
  
  useEffect(() => {
    console.log("Debug item en PhotoContent")
    setimagePrc(item.url);
    setimagePrcName(`img1`)
    console.log("fin item en PhotoContent")
    
  }, [item])
  useEffect(() => {
    console.log("Debug imagenes en PhotoContent")
    console.log({imagenes})
    console.log("fin imagenes en PhotoContent")
    
  }, [imagenes])
  
  // Actualizar el nombre cuando item.nombre cambie
  

  // Renderizar el componente según isLoading
  
  const close=()=>{
    setOpen(false);
  }
  if (cargando) {
    return <div>Cargando...</div>;
  }
  // Renderizar las imágenes
  return (
    <div className='detailsContainer PhotoCnt d-block-flex align-items-center'>
    
      {open&&<PopUp close={close} image={imagePrc}/>}
      <img src={imagePrc} alt={imagePrcName}
      id={`image${item.referencia}`} onClick={()=>handleOpen()} onError={()=>errorImg()}  className='principal border rounded' />
      <div className="d-flex justify-content-center">
        <div className="w-100 d-flex justify-content-center">
          {
           imagenes.map((image, index) => {
         
              (  <img key={index} src={image.url}
                 alt={`img${index}`} 
                  onClick={()=>SelectPhoto(index)}
                   className={(imagenes[index].url===imagePrc?"galleryPrc":"") +" gallery rounded"}
                    />)
            
          })}
        </div>
      </div>
    </div>
  );
};
