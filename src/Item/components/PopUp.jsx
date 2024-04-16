import React, { useEffect, useState } from 'react'


export const PopUp=({image,close})=> {
    
  return (
    <>
    
      <div className="modal fade show"  style={{ display: 'block' }} >
        <div className="modal-dialog" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className="modal-content">
            
              
                <img src={image} className='galleryZoom' />
            <div className="modal-footer">
                <button onClick={()=>{close()}}>close</button>
            </div>
          </div>
        </div>
        </div>
  </>)

}