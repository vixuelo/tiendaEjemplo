import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getAllItems } from '../../Item/helpers/helpersItems';
import { DropDownCategories, DropDownSellers } from './DropDown';
import { traductor } from '../../Traductor/traductor';
import { useGlobalVariable } from '../../Context/MyContextProvider';

export const NavBar = () => {
    const { globalVariable, setGlobalVariable } = useGlobalVariable();

    const navigate = useNavigate();

    const onClickItem = () => {
        navigate(`/`);
    }
    const favPage=()=>{
        navigate(`/main?f=true`)
    }
    const { searchText, onInputChange } = useForm({
        searchText: '',
    });

    const onSearchSubmit = (event) => {
        event.preventDefault();
        if (searchText.trim() !== '') {
            console.log({ searchText });
            navigate(`/main?q=${searchText}`);
        }
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 999
          }}>
        <nav className="NavBar-nav btn-related-undefined nav navbar navbar-expand-sm justify-content-around" style={{ background: 'white', height: '86px' }}>
            <button className="navBar-btn-home nav_img" onClick={onClickItem}>
                <img src='\src\assets\Layout\Brand\logo-colored.png' alt="icon" />
            </button>
            
            <DropDownCategories/>
            <DropDownSellers/>
            <button className='btn btn-primary' onClick={()=>favPage()}>Favorites</button>
            <div style={{ width: '400px' }}>
                <form className='navBar-form nav_form d-flex align-items-center' onSubmit={onSearchSubmit}>
                    <input 
                        name='searchText'
                        value={searchText}
                        onChange={onInputChange}
                        onBlur={onInputChange}
                        className='nav_form_input form-control'
                        type="text"
                    />
                    <button className=' navBar-btn-search nav_form_button btn btn-primary'>{traductor("Search",globalVariable )}</button>
                </form>
            </div>
        </nav>
        </div>
    )
}
