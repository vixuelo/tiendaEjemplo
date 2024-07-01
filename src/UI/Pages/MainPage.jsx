import React, { useState, useEffect } from 'react';
import { SearchBody } from '../../Search/Pages/SearchBody';
import { useLocation } from 'react-router-dom';
import { NavBar } from '../Components/NavBar';
import { RelatedComponent } from '../../Related/Components/RelatedComponent';
import { Bottom } from '../Components/Bottom';
import { modeloIntegrado } from '../../Cookies/modelo/modelo';
import { MainBody } from '../../Search/Pages/MainBody';
import { CategoryBody } from '../../Search/Pages/CategoryPage';
import { useFetchImgs } from '../../hooks/useFetchImgs';
import queryString from 'query-string';
import { FavoriteBody } from '../../Search/Pages/FavoriteBody';
import { SellerBody } from '../../Search/Pages/SellerBody';

export const MainPage = () => {
  const loc = useLocation();
  const search = loc.search;
  const [LastItems, setLastItems] = useState([])
  const [predicciones, setPredicciones] = useState([])

  useEffect(() => {

    if (search === "") {
      //console.log("menuprc")
      const lastItems = JSON.parse(localStorage.getItem("cookiesLastItem")) || [];
      setLastItems(lastItems);

      modeloIntegrado(10, LastItems, setPredicciones, true)
    } else {
      //console.log("search",search)
      const lastItems = JSON.parse(localStorage.getItem("cookiesLastItem")) || [];
      setLastItems(lastItems);
      modeloIntegrado(10, LastItems, setPredicciones)
    }
  }, [loc]);

  useEffect(() => {
    if (LastItems.length > 0) {
      if (search === "") {
        modeloIntegrado(10, LastItems, setPredicciones, true)
        //console.log({predicciones})
      } else {

        modeloIntegrado(10, LastItems, setPredicciones, false)
        //console.log({predicciones})
      }
    }
  }, [LastItems]);
  useEffect(() => {
    //console.log("debug: ",{predicciones})
  }, [predicciones])



  return (
    <>

      <NavBar />
      <div className=" mainPage-Content container d-flex justify-content-center" style={{ marginTop: '100px' }}>
        {search !== "" ?
          search?.includes("?c=") ? <CategoryBody search={search} /> :
            search?.includes("?f=") ? <FavoriteBody search={search} /> :
              search?.includes("?v=") ? <SellerBody search={search} /> :

                <SearchBody search={search} />
          :
          <MainBody />}
      </div>
      {predicciones.length > 0 && <RelatedComponent cookies={predicciones} />}
      <Bottom />
    </>
  );
};

export default MainPage;
