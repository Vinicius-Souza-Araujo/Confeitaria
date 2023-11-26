import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../componetesGenericos/ItemCarrinho/CartContext';
import './Carrinho.css'

export const ResumoPedido = () => {
  const { cartState, clearCart, dispatch } = useCart();
  const totalFinal = parseFloat(cartState.frete) + parseFloat(cartState.totalValor)
  const navigate = useNavigate('')

  return (
    <div className='body-resumo'>
      <h2 className='titulo-resumo'>Resumo</h2>
      <div className='estrutura-resumo'>
        <h5 className='item-resumo'>Itens:</h5>

        {cartState.cartItems.map((item, index) => {
    
          return (
            <div key={index}>
              <div className='dados-textuais-item-resumo'>
                  <p>{item.nome}</p>

                  <p>
                    {(item.valor || 0).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>

                  <p>QTA: {item.quantidade}</p>
              </div>
            </div>
    );
  })}

        <div className='item-resumo'>
            <h5 className='sub-titulo-resumo'>SubTotal:</h5>
            <p>
              {(cartState.totalValor || 0).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                })}
            </p>
        </div>
        
      
        <div className='item-resumo'>
            <h5 className='sub-titulo-resumo'>Frete</h5>
            <p>
              {(cartState.frete || 0).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                })}
            </p>
        </div>

        <div className='item-resumo'>
          <h5 className='sub-titulo-resumo'>Forma de pagamento</h5>
          <p>{cartState.metodoPagamento}</p>
        </div>
      
        <div className='item-resumo'>
            <h5 className='sub-titulo-resumo'>Total</h5>
            <p>
              {(totalFinal || 0).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                })}
            </p>
        </div>

      
      </div>
    
      <button className='botaoRosa-resumo' onClick={() => navigate('/confirmacaoPedido')}>Confirmar compra</button>
    </div>
  )
}
