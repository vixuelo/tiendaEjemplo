import { useGlobalVariable } from "../Context/MyContextProvider";
import {string} from "/src/Traductor/string.json"
export const traductor=(contenido, idioma="")=>{
    const { globalVariable } = useGlobalVariable();
        return string[globalVariable][contenido];
}