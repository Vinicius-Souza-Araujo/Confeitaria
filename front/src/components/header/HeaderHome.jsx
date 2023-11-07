import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './Header.css';

const HeaderHome = () => {
  const { userLogout } = React.useContext(UserContext);
  const { data, login } = React.useContext(UserContext);
  const navigate = useNavigate('');

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

          {data.grupo === 'CLIENTE' && (
            <button onClick={() => { navigate('/pedidos') }} className='button'>
              <img src="src/assets/pedidos.png" alt='Meus pedidos' style={{ width: '25px', height: '25px'}}/>
              <span className='caption'>Meus pedidos</span>
            </button>
          )}

          {login && (
            <button onClick={handleLogout} className='button'>
              <img src="src\assets\sair.svg" alt='Sair' />
            </button>
          )}

          {data && data.grupo === 'CLIENTE' && (
            <button className="botao-alterar" onClick={() => navigate('/alterarCliente')}>
              <img src="src\assets\configuracao.png" alt="Alterar" />
            </button>
          )}

        </div>

      </nav>
    </header>
  )
}

export default HeaderHome