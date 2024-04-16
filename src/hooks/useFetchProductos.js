import React, { useEffect, useState } from 'react';
import { getNItemsRandomly } from '../Item/helpers/helpersItems';
import { useLocation } from 'react-router-dom';

export const useFetchProductos = (numero, items, item) => {
    const loc = useLocation();
    const [productos, setProductos] = useState([]);
    const [isLoadingProductos, setIsLoading] = useState(true);
    useEffect(() => {
        console.log("Debug productos en fetchproductos")
        console.log(productos)
        console.log("fin productos en fetchproductos")
    }, [productos])
    useEffect(() => {
        console.log("Debug isLoadingProductos en fetchproductos")
        console.log(isLoadingProductos)
        console.log("fin isLoadingProductos en fetchproductos")
    }, [isLoadingProductos])

    useEffect(() => {
        console.log("Debug item en fetchproductos")
        console.log(item)
        console.log("fin item en fetchproductos")
    }, [item])
    useEffect(() => {
        const getProductos = async () => {
            try {
                const newProductos = await getNItemsRandomly(numero, items, item);
                setProductos(newProductos);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching productos:', error);
                setIsLoading(true);
            } finally {
            }
        };

        getProductos();
    }, []);

    return {
        productos,
        isLoading: isLoadingProductos
    };
};
