import React, { useState } from 'react';
import { Document, Page } from '@react-pdf/renderer';
import RenderedRoute from '@react-pdf/renderer'

export const Pagamento = () => {
  const [metodo, setMetodo] = useState('');
  const [confirmarPagamento, setConfirmarPagamento] = useState('');
  const file = './pagamento/boletoEfetivacao.pdf';

  const handleMetodoPagamento= (event) => {
    setMetodo(event.target.value);
  };

  return (
    <div>
    <h1>Escolher forma de pagamento</h1>
    <p>Você pode efetuar o pagamento via boleto ou cartão de crédito em até 12x sem juros</p>
<form >
    <label htmlFor="forma">Selecione uma forma de pagamento</label>
    <label htmlFor="boleto">Boleto</label>
    <input
          type="radio"
          id="boleto"
          value="boleto"
          checked={metodo=== 'boleto'}
          onChange={handleMetodoPagamento}
        required />


    <label htmlFor="cartao">Cartão de crédito</label>
    <input
          type="radio"
          id="cartao"
          value="cartao"
          checked={metodo=== 'cartao'}
          onChange={handleMetodoPagamento}
        required />

{metodo=== 'boleto' && (
        <div>
          <h1>Informações para pagamento com boleto</h1>         
          <Document file={file}>
        {/* <Page pageNumber={1} /> */}
      </Document>
        </div>
      )}

{metodo=== 'cartao' && (
        <div>
          <h1>Informações para pagamento com cartão de crédito</h1>
        </div>
      )}

<button type="submit" id="enviar" >enviar</button>

</form>
    </div>
  )
}
