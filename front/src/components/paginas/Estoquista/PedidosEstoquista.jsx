import React from 'react'
import { useEffect, useState } from 'react'
import { GET_PEDIDOS_SEM_FILTRO, PATCH_STATUS_PEDIDO } from '../../../Api'
import './Estoquista.css'

export const PedidosEstoquista = () => {
  
  useEffect(() => {  
    getPedidos();
  }, []);
  
  const [exibirStatus, setExibirStatus] = useState(false)
  const [novoStatus, setNovoStatus] = useState('')
  const [pedido, setPedido] = useState({
      id: '',
      NumeroPedido: '',
      DataPedido: '',
      StatusPedido: '',
      Total: ''
    }
  )
  
  const [pedidos, setPedidos] = useState([]);

  async function getPedidos(){
      const {url, options} = GET_PEDIDOS_SEM_FILTRO();
      const response = await fetch(url, options);  
      const pedidos = await response.json();
      const initialExibirStatus = pedidos.reduce((acc, pedido) => {
        acc[pedido.id] = false;
        return acc;
      }, {});

      setExibirStatus(initialExibirStatus);
  
      setPedidos(pedidos)
  }

  async function alterarStatus(idPedido){
    const {url, options} = PATCH_STATUS_PEDIDO({statusPedido: novoStatus}, idPedido);
    const response = await fetch(url, options);
    setExibirStatus(false)
    console.log(response)
  }

  const handleAlterar = (e) => {
    setNovoStatus(e.target.value);
  }

  
  const renderizarFormaPagamento = (formaPagamento) => {
    if (!formaPagamento) {
      return "Nenhuma informação de pagamento disponível";
    }
  
    if (formaPagamento.cartao) {
      return `Cartão`;
    } else if (formaPagamento.boleto) {
      return `Boleto`;
    }
  
    return "Método de pagamento desconhecido";
  };
  
  return (
    <div>
      <h1 className='titulo_rosa'>Pedidos</h1>
      <div className='estrutura-pedidos'>

      {pedidos.map((pedido, index) => (
          <div key={index} className='card-pedido-estoquista'>
            <h5>N° {pedido.numeroPedido} </h5>
            <p>Status: {pedido.statusPedido}</p>

            <p>Forma de pagamento: </p>

            <button onClick={() => setExibirStatus((prev) => ({ ...prev, [pedido.id]: true }))}>
              Alterar pedido
            </button>

            {exibirStatus[pedido.id] && (
              <div>
                <label htmlFor="novoStatus">Selecione novo status</label>
                <select name="novoStatus" id="novoStatus" onChange={(e) => handleAlterar(e)}>
                  <option value="" disabled> Selecione uma opção </option>
                  <option value="AGUARDANDO_PAGAMENTO">Aguardando Pagamento</option>
                  <option value="REJEITADO">Rejeitado</option>
                  <option value="SUCESSO">Sucesso</option>
                  <option value="AGUARDANDO_RETIRADA">Aguardando retirada</option>
                  <option value="EM_TRANSITO">Em trânsito</option>
                  <option value="ENTREGUE">Entregue</option>
                </select>

                <button className='botaoRosa' onClick={() => alterarStatus(pedido.id)}>Confirmar</button>
              </div>
            )}
          </div>
        ))}

      </div>
 
    </div>
  )
}
