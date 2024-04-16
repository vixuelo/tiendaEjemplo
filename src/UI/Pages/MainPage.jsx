import React from 'react'
import { SearchBody } from '../../Search/Pages/SearchBody'
import { useLocation } from 'react-router-dom'
import { NavBar } from '../Components/NavBar'
import { RelatedComponent } from '../../Related/Components/RelatedComponent'
import { Bottom } from '../Components/Bottom'
import {items} from '../../assets/productos'
export const MainPage = () => {
  const itemsNames=[];
  items.map((item)=>{
    itemsNames.push(item.nombre);
  })
  console.log(itemsNames);
  const keyEjemplo=JSON.stringify([
  
  ]);
  
const cookiesJSON = localStorage.getItem("cookiesHistorial")===null?keyEjemplo:localStorage.getItem("cookiesHistorial");
const cookiesLastItems = localStorage.getItem("cookiesLastItem")===null?keyEjemplo:localStorage.getItem("cookiesHistorial");
  const cookies = JSON.parse(cookiesJSON);
  
  const {key}=useLocation();
  localStorage.setItem("actualKeyID", key);
  cookies.push({
    keyID:key, itemsCount:0,items:[]
  })
  console.log({cookies})
  localStorage.setItem("cookiesHistorial", JSON.stringify(cookies) );
  localStorage.setItem("cookiesLastItems", JSON.stringify(cookiesLastItems) );


  
  return (
    <>
    <NavBar/>
    <div className=" container d-flex justify-content-center"
        
    >
        <SearchBody random={true}/>

    </div>
    <RelatedComponent/>
    <Bottom/>
    </>
  )
}
