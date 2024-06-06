import React from 'react';
import { useGlobalVariable } from '../../Context/MyContextProvider';
import { traductor } from '../../Traductor/traductor';

export const DetailsContent = ({ item }) => {

  return (
    <>
      <svg className='detailsContainer' src=".\src\assets\stock\Aviable.svg" alt="" />
      <h1 className='w-75 detailscntTitle'>{item.nombre}</h1>
      <h3>{item.precio}€</h3>

      <div className="d-flex w-50">
        <img src={`Layout/Stars/${Math.floor(item.rating)}stars.png`} alt="stars"
          style={{
            objectFit: 'contain'
          }}
        />
        <h5 className='px-1 text-warning'>{item.rating}</h5>
      </div>

      <div className="d-flex justify-content-start pt-1 pb-1 descuentosCnt">
        <div className="d-block-flex descuentos">
          <div className="">{Math.floor(item.precio * 0.90)}.00€</div>
          <div className="">50-100 pcs</div>
        </div>
        <div className="d-block-flex descuentos">
          <div className="">{Math.floor(item.precio * 0.70)}.00€</div>
          <div className="">100-700 pcs</div>
        </div>
        <div className="d-block-flex descuentos">
          <div className="">{Math.floor(item.precio * 0.50)}.00€</div>
          <div className="">700+ pcs</div>
        </div>
      </div>

      <div className="w-75 pt-3">
        <table>
          <tr className='line'>
            <td><h3 className="detailscntTxt">{traductor("price")}</h3></td> <td><h3 className="detailscntTxt">{item.negotiable ? traductor("negotiable") : traductor("non_negotiable")}</h3></td>
          </tr>
          <tr className='outline'>
            <td><h3 className="detailscntTxt">{traductor("type")}</h3></td> <td><h3 className="detailscntTxt">{traductor(item.subcategoria)}</h3></td>
          </tr>
          <tr>
            <td><h3 className="detailscntTxt">{traductor("material")}</h3></td> <td><h3 className="detailscntTxt">{traductor(item.material)}</h3></td>
          </tr>
          <tr className='line'>
            <td><h3 className="detailscntTxt">{traductor("design")}</h3></td> <td><h3 className="detailscntTxt">{traductor(item.diseño)}</h3></td>
          </tr>
          <tr className='outline'>
            <td><h3 className="detailscntTxt">{traductor("custom")}</h3></td> <td><h3 className="detailscntTxt">{item.customizable ? traductor("customizable") : traductor("non_customizable")}</h3></td>
          </tr>
          <tr>
            <td><h3 className="detailscntTxt">{traductor("protection")}</h3></td> <td><h3 className="detailscntTxt">{item.proteccion_reembolsos ? traductor("protected") : traductor("non_protected")}</h3></td>
          </tr>
          <tr>
            <td><h3 className="detailscntTxt">{traductor("warranty")}</h3></td> <td><h3 className="detailscntTxt">{traductor(item.garantia_anios)}</h3></td>
          </tr>
        </table>
      </div>
    </>
  );
};
