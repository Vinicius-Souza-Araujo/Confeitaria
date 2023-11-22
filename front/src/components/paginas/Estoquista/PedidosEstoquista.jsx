import React from 'react'
import { useEffect, useState } from 'react'
import { GET_PEDIDOS_SEM_FILTRO, PATCH_STATUS_PEDIDO } from '../../../Api'

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
  
  const [pedidos, setPedidos] = useState([])

  async function getPedidos(){
      const {url, options} = GET_PEDIDOS_SEM_FILTRO();
      const response = await fetch(url, options);  
  }

  async function alterarStatus(idPedido){
    const {url, options} = PATCH_STATUS_PEDIDO({statusPedido: novoStatus}, idPedido);
    const response = await fetch(url, options);
  }

  const handleAlterar = (e, idPedido) => {
    setNovoStatus(e.target.value);
    alterarStatus(idPedido)
  }

  return (
    <div>
      <h1 className='titulo_rosa'>Pedidos</h1>
      <div className='estrutura-pedidos'>
        {pedidos.map((pedido, index) => {
          <div Key={index} className='card-pedido-estoquista'>
              <h5>N° {pedido.NumeroPedido} </h5>
              <p>Status: {pedido.StatusPedido}</p>
              <button onClick={() => setExibirStatus(true)}>Alterar pedido</button>
              
              {exibirStatus && (
                <div>
                    <label htmlFor="novoStatus">Selecione novo status</label>
                    <select name="novoStatus" id="novoStatus" onChange={handleAlterar(event, pedido.idPedido)}>
                      <option value="" disabled> Selecione uma opção </option>
                      <option value="AGUARDANDO_PAGAMENTO">Aguardando Pagamento</option>
                      <option value="REJEITADO">Rejeitado</option>
                      <option value="SUCESSO">Sucesso</option>
                      <option value="AGUARDANDO_RETIRADA">Aguardando retirada</option>
                      <option value="EM_TRANSITO">Em transito</option>
                      <option value="ENTREGUE">Entregue</option>
                    </select>
                </div>
              )}
          </div>
        })}
      </div>
 
    </div>
  )
}
