import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GET_USERS} from '../../../Api';
import { UserContext } from '../../../UserContext';
import { useState } from 'react'
import './Backoffice.css'

export const Backoffice = () => {

    const user = React.useContext(UserContext);
    const [dataUser,setDataUser] = useState([]);
    const [filtro, setFiltro] = useState('');

    const navigate = useNavigate();
    

    const handleClick = (botao) => {
      
      if (botao === 'usuarios'){
        navigate('/UsuariosAdmin');
      } else if (botao === 'produtos'){
        navigate('/ProdutosAdmin');
      } else {
        console.log(botao);
      }
      
    }

    React.useEffect(() => {  
      getUsers();
    }, []);
    
    
    async function getUsers(){
        const {url, options} = GET_USERS(user.data.token, filtro);
        const response = await fetch(url, options);
    
        if (response.ok) {
            const userData = await response.json();
            setDataUser(userData);
        } else {
            console.error('Erro ao obter dados dos usuários');
        }
        
    }


  return (

    <>
    <div className='estrutura-back'>
    '   <div className='base-botoes'>
           
           <button className='botao-back' onClick={() => handleClick('usuarios')}> 
              <img className='icon-back' src="src\assets\usuario-icon.svg"/>
              Usuários
           </button>

           <button className='botao-back' onClick={() => handleClick('produtos')}> 
              <img className='icon-back' src="src\assets\novo-produto.svg"/>
              Produtos 
           </button>
           <button className='botao-back' onClick={() => handleClick('pedidos')}> 
              <img className='icon-back' src="src\assets\icon-pedidos.svg"/>
              Pedidos 
           </button>
        </div>
    </div>
        
    </>
   
  )
}
