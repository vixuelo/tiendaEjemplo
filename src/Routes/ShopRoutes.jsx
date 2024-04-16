import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainPage } from '../UI/Pages/MainPage'
import { ItemPage } from '../Item/Pages/ItemPage'

export const ShopRoutes = () => {
  return (
    <Routes>
        <Route path="main" element={<MainPage/>}/>
        <Route path="item/:itemId" element={<ItemPage/>}/>
        
        </Routes>
  )
}
