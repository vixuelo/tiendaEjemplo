import React, { useState, useEffect } from 'react';
import { MainBody, SearchBody } from '../../Search/Pages/SearchBody';
import { useLocation } from 'react-router-dom';
import { NavBar } from '../Components/NavBar';
import { RelatedComponent } from '../../Related/Components/RelatedComponent';
import { Bottom } from '../Components/Bottom';
import { items } from '../../assets/productos';
import { getAllItemsBySearch } from '../../Item/helpers/helpersItems';
import { modeloIntegrado } from '../../Cookies/modelo/modelo';

export const MainPage = () => {
  const loc = useLocation();
  const search = loc.search;
  const [LastItems, setLastItems] = useState([])
  const [predicciones, setPredicciones] = useState([])
  
  useEffect(() => {
    if (search === "") {
      const lastItems = JSON.parse(localStorage.getItem("cookiesLastItem"))||[];
      setLastItems(lastItems);
      
    modeloIntegrado(10, LastItems,setPredicciones,true)
    }
  }, [loc]);

  useEffect(() => {
    if (LastItems.length > 0) {
      modeloIntegrado(10, LastItems,setPredicciones,true)
      console.log({predicciones})
    }
  }, [LastItems]);
  useEffect(() => {
    console.log("debug: ",{predicciones})
  }, [predicciones])
  

  
  return (
    <>
      <NavBar />
      <div className="container d-flex justify-content-center">
        {search !== "" ? <SearchBody search={search} /> : <MainBody />}
      </div>
      {predicciones.length>0&&<RelatedComponent cookies={predicciones} />}
      <Bottom />
    </>
  );
};

export default MainPage;
