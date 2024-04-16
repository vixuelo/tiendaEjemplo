import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { filterUniques, getItemById, parseoPredicion } from '../helpers/helpersItems';
import { PhotosContent } from '../components/PhotosContent';
import { DetailsContent } from '../components/DetailsContent';
import { getVendedorbyName } from '../helpers/getVendedorbyName';
import { SellerInfo } from '../components/SellerInfo';
import { LikeContent } from '../../UI/Components/LikeContent';
import { YMLContent } from '../../Related/Components/YMLContent';
import { DescContent } from '../components/DescContent';
import {addItemOnCookies} from '../../Cookies/helpers/clients';
import { RelatedComponent } from '../../Related/Components/RelatedComponent';
import { Bottom } from '../../UI/Components/Bottom';
import { NavBar } from '../../UI/Components/NavBar';

export const ItemPage = () => {
  const key = localStorage.getItem("actualKeyID");
  
  
 
  
  const arrayVacio=[]
  const {itemId} = useParams();
  const item = getItemById(itemId);
 
  const vendedor=getVendedorbyName(item.vendedor);
  addItemOnCookies(item);
  
  const lastItems = localStorage.getItem("cookiesLastItem")===(null)? arrayVacio:JSON.parse(localStorage.getItem("cookiesLastItem"));
  
  if(lastItems[lastItems.length-1]!==item.referencia){
    lastItems.push(item.referencia);
  }
  localStorage.setItem("cookiesLastItem", JSON.stringify(lastItems));
  const cookies = JSON.parse(localStorage.getItem("cookiesHistorial"));
  const arrayprediccion5 = lastItems.slice(lastItems.length-1-11,lastItems.length-1)
  const arrayprediccion10 = lastItems.slice(lastItems.length-1-3,lastItems.length-1)
  const arrayIndexNext5=predecirSiguiente5(arrayprediccion5);
  const arrayProdNext5=filterUniques(parseoPredicion(arrayIndexNext5));
  const arrayIndexNext10=predecirSiguiente10(arrayprediccion10);
  const arrayProdNext10=filterUniques(parseoPredicion(arrayIndexNext10));
  useEffect(() => {
    console.log("Debug cookies:")
    console.log({cookies})
    
    console.log("Fin debug cookies:")
  }, [cookies])
  
  useEffect(() => {
    console.log("Debug lastItem:")
    console.log({lastItems});
    console.log("Fin debug lastItem:")
  }, [lastItems])
  
  useEffect(() => {
    console.log("Debug arrayProdNext5:")
    console.log({arrayprediccion5})
    console.log({arrayIndexNext5})
    console.log({arrayProdNext5})
    console.log("Fin debug arrayProdNext5:")
  }, [arrayProdNext5])
  
  useEffect(() => {
    console.log("Debug cookiarrayProdNext10:")
    console.log({arrayprediccion10})
    console.log({arrayIndexNext10})
    console.log({arrayProdNext10})
    console.log("Fin debug arrayProdNext10:")
  }, [arrayProdNext10])
  



  return (
    <>
    <NavBar/>
    <div >
     {/* <div className="d-flex justify-content-center">
     <div className=" m-5 d-flex bg-white rounded border flex-nowrap justify-content-center">
  <div className="m-5 photocontent">
  <PhotosContent item={item}/>
  </div>
  <div className="detailscnt element">
    
  <DetailsContent item={item}/>
  </div>
  <div className="element">
  <div className=" sellercnt d-block ">
       <SellerInfo vendedor={vendedor}/>
       <LikeContent/> 
     </div>
  </div>
</div>
     </div> */}
      <div className="  detailWidth container">
 
      <div className=" mt-5 border rounded bg-white">
      <div className=" p-5 text-start">
        <div className=" d-flex justify-content-between">
        <PhotosContent item={item}/>
     <div className=" detailscnt d-block ">
      <DetailsContent item={item}/>
     </div>
     <div className="sellercnt d-block ">
       <SellerInfo vendedor={vendedor}/>
       <LikeContent/> 
     </div>
      </div>
    </div>
    </div>
        </div>
    
      <div className="detailWidth container  ">
  <div className="d-block">
        <div className=" d-inline-flex m-2  ">
      <DescContent item={item}/>
      <div className='d-flex border bg-white rounded m-1 p-3'>
        
          <YMLContent items={arrayProdNext5}item={item}/>
      </div>
    </div>
        </div>
    </div>
 </div>
    <RelatedComponent items={arrayProdNext10}item={item}/>
    <Bottom/>
    </>
  )
}
