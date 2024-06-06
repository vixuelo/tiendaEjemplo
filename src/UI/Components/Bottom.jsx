import React, { useEffect } from 'react';
import { DropDownLanguages } from './DropDown';
import { useGlobalVariable } from '../../Context/MyContextProvider';
import { traductor } from '../../Traductor/traductor';
import { useNavigate } from 'react-router-dom';

export const Bottom = () => {
  const navigate = useNavigate();
  const { globalVariable, setGlobalVariable } = useGlobalVariable();
  const handleClick = (page) => {
    navigate(`/${page.replace(" ", "")}`)
  }
  return (
    <>
      <footer className=''>
        <div className="vw-100 d-inline-block justify-content-end">
          <div className='d-flex flex-column  '>
            <div className="padding-footer row  ">
              <div className='col'  >
                <div className=""><img src="Layout\Brand\logo-colored.png" alt="" /></div>
                <div className="brandPhrase">{traductor("bussiness_info", globalVariable)}</div>
                <div className='d-flex flex-row' >
                  {/* <img src="Layout\social\social.png" alt="" /> */}
                  <a href="https://www.facebook.com/nttdataespana/">
                    <img src="Layout\social\facebook3.svg" alt="Facebook" />
                  </a>

                  <a href="https://twitter.com/NTTDataSpain?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                    <img src="Layout\social\twitter3.svg" alt="Twitter" />
                  </a>

                  <a href="https://es.linkedin.com/company/ntt-data-europe-latam">
                    <img src="Layout\social\linkedin3.svg" alt="LinkedIn" />
                  </a>

                  <a href="https://www.instagram.com/nttdata.espana/?hl=es">
                    <img src="Layout\social\instagram3.svg" alt="Instagram" />
                  </a>

                  <a href="https://www.youtube.com/c/nttdataeuropelatam">
                    <img src="Layout\social\youtube3.svg" alt="YouTube" />
                  </a>

                </div>
              </div>

              <div className="col-1 about">
                <h5 className='fw-bold'>{traductor("About", globalVariable)}</h5>
                <a className="btn btn-link" href="https://es.nttdata.com/insights/blog/ntt-data-inicia-una-nueva-era">
                  {traductor("About us", globalVariable)}
                </a>
                <button className="btn btn-link"
                  onClick={() => handleClick("Find store")}
                >
                  {traductor("Find store", globalVariable)}
                </button>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Categories")} */
                >
                  {traductor("Categories", globalVariable)}
                </button>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Blogs")} */
                >
                  {traductor("Blogs", globalVariable)}
                </button>
              </div>

              <div className="col-1 partner">
                <h5 className='fw-bold'>{traductor("Partnership", globalVariable)}</h5>
                <a className="btn btn-link" href="https://es.nttdata.com/insights/blog/ntt-data-inicia-una-nueva-era">
                  {traductor("About us", globalVariable)}
                </a>
                <button className="btn btn-link"
                  onClick={() => handleClick("Find store")}
                >
                  {traductor("Find store", globalVariable)}
                </button>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Categories")} */
                >
                  {traductor("Categories", globalVariable)}
                </button>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Blogs")} */
                >
                  {traductor("Blogs", globalVariable)}
                </button>
              </div>

              <div className="col-1 info">
                <h5 className='fw-bold'>{traductor("Help Center", globalVariable)}</h5>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Help Center")} */
                >
                  {traductor("Help Center", globalVariable)}
                </button>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Money Refund")} style={{paddingLeft:"10px"}} */
                >
                  {traductor("Money Refund", globalVariable)}
                </button>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Shipping")} */
                >
                  {traductor("Shipping", globalVariable)}
                </button>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Contact us")} */
                >
                  {traductor("Contact us", globalVariable)}
                </button>
              </div>

              <div className="col-1 users">
                <h5 className='fw-bold'>{traductor("For Users", globalVariable)}</h5>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Login")} */
                >
                  {traductor("Login", globalVariable)}
                </button>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Register")} */
                >
                  {traductor("Register", globalVariable)}
                </button>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("Settings")} */
                >
                  {traductor("Settings", globalVariable)}
                </button>
                <button className="btn btn-link"
                /* onClick={() =>handleClick("My order")} */
                >
                  {traductor("My order", globalVariable)}
                </button>
              </div>



              <div className="col-1 app">
                <h5 className='fw-bold'>{traductor("Get App", globalVariable)}</h5>
                {/* <img className="pb-2" src="GetApp\apple.png" alt="" /> */}
                <a href="https://apps.apple.com/es/developer/ntt-data/id1236266706">
                  <img className="pb-2" src="GetApp\AppStore.svg" alt="YouTube" />
                </a>
                <a href="https://play.google.com/store/apps/dev?id=6117871081971211022">
                  <img className="pb-2" src="GetApp\Android.svg" alt="YouTube" />
                </a>
              </div>
            </div>
          </div>
          <div className="footfooter w-100">
            <div className="w-100 px-5 pt-2 pb-2 d-inline-flex">
              <div className='w-50 justify-content-between'>© 2024 Ecommerce. </div>
              <DropDownLanguages />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
