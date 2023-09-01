import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './Header.css';

const Header = () => {
    const { userLogout } = React.useContext(UserContext);
    const { data } = React.useContext(UserContext);

    function handleLogout() {
        userLogout();
        
    }

  return (
    <header className='header'>
      <nav className='nav container'>
        
        
        <Link className='login'>
            {data.email}
        </Link>

        <button onClick={handleLogout} className='button'>
            <img src="src\assets\sair.svg" alt='Sair' />
        </button>
      </nav>
    </header>
  )
}

export default Header