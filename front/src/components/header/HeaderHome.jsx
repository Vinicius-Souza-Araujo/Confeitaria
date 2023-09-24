import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './Header.css';

const HeaderHome = () => {
    const { userLogout } = React.useContext(UserContext);
    const { data, login } = React.useContext(UserContext);

    function handleLogout() {
        userLogout();
        
    }

  return (
    <header className='header'>
      <nav className='nav container'>
        
        
        <Link className='login'>
            {data.email}
        </Link>

        <div>
            <img src="src\assets\carrinho.png" alt='Carrinho' />

            {login && (
            <button onClick={handleLogout} className='button'>
                <img src="src\assets\sair.svg" alt='Sair' />
            </button>
            )}
        </div>
        
      </nav>
    </header>
  )
}

export default HeaderHome