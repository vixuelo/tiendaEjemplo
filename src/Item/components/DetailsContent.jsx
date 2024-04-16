import React from 'react'

export const DetailsContent = ({item}) => {
  return (
    <>
    <img className='detailsContainer' src="src\assets\stock\Aviable.svg" alt="" />
    <h1 className='w-75 detailscntTitle'>{item.nombre}</h1>    <h3>{item.precio}€</h3>

    <div className="d-flex w-50">  
    <img src={`src/assets/Layout/Stars/${Math.floor(item.rating)}stars.png`} alt="stars" 
    style={{
      objectFit:'contain'
    }}
    />
    <h5 className='px-1  text-warning'>{item.rating}</h5>
    </div>.
    <img className="detailscntImg"src="src/assets/Layout/discount/Trade price.png" alt="" />
     <div className="w-75 pt-3">
     <table>
      <tr className='line'>
        <td><h3 className="detailscntTxt">price:</h3></td> <td><h3 className="detailscntTxt">{item.negotiable?'Negotiable':'Non Negotiable'}</h3></td>
      </tr>

      
      <tr className='outline'>
        <td><h3 className="detailscntTxt">type: </h3></td> <td><h3 className="detailscntTxt">{item.subcategoria}</h3></td>
      </tr>
      <tr>


      <td><h3 className="detailscntTxt">material: </h3></td> <td><h3 className="detailscntTxt">{item.material}</h3></td>
      </tr>
      
      <tr className='line'>


      <td><h3 className="detailscntTxt">design:</h3></td> <td><h3 className="detailscntTxt">{item.diseño}</h3></td>
      </tr>
      
      <tr className='outline'>


      <td><h3 className="detailscntTxt">custom: </h3></td> <td><h3 className="detailscntTxt">{item.customizable?'customizable':'Non customizable'}</h3></td>
      </tr>
      <tr>


      <td><h3 className="detailscntTxt">protection: </h3></td> <td><h3 className="detailscntTxt">{item.proteccion_reembolsos?'protected':'Non protected'}</h3></td>
      </tr>
      <tr>


      <td><h3 className="detailscntTxt">warranty: </h3></td> <td><h3 className="detailscntTxt">{item.garantia_anios}</h3></td>
      </tr>
    </table>
     </div>
     
    </>
    
  )
}
