import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalVariable } from '../../Context/MyContextProvider';
import { traductor } from '../../Traductor/traductor';

export const SellerInfo = ({ vendedor, search = false }) => {
  const { globalVariable, setGlobalVariable } = useGlobalVariable();
  const navigate = useNavigate();

  const searchSeller = () => {
    navigate(`/main?v=${vendedor.nombre}`);
  };

  return (
    <div className="d-block border p-2 rounded">
      <div className="d-inline-flex">
        <div className="lettervendor d-flex rounded text-info">{vendedor?.nombre[0]}</div>
        <div className=' d-block vendor'>
          <h4 className='d-flex justify-content-center'>{vendedor?.nombre}</h4>
        </div>
      </div>
      <hr />
      <h4 className="dataSeller d-flex justify-content-start">
        <img className='imgVendor' src={`Flags/${vendedor?.pais}/flag.svg`} alt="flag" />
        {`${vendedor?.pais},${vendedor?.ciudad}`}
      </h4>
      <h4 className="dataSeller"><img src="\src\assets\Layout\users\verified_user.png" alt="tV" /> {traductor("verified")}</h4>
      <h4 className="dataSeller"><img src="\src\assets\Layout\world\wwship.png" alt="tV" /> {traductor("Worldwide")}</h4>
      <div className="d-block justify-content-center">
        <button className="dataSeller w-100 btn btn-primary m-1 "><h3>{traductor("Send inquiry")}</h3></button>
        <br />
        {!search && <button className="dataSeller w-100 btn btn-secondary m-1" onClick={searchSeller}><h3>{traductor("Seller's profile")}</h3></button>}
      </div>
    </div>
  );
};
