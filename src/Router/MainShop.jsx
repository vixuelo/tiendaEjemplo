import React, { useState } from 'react'
import { NavBar } from '../UI/Components/NavBar'
import { MainPage } from '../UI/Pages/MainPage'
import { RelatedComponent } from '../Related/Components/RelatedComponent'
import { Bottom } from '../UI/Components/Bottom'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { ShopRoutes } from '../Routes/ShopRoutes'

export const MainShop = () => {

  return (
       <>
       <Routes>
               <Route path="/" element={<Navigate to="main"/>}/>
            <Route path='/*' element={<ShopRoutes/>}/>

       </Routes>
  </>
  )
}
