import React from 'react';
import { BotaoAzul, BotaoSummit } from '../../componetesGenericos/botoes/botoes';
import { UserContext } from '../../../UserContext';
import Error from '../../../Helper/Error';
import { useNavigate } from 'react-router-dom';
import '../Login/login.css';

const Login = () => {

    const{userLogin, error, loading} = React.useContext(UserContext);

     const [email, setEmail] = React.useState('');
     const [senha, setSenha] = React.useState('');
     const navigate = useNavigate('');


     async function handleSubmit(event){
         event.preventDefault();
         userLogin(email,senha);
     }
    
  return (

        <div className='estrutura-form'>

            <div className='bem-vindo'>
                
                <p className='titulo_decorativo'>Bem vindo!</p>
               
                <figure className='imagens-decorativas'>
                    <div className="estrutura-donut">
                        <img className="donut" src="src\assets\donuts.png" alt="Imagem de donut de creme com cobertura de morango e confeite por cima" />
                        <img className="decorativo-donut" src="src\assets\forma.png" alt="Imagem decorativa" />
                    </div>
                </figure>
    
            </div>

            <div className='formulario'>
                <img className="logo_login" src="/public/logo.png" alt="logo do site" />

                <div className='campos-formulario'>

                    <form onSubmit={handleSubmit}>

                        <div className='username'>
                            <label className='subtitulo_branco' htmlFor="login"> Login </label>
                            <input onChange={(event) => setEmail(event.target.value)} className='input_linha input-personalizado' placeholder='Digite seu e-mail' type="email" name="login" id="login" required />
                        </div>

                        <div className='password'>
                            <label className="subtitulo_branco" htmlFor="senha" > Senha </label>
                            <input onChange={(event) => setSenha(event.target.value)} className="input_linha input-personalizado" type="password" name="senha" id="senha" placeholder='Digite sua senha' required/>
                        </div>

                        <div className='botoes-login'>
                            {
                               loading ? <BotaoSummit id="confirmar" disabled texto="Carregando..."></BotaoSummit> :
                               <BotaoSummit id="confirmar" texto="Confirmar"></BotaoSummit>
                            }
                           
                              <button className='botaoAzul' onClick={() => navigate('/cadastrarCliente')}>Cadastar</button>
                        </div>

                    </form >
                    <Error error={error} />
                  


                </div>
               
            </div>

        </div>

  )
}

export default Login