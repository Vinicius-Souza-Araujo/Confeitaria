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
        <div className='container-button'>

          <button className='button'>
            <img src="src\assets\estoque.svg" alt='Sair' width={30}/>Produtos</button>

          <button className='button'>
            <img src="src\assets\pedido.svg" alt='Sair' width={30}/>Pedidos</button>

          <button className='button'>
            <img src="src\assets\usuario.svg" alt='Sair' width={30}/>Perfil</button>

          <button onClick={handleLogout} className='button'>
            <img src="src\assets\sair.svg" alt='Sair' width={30}/>Logout</button>

        </div>
      </nav>
    </header>
  )
}

export default Header