import React, { useEffect, useState } from 'react'
import { useFetchProductos } from '../../hooks/useFetchProductos';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchImgs } from '../../hooks/useFetchImgs';
import { getImgs } from '../../helpers/getImgs';
import { verificarURL } from '../../Item/helpers/helpersItems';

export const YMLitem = ({item}) => {
    const params = useParams();
    const navigate=useNavigate();
        const onclickItem=(event)=>{
            if(item.referencia!=params.itemId){
                navigate(`/item/${item.referencia}`);
            }
        }
        const [image, setimage] = useState(item.url);
        const { imagenes, cargando } = useFetchImgs(item.nombre.replace(" ","+")+"+"+item.subcategoria);
        const index = Math.floor(Math.random()*imagenes.length);
 
        const errorImg=()=>{

            const imagen = document.getElementById(`image${item.referencia}yml`);
            imagen.alt="cargando..."
            
            imagen.src =imagenes[index].url;
          }
          useEffect(() => {
            console.log("Debug imgs:")
            console.log({imagenes})
            if (imagenes.length>0){
                setimage(imagenes[index].url);
            }
            console.log(cargando)
            console.log("Fin imgs:")
          }, [imagenes,cargando])   
         
              
          useEffect(() => {
            setimage(item.url)
            console.log("Debug item:")
            console.log({item})
            console.log("Fin item:")
          }, [item])

        
        return (
            <button  className=" container d-inline-flex h6 "
                    style={{
                        height:"17%",
                        border:"none",
                        background:"none"
                    }}
                    onClick={()=>onclickItem()}>
       <div className=' '>
       <img
          src={verificarURL(item.url)?item.url:image}
          style={{
            maxWidth:"60px",
            maxHeight:"60px"
        }}    
          id={`image${item.referencia}yml`}
          onError={errorImg} // Manejar errores de carga de imagen
          alt={item.nombre}
        />
       
       </div>
        <div className=" d-flex justify-content-around">
        <div className="pl-3 d-flex align-items-center text-start">{item.nombre}</div>
        <div className="pl-3 d-flex align-items-center text-start">{item.precio}€</div>
        </div>
        </button>
  )
}
