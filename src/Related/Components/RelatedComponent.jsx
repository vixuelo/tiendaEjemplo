import React from 'react'
import { ListItem } from './ListItem'

export const RelatedComponent = ({items,item}) => {
 
  return (
    <div >
    <div className="d-flex">
   
      
      
    </div>
    <section className=' related container d-flex justify-content-center'>
    
        <ListItem items={items}item={item}/>
    </section>
    </div>
  )
}
