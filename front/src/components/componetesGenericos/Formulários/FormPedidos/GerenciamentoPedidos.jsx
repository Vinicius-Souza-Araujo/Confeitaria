import React from 'react';
import './GerenciamentoPedidos.css';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../../UserContext';
import { GET_PEDIDOS, GET_FORMA_PAGAMENTO } from '../../../../Api';


const GerenciamentoPedidos = () => {

    const [pedidos, setPedidos] = useState([]);
    const [filtro, setFiltro] = useState('');
    const user = useContext(UserContext);
    const [detalhesPedido, setDetalhesPedido] = useState(null);
    const [formaPagamento, setFormaPagamento] = useState([]);
    const { data } = React.useContext(UserContext);

    useEffect(() => {
        getPedidos();
    }, []);

    async function getPedidos() {
        const { url, options } = GET_PEDIDOS(user.data.id);
        const response = await fetch(url, options);
        console.log(response)
        const pedidos = await response.json();
        setPedidos(pedidos);
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

    const handleBuscar = () => {
        const pedidosFiltrados = pedidos.filter((pedido) =>
            pedido.numero_pedido.toString().includes(filtro) ||
            pedido.data_pedido.includes(filtro)
        );
        setPedidos(pedidosFiltrados);
    }

    const toggleDetalhes = (pedido) => {
        if (detalhesPedido === pedido) {
            setDetalhesPedido(null); // Fecha os detalhes se já estiverem abertos.
        } else {
            setDetalhesPedido(pedido); // Abre os detalhes.
        }
    }

    async function pagamento (id){
        const { url, options } = GET_FORMA_PAGAMENTO(id);
        const response = await fetch(url, options);
        const pagamento = await response.json();
        return pagamento
    }

    return (

        <div id="gerenciamento-pedidos" className="gerenciamento-pedidos">

            <h1 className='titulo-principal'>Meus Pedidos</h1>
            <h2 className='nome-cliente'>Cliente: {data.email}</h2>

            <label className='box-input-buscar'>
                <input onChange={(event) => setFiltro(event.target.value)} className='input-buscar' placeholder='Buscar...' />
                <button className='botaoAzul' onClick={handleBuscar}>Buscar</button>
            </label>

            {pedidos.map((pedido, index) => (
                <div className="pedido-card" key={index}>
                    <div className="pedido-info">
                        <p>Número do pedido: {pedido.numeroPedido}</p>
                        <p>Data: {pedido.dataPedido}</p>
                        Total: {(pedido.valorTotal || 0).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                })}

                        <button onClick={() => toggleDetalhes(pedido)}>Detalhes</button>
                        <div>
                            {detalhesPedido === pedido && (
                                <div className="pedido-detalhes">
                                    <p>Status: {pedido.statusPedido}</p>
                                    <p>Endereço de entrega:
                                    </p>
                                    <p>Tipo: {pedido.endereco.tipo}</p>
                                    <p>{pedido.endereco.logradouro}, {pedido.endereco.bairro} - {pedido.endereco.cep}</p>
                                    <p>{pedido.endereco.localidade}</p>
                                    <p>Forma de pagamento: {renderizarFormaPagamento(pedido.formaPagamento)}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default GerenciamentoPedidos;
