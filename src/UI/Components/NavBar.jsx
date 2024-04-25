import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const NavBar = () => {
    
    const navigate = useNavigate();

    const onClickItem = () => {
        navigate(`/`);
    }

    const { searchText, onInputChange } = useForm({
        searchText: '',
    });

    const onSearchSubmit = (event) => {
        event.preventDefault();
        if (searchText.trim() !== '') { // Trim para eliminar espacios en blanco al inicio y al final
            console.log({ searchText });
            navigate(`/main?q=${searchText}`);
        }
    }

    return (
        <nav className="btn-related-undefined nav navbar navbar-expand-sm justify-content-around" style={{ background: 'white', height: '86px' }}>
            <button className="nav_img" onClick={onClickItem}>
                <img src='\src\assets\Layout\Brand\logo-colored.png' alt="icon" />
            </button>
            <div style={{ width: '400px' }}>
                <form className='nav_form d-flex align-items-center' onSubmit={onSearchSubmit}>
                    <input 
                        name='searchText'
                        value={searchText}
                        onChange={onInputChange}
                        onBlur={onInputChange} // Añadimos onBlur para actualizar el estado cuando el usuario sale del campo de entrada
                        className='nav_form_input form-control'
                        type="text"
                    />
                    <button className='nav_form_button btn btn-primary'>Search</button>
                </form>
            </div>
        </nav>
    )
}
