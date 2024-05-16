import React from 'react'
import { traductor } from '../../Traductor/traductor'

export const DescContent = ({item}) => {
  return (
    <div className=' d-block-flex border bg-white rounded m-1 p-5 h5'>
        <div className="detailscntTxt p-3 ">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.       

        </div>
    <table className='info m-4'>
    <tr>
      <th className="" scope="row">Model</th>
      <td>{item.referencia}</td>
    </tr>
    <tr>
      <th className=""scope="row">Material</th>
      <td>{traductor(item.material)}</td>
    </tr>
    <tr>
      <th className=""scope="row">design</th>
      <td >{traductor(item.diseño)}</td>
    </tr>
    </table>
    <br />
    <ul>
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus quasi natus enim!</li>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe ea nulla doloremque ipsa.</li>
    </ul>
</div>
  )
}
