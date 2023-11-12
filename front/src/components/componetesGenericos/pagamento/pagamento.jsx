import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './pagamento.css'

export const Pagamento = () => {
  const [metodo, setMetodo] = useState('');
  const [confirmarPagamento, setConfirmarPagamento] = useState('');
  const [barcode, setBarcode] = useState('');  
  const [bandeira, setBandeira] = useState('');
  const [numero, setNumero] = useState('');
  const [codigoVerificador, setCodigoVerificador] = useState('');
  const [titular, setTitular] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [parcela, setParcela] = useState('');

  const handleMetodoPagamento= (event) => {
    setMetodo(event.target.value);
  };

  function gerarQRCode() {
        const barcodeDigits = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
    setBarcode(barcodeDigits);
  }

  const handleInputChange = (event) => {  
    const value = event.target.value;

    // Garante que apenas números são inseridos e limita o tamanho do CVV a 3 dígitos
    if (!isNaN(value) && value.length <= 3) {
      setCodigoVerificador(value);
    }
  };

  const handleExpiryChange = (e) => {
    const { value } = e.target;
    setVencimento(value);

    const dataAtual= new Date();

    const [mes, ano] = value.split('/');
    
    if (value.length === 5 && ano.length === 2 ) {
      const dataVencimento= new Date(`20${ano}`, mes- 1);

      setIsValid(dataVencimento> dataAtual&&
        mes> 0 &&        mes< 13);
    } else {
      setIsValid(true); // Reseta para válido se o formato estiver incorreto
    }
  };

  
  return (
    <div>
    <h1>Escolher forma de pagamento</h1>
    <p>Você pode efetuar o pagamento via boleto ou cartão de crédito em até 12x sem juros</p>

    <label htmlFor="forma">Selecione uma forma de pagamento</label>
    <label htmlFor="boleto">Boleto</label> 
    <input
          type="radio"
          id="boleto"
          value="boleto"
          checked={metodo === 'boleto'}
          onChange={handleMetodoPagamento}
          onClick={gerarQRCode}
        required />

    <label htmlFor="cartao">Cartão de crédito</label>
    <input
          type="radio"
          id="cartao"
          value="cartao"
          checked={metodo=== 'cartao'}
          onChange={handleMetodoPagamento}
        required />

{metodo === 'boleto' && (
        <div>
          <h1>Validar pedido final</h1>         
          <p>Seu boleto já está disponível. Você pode realizar o pagamento copiando o código de barras abaixo. O boleto será enviado via e-mail cadastrado em nosso sistema</p>

          <label>Código de barras:</label>
          <p>{barcode}</p>
    
        </div>
      )}

{metodo === 'cartao' && (
        <div>
          <h1>Preencha os dados do seu cartão de crédito</h1>
          <label htmlFor="bandeira">Bandeira do cartão</label>
          <select name="bandeira" id="bandeira" value={bandeira} 
            onChange={(event)=>setBandeira(event.target.value)} required>
              <option value="" disabled selected>Selecione uma opção</option>
              <option value="Hipercard">Hipercard</option>
              <option value="American Express">American Express</option>
              <option value="Elo">Elo</option>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
            </select>

            <label htmlFor="numero">Número do cartão</label>
            <InputMask
            mask="9999 9999 9999 9999" 
            maskChar={null} 
            value={numero} 
            onChange={(event)=>setNumero(event.target.value)}
        type="text" 
        id="numero"
        name="numero"
      placeholder="Insira o número do cartão"
        required />
      

      <label htmlFor="codigoVerificador">Código verificador</label>
      <input 
      type="text" 
      id="codigoVerificador" 
            value={codigoVerificador} 
            maxLength={3}            
            onChange={handleInputChange}
      placeholder="insira o código verificador de 3 dígitos" 
      required/>

<label htmlFor="titular">Nome do titular</label>
<input type="text" 
              id="titular" 
              value={titular} 
              onChange={(event)=>setTitular(event.target.value)} 
              placeholder="Insira o nome do titular como aparece no cartão"
                          required 
        />

<label htmlFor="vencimento">        Data de Vencimento (MM/AA)      </label>
<InputMask
        mask="99/99"
        maskChar="_"
   id="vencimento"
   value={vencimento}
        onChange={handleExpiryChange}
          placeholder="insira a data de vencimento no formato MM/AA"
        required/>
        
        {!isValid && (
        <p style={{ color: 'red' }}>
         Por favor insira uma data de vencimento válida
        </p>
      )}

<label htmlFor="parcela">Quantidade de parcelas</label>
          <select name="parcela" id="parcela" value={parcela}
            onChange={(event)=>setParcela(event.target.value)} required>
              <option value="" disabled selected>Selecione a quantidade de parcelas</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            </select>

        </div>
      )}



<button>Validar pedido final</button>


    </div>
  )
}
