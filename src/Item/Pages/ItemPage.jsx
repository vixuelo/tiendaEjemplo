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
import { addItemOnCookies } from '../../Cookies/helpers/clients';
import { RelatedComponent } from '../../Related/Components/RelatedComponent';
import { Bottom } from '../../UI/Components/Bottom';
import { NavBar } from '../../UI/Components/NavBar';
import { modeloIntegrado } from '../../Cookies/modelo/modelo';

export const ItemPage = () => {
  const key = localStorage.getItem("actualKeyID");




  const arrayVacio = []
  const { itemId } = useParams();
  //console.log(itemId)
  const item = getItemById(itemId);

  const lastItems = addItemOnCookies(item);

  const [predicciones, setPredicciones] = useState([]);
  const [predicciones10, setPredicciones10] = useState([]);
  const [predicciones5, setPredicciones5] = useState([]);
  const vendedor = getVendedorbyName(item.vendedor);





  useEffect(() => {
    modeloIntegrado(15, lastItems, setPredicciones)
    //console.log({predicciones})

  }, [item])

  useEffect(() => {
    //console.log("Debug lastItem:")
    //console.log({lastItems});
    //console.log("Fin debug lastItem:")
  }, [lastItems])

  useEffect(() => {
    if (predicciones.length > 0) {
      //console.log("Debug predicciones10:")
      setPredicciones10(predicciones.slice(0, 10))
      //console.log("Fin debug predicciones10:") 
      //console.log("Debug predicciones5:")
      setPredicciones5(predicciones.slice(10, 15))
      //console.log("Fin debug predicciones5:")
      }
    }, [predicciones])
  






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
                <PhotosContent item={item} />
                <div className=" detailscnt d-block ">
                  <DetailsContent item={item} />
                </div>
                <div className="sellercnt d-block ">
                  <SellerInfo vendedor={vendedor} />
                  <LikeContent item={itemId} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detailWidth container  ">
          <div className="d-block">
            <div className=" d-inline-flex m-2  ">
              <DescContent item={item} />
              <div className='d-flex border bg-white rounded m-1 p-3'>

                <YMLContent items={predicciones5} item={item} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedComponent cookies={predicciones10} item={item} />
      <Bottom />
    </>
  )
}
