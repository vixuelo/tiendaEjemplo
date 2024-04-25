import React, { useEffect } from 'react'
import { ListItem } from './ListItem'
import { useState } from 'react';

export const RelatedComponent = ({ cookies,item}) => {
  useEffect(() => {
   console.log("Debug predicciones10 en Related")
   console.log(cookies)
   console.log("Fin predicciones10 en Related")
  }, [cookies])
  
  return (
    <div >
    <div className="d-flex">

      
      
    </div>
    <section className=' related container d-flex justify-content-center'>
    
        <ListItem items={cookies} item={item} />
    </section>
    </div>
  )
}


