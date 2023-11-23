import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Carrinho.css'

export const Confirmacao = () => {
    const navigate = useNavigate()

  return (
    <div className='estrutura-confir'>
        
        <div className='body-confirmado'>
            <img className='icon-confirme' src="src\assets\confirme.png" />
            <h1> Pedido Confirmado</h1>
        </div>

        <div className='voltar'>
                <button className='botaoRosa' onClick={() => navigate('/home')}>X</button>
        </div>
       
      
    </div>
  )
}
