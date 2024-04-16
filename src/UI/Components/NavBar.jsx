
import { Link, NavLink, useNavigate } from 'react-router-dom';


export const NavBar = () => {
    
    const navigate = useNavigate();
    const onclickItem=(event)=>{
      navigate(`/`);
  }

    return (
        <nav className=" btn-related-undefined nav navbar navbar-expand-sm   justify-content-around"
                style={{
                    background:'white',
                    height:'86px'
                }}>
                    <button className=" nav_img"
                        onClick={()=>onclickItem()}>
                    <img src='\src\assets\Layout\Brand\logo-colored.png' alt="icon" />

                    </button>
                    <div className=" " style={{width:'400px'}}>
                    <form className='nav_form d-flex align-items-center'>
                        <input className='nav_form_input form-control' type="text" />
                        <button className='nav_form_button btn btn-primary'
                        // style={{
                        //     padding:0,
                        //     border:'none',
                        //     width:'40px',height:'40px',
                        //     backgroundColor:'white',
                        //     backgroundRepeat:'no-repeat'}}
                            >Search</button>
                    </form>
                    </div>
        
     
        </nav>
    )
}
