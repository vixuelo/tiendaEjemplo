import Dropdown from 'react-bootstrap/Dropdown';
import { getAllBusiness, getAllItems } from '../../Item/helpers/helpersItems';
import { DropdownButton } from 'react-bootstrap';
import { useGlobalVariable } from '../../Context/MyContextProvider';
import { traductor } from '../../Traductor/traductor';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const subcategoriasUnicas = [...new Set(getAllItems().map(item => item.subcategoria))];
const idiomasUnicos = [...new Set(getAllBusiness().map(item => item.pais))];

const vendedoresUnicos = [...new Set(getAllBusiness().map(item => item.nombre))];
export const DropDownCategories = () => {
  const navigate = useNavigate();

  const handleNavigation = (subcategory) => {
    navigate(`/main?c=${subcategory}`);
  };

  return (
    <DropdownButton id="dropdown-basic" drop={'down'} title={traductor("Categories")}>
      <div className="d-flex flex-row">
        <div className="">
          {subcategoriasUnicas.slice(0, subcategoriasUnicas.length / 3).map((sub, index) =>
            <Dropdown.Item key={index} onClick={() => handleNavigation(sub)}>{sub}</Dropdown.Item>
          )}
        </div>
        <div className="">
          {subcategoriasUnicas.slice(subcategoriasUnicas.length / 3, 2 * subcategoriasUnicas.length / 3).map((sub, index) =>
            <Dropdown.Item key={index} onClick={() => handleNavigation(sub)}>{sub}</Dropdown.Item>
          )}
        </div>
        <div className="">
          {subcategoriasUnicas.slice(2 * subcategoriasUnicas.length / 3).map((sub, index) =>
            <Dropdown.Item key={index} onClick={() => handleNavigation(sub)}>{sub}</Dropdown.Item>
          )}
        </div>
      </div>
    </DropdownButton>
  );
};

export const DropDownSellers = () => {
  const navigate = useNavigate();

  const handleNavigation = (seller) => {
    navigate(`/main?v=${seller}`);
  };

  return (
    <DropdownButton id="dropdown-basic" drop={'down'} title={traductor('Sellers')}>
      {vendedoresUnicos.map((seller, index) =>
        <Dropdown.Item key={index} onClick={() => handleNavigation(seller)}>{seller}</Dropdown.Item>
      )}
    </DropdownButton>
  );
};

export const DropDownItemsNumber = ({ number = 5, setNumber, min = 1, max = 20 }) => {
  //console.log({ min, number });
  const [numero, setNumero] = useState(number);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setNumero(number);
  }, [number]);

  const setValue = (event) => {
    setNumero(event.target.value);
  };

  const handleDropdownToggle = (isOpen) => {
    //console.log({ numero, number });
    // isOpen indica si el dropdown está abierto o cerrado
    setIsOpen(isOpen);

    if (!isOpen) {
      // El dropdown se ha cerrado
      setNumber(numero);
      //console.log({ numero });
    }
  };

  return (
    <>
      <DropdownButton
        id="dropdown-number"
        drop={'down'}
        title={`mostrar ${numero}`}
        onToggle={handleDropdownToggle}
        show={isOpen} // Controla si el dropdown está abierto o cerrado
      >
        <input
          type="range"
          className="form-range"
          min={min}
          max={max}
          id="customRange2"
          value={numero}
          onChange={setValue}
        />
      </DropdownButton>
    </>
  );
};

export const DropDownLanguages = ({ setLanguaje }) => {
  //console.log({ idiomasUnicos })
  const { globalVariable, setGlobalVariable } = useGlobalVariable();
  const [flag, setFlag] = useState(() => {
    switch (globalVariable) {
      case "es":
        return "Spain";
      case "en":
        return "USA";
      case "de":
        return "Germany";
      case "fra":
        return "France";
      default:
        return "Unknown";
    }
  });

  const setlan = (lan) => {
    const flag = document.getElementById("flag")
    flag.src = `Flags/${lan}/flag.svg`
    switch (lan) {
      case "Spain":
        setGlobalVariable("es");
        break; case "Germany":
        setGlobalVariable("de");
        break; case "USA":
        setGlobalVariable("en");
        break; case "France":
        setGlobalVariable("fra");
        break;
    }
  }
  return (
    <div className='w-50  text-end d-flex  justify-content-end'>  <img id='flag' className='imgLan'

      src={`Flags/${flag}/flag.svg`} alt="" />
      <DropdownButton id="dropdown-basic" drop={'up'} title={traductor("languages")}>
        {idiomasUnicos.map((lan, index) => (
          <Dropdown.Item key={index} onClick={() => setlan(lan)}>
            {lan}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};