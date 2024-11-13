import React, { useContext } from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const {user} = useContext(AuthContext);

  return (
    <nav className='navbar'>
        <div className='nav-container'>
            <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
              <span className='logo'>Hotello</span>
            </Link>

            {!user &&
              <div className='nav-items'>
                <button className='nav-button'>Register</button>
                <button className='nav-button'>Login</button>
              </div>
            }
        </div>
    </nav>
  )
}

export default Navbar