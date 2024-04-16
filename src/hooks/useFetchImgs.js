import { useEffect, useState } from "react";
import { getImgs } from "../helpers/getImgs";


export const useFetchImgs= (name,referencia) => {
    
    
    const [images, setimages] = useState([]);
    const [isLoadingImages, setIsLoading] = useState(true);
    useEffect(() => {
        console.log("Debug newImages en fetchImgs")
        console.log({images})
        console.log("fin newImages en fetchImgs")
    }, [images])
    useEffect(() => {
        console.log("Debug name en fetchImgs")
        console.log(name)
        console.log("fin name en fetchImgs")
    }, [name])
    
    
    const getImages=async()=>{

            const newImages = await getImgs(name,referencia);

            if(newImages.length>0){
                setimages(newImages);
                setIsLoading(false);
            }
        
}
        
        useEffect(() => {
          getImages();
        }, [name])
    return{
    imagenes:images,
    cargando:isLoadingImages
     }
}
