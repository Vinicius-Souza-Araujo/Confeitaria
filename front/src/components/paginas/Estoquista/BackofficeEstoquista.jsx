import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GET_USERS} from '../../../Api';
import { UserContext } from '../../../UserContext';
import { useState } from 'react'


export const BackofficeEstoquista = () => {

    const user = React.useContext(UserContext);
    const [filtro, setFiltro] = useState('');

    const navigate = useNavigate();
    

    const handleClick = (botao) => {
      
      if (botao === 'produtos'){
        navigate('/ProdutoEstoque');
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
      <div className='base-botoes'>
           
           <button className='botao-back' onClick={() => handleClick('produtos')}> 
              <img className='icon-back' src="src\assets\novo-produto.svg"/>
              Produtos 
           </button>
    
        </div>
    </div>
        
    </>
   
  )
}
