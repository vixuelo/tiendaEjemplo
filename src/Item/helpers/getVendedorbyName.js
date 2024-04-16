import {empresas} from '../../assets/empresas.json'
export const getVendedorbyName = (vendedor) =>{
    return empresas.find(empresa=>empresa.nombre===vendedor);
}