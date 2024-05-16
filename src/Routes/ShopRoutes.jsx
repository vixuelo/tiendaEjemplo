import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainPage } from '../UI/Pages/MainPage'
import { ItemPage } from '../Item/Pages/ItemPage'
import { StorePage } from '../UI/Pages/StorePage'

export const ShopRoutes = () => {
  return (
    <Routes>
        <Route path="main" element={<MainPage/>}/>
        <Route path="item/:itemId" element={<ItemPage/>}/>
        <Route path="Findstore" element={<StorePage/>}/>
        
        </Routes>
  )
}
