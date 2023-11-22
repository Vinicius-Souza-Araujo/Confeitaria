import React, { useState } from 'react';
import { IMaskInput } from "react-imask";
import { useParams } from 'react-router-dom';
import { useCart } from '../../componetesGenericos/ItemCarrinho/CartContext';
import { POST_PAGAMENTO } from '../../../Api';
import iconpag from "../../../assets/icone-pag.svg"
import { useNavigate } from 'react-router-dom';
import './pagamento.css';

export const Pagamento = (props) => {
  const [metodo, setMetodo] = useState('');
  const [barcode, setBarcode] = useState('');
  const [bandeira, setBandeira] = useState('');
  const [numero, setNumero] = useState('');
  const [codigoVerificador, setCodigoVerificador] = useState('');
  const [titular, setTitular] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [parcela, setParcela] = useState('');
  const { cartState, clearCart, dispatch } = useCart();
  const [total, setTotal] = useState(cartState.totalValor);
  const [dataAtual, setDataAtual] = useState(new Date());
  const { idPedido } = useParams();


  async function enviadoPagamento(){
    if (metodo === 'boleto'){

      const dataFutura = new Date(dataAtual);
      dataFutura.setDate(dataAtual.getDate() + 3);
      
      const ano = dataFutura.getFullYear();
      const mes = String(dataFutura.getMonth() + 1).padStart(2, '0');
      const dia = String(dataFutura.getDate()).padStart(2, '0');
      
      const vencimentoBoleto = `${ano}-${mes}-${dia}`;
      
      const bodyBoleto ={
        boleto:{
          numeroBoleto: barcode,
          valor: total,
          dataVencimento: vencimentoBoleto,
        }
      }
    
      const {url, options} = POST_PAGAMENTO(bodyBoleto, idPedido);
      const response = await fetch(url, options)
      console.log(response)

    } else if (metodo === 'cartao'){
      
      const bodyCartao ={
        cartao:{
          numeroBoleto: numero,
          codigoVerificador: codigoVerificador,
          nomeCompleto: titular,
          dataVencimento: vencimento
        },
        parcelas: parcela
      }

      const {url, options} = POST_PAGAMENTO(bodyCartao, idPedido);
      const response = await fetch(url, options)
      console.log(response)

    } else{
        console.log('Forma de pagamento incorreto')
    }
  }

  const handleMetodoPagamento = (event) => {
    setMetodo(event.target.value);
  };

  const gerarQRCode = () => {
    const barcodeDigits = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
    setBarcode(barcodeDigits);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value.length <= 3) {
      setCodigoVerificador(value);
    }
  };

  const handleExpiryChange = (e) => {
    const { value } = e.target;
    setVencimento(value);

    const dataAtual = new Date();
    const [mes, ano] = value.split('/');

    if (value.length === 5 && ano.length === 2) {
      const dataVencimento = new Date(`20${ano}`, mes - 1);

      setIsValid(dataVencimento > dataAtual && mes > 0 && mes < 13);
    } else {
      setIsValid(true); // Reseta para válido se o formato estiver incorreto
    }
  };

  return (
  <main className='box-pag'>
    <article className='inner-pag'>
      <h2> <img src={iconpag}/>  Escolher forma de pagamento</h2>
      <p>Você pode efetuar o pagamento via boleto ou cartão de crédito em até 12x sem juros</p>

      <label htmlFor="metodoPagamento">Selecione a forma de pagamento</label>
        <select
          id="metodoPagamento"
          value={metodo}
          onChange={(event) => {
            handleMetodoPagamento(event);
            if (event.target.value === 'boleto') {
              gerarQRCode();
            }
          }}
          required
        >
          <option value="" disabled>Selecione uma opção</option>
          <option value="boleto">Boleto</option>
          <option value="cartao">Cartão de Crédito</option>
        </select>


      {metodo === 'boleto' && (
        <div className='form-boleto'>
          <h4>Validar pedido final</h4>
          <p>Seu boleto já está disponível. Você pode realizar o pagamento copiando o código de barras abaixo. O boleto será enviado via e-mail cadastrado em nosso sistema</p>

          <label>Código de barras:</label>
          <p>{barcode}</p>
        </div>
      )}

      {metodo === 'cartao' && (
        <div className='form-cartao'>
          <h5>*Preencha os dados do seu cartão de crédito</h5>
          <label htmlFor="bandeira">Bandeira do cartão</label>
          <select
            defaultValue=""
            name="bandeira"
            id="bandeira"
            value={bandeira}
            onChange={(event) => setBandeira(event.target.value)}
            required
          >
            <option value="" disabled>Selecione uma opção</option>
            <option value="Hipercard">Hipercard</option>
            <option value="American Express">American Express</option>
            <option value="Elo">Elo</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
          </select>

          <label htmlFor="numero">Número do cartão</label>
          <IMaskInput
            mask="0000 0000 0000 0000"
            value={numero}
            onChange={(event) => setNumero(event.target.value)}
            type="text"
            id="numero"
            name="numero"
            placeholder="Insira o número do cartão"
            required
          />

          <label htmlFor="codigoVerificador">Código verificador</label>
          <input
            type="text"
            id="codigoVerificador"
            value={codigoVerificador}
            maxLength={3}
            onChange={handleInputChange}
            placeholder="Insira o código verificador de 3 dígitos"
            required
          />

          <label htmlFor="titular">Nome do titular</label>
          <input
            type="text"
            id="titular"
            value={titular}
            onChange={(event) => setTitular(event.target.value)}
            placeholder="Insira o nome do titular como aparece no cartão"
            required
          />

          <label htmlFor="vencimento">Data de Vencimento (MM/AA)</label>
          <IMaskInput
            mask="00/00"
            id="vencimento"
            value={vencimento}
            onChange={handleExpiryChange}
            placeholder="Insira a data de vencimento no formato MM/AA"
            required
          />

          {!isValid && (
            <p style={{ color: 'red' }}>
              Por favor insira uma data de vencimento válida
            </p>
          )}

          <label htmlFor="parcela">Quantidade de parcelas</label>
          <select
            name="parcela"
            id="parcela"
            value={parcela}
            onChange={(event) => setParcela(event.target.value)}
            required
          >
            <option value="" disabled selected>Selecione a quantidade de parcelas</option>
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={(i + 1).toString()}>
                {(i + 1).toString()}
              </option>
            ))}
          </select>
        </div>
      )}
    <div className='box-button'>
      <button type="button" onClick={enviadoPagamento} id='botao-pag'>Confirmar pagamento</button>

    </div>

      
    </article>

  </main>
  );
};
