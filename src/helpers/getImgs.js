// import { createClient } from 'pexels';
// import React, { useState, useEffect } from 'react';

// export const getImgs = (categoria) => {
//     const [imagenes, setImagenes] = useState([]);
//     const [cargando, setcargando] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             const cliente = createClient('HCjiUmXyBkq7thKG6tBHReAS9MihZg7FBxc33vDmblyhhMuRTKd49dBt');
//             try {
//                 const fotos = await cliente.photos.search({ query: categoria, per_page: 6 });
//                 const imagenesMapeadas = fotos.photos.map(img => ({
//                     id: img.id,
//                     titulo: img.alt,
//                     url: img.src.tiny
//                 }));
//                 setImagenes(imagenesMapeadas);
//                 setcargando(false)
//             } catch (error) {
//                 console.error('Error al obtener las imágenes:', error);
//             }
//         };

//         fetchData();
//     }, [categoria]);

//     return {
//         imagenes:imagenes,
//         cargando:cargando
//     }
// };
import { items } from '../assets/productos';

export const getImgs = async (category, referencia) => {
    const url = `https://pixabay.com/api/?key=43355303-c5725e69b527ed1520ba6e55b&q=${category}&image_type=photo&pretty=true`;
    try {
        const resp = await fetch(url);
        //console.log("respuesta:", resp, category)
        const { hits } = await resp.json();
        const imgs = hits.map((img, index) => (
            index !== 2 && index !== 4 && index !== 6 ?
                {
                    id: img.id,
                    url: img.webformatURL
                } : null
            // {id:img.id,
            // url:img.webformatURL}
        ))
        const imgsRet = imgs.filter(img => img)
        return imgsRet.slice(0, 7);
    } catch (error) {
        //console.log(error)
    }
}