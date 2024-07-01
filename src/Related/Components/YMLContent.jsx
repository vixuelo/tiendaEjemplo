import React, { useEffect, useState } from 'react'
import { getItemById, getNItemsRandomly } from '../../Item/helpers/helpersItems'
import { YMLitem } from './YMLitem';
import { useFetchProductos } from '../../hooks/useFetchProductos';
import { useParams } from 'react-router-dom';
import { traductor } from '../../Traductor/traductor';
import { useGlobalVariable } from '../../Context/MyContextProvider';
const limpiarRepetidos = (items, item) => {
    const arrayRet = []
    //console.log("items:",{items})
    items.map((itemNL) => {
        //console.log({itemNL})
        //console.log({item})
        if (itemNL.nombre !== item.nombre) { arrayRet.push(itemNL) }

    })
    //console.log({arrayRet});
    return arrayRet
}
export const YMLContent = ({ items, item }) => {
    const { globalVariable, setGlobalVariable } = useGlobalVariable();

    const params = useParams();
    const [productosData, setProductosData] = useState([]);
    const itemsLimpios = limpiarRepetidos(items, item);
    //console.log({item})
    //console.log({items});
    //console.log({itemsLimpios});
    //console.log(5-itemsLimpios.length);
    const { productos, isLoading: isLoadingProductos } = useFetchProductos(5, itemsLimpios, item);
    useEffect(() => {
        if (!isLoadingProductos) {
            if (5 - itemsLimpios.length === 0) {
                setProductosData(itemsLimpios);
            } else {
                const itemsUnidos = itemsLimpios.concat(productos)
                //console.log({productos})
                //console.log({itemsLimpios})
                //console.log({itemsUnidos})
                if (itemsUnidos.length > 5) {
                    setProductosData(itemsUnidos.slice(0, 5))
                    //console.log({productosData})
                } else {
                    setProductosData(itemsUnidos);
                }

            }

        }
    }, [productos, isLoadingProductos, params, items]);
    useEffect(() => {
        //console.log(productosData)
    }, [productosData])

    // useEffect(() => {
    //     if (!isLoading) {
    //         if (items !== null) {
    //             setProductosData(items);
    //         } else {
    //             // Aquí puedes manejar el caso en que items sea null
    //             //console.log("Items es null");
    //         }
    //     }
    // }, [isLoading, items]);

    return (
        <div className='d-block-flex '>
            <h6 className='p-3'>{traductor("YML", globalVariable)}
                {/* {items.length} */}
            </h6>
            {isLoadingProductos ? (
                <p>{traductor("loading", globalVariable)}...</p>
            ) : (
                Object.keys(productosData).map((clave) => (
                    <YMLitem key={clave} item={productosData[clave]} />
                ))
            )}
        </div>
    )
}
