import React from 'react'
import { BotaoAzul, BotaoSummit } from '../componetesGenericos/botoes/botoes'
import '../paginas/login.css'

const Login = () => {
  return (
    <>
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
                <img className="logo" src="/public/logo.png" alt="logo do site" />

                <div className='campos-formulario'>

                    <form>

                        <div className='username'>
                            <label className='subtitulo_branco' htmlFor="login"> Login </label>
                            <input className='input_linha' type="email" name="login" id="login" required />
                        </div>

                        <div className='password'>
                            <label className="subtitulo_branco" htmlFor="senha" > Senha </label>
                            <input className="input_linha" type="password" name="senha" id="senha" required/>
                        </div>

                        <div className='botoes-login'>
                            <BotaoAzul texto="Cadastrar"></BotaoAzul>
                            <BotaoSummit id="confirmar" texto="Confirmar"></BotaoSummit>
                        </div>

                    </form>

                </div>
               
            </div>

        </div>
       

    </>

  )
}

export default Login