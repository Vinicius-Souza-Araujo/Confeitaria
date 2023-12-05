import React, { useState, useEffect, useContext } from 'react';
import './GerenciamentoPedidos.css';
import { UserContext } from '../../../../UserContext';
import { GET_PEDIDOS } from '../../../../Api';

const GerenciamentoPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [filtro, setFiltro] = useState('');
    const user = useContext(UserContext);
    const [detalhesPedido, setDetalhesPedido] = useState(null);
    const { data } = React.useContext(UserContext);

    useEffect(() => {
        getPedidos();
    }, []);

    async function getPedidos() {
        const { url, options } = GET_PEDIDOS(user.data.id);
        const response = await fetch(url, options);
        const pedidos = await response.json();
        setPedidos(pedidos);
    }

    const handleBuscar = () => {
        const pedidosFiltrados = pedidos.filter((pedido) =>
            pedido.numeroPedido.toString().includes(filtro) ||
            pedido.dataPedido.includes(filtro)
        );
        setPedidos(pedidosFiltrados);
    };

    const toggleDetalhes = (pedido) => {
        if (detalhesPedido === pedido) {
            setDetalhesPedido(null);
        } else {
            setDetalhesPedido(pedido);
        }
    };

    return (
        <div id="gerenciamento-pedidos" className="gerenciamento-pedidos">
            <h1 className='titulo-principal'>Meus Pedidos</h1>
            <h2 className='nome-cliente'>Cliente: {data.email}</h2>

            <label className='box-input-buscar'>
                <input onChange={(event) => setFiltro(event.target.value)} className='input-buscar' placeholder='Buscar...' />
                <button className='botaoSummit' onClick={handleBuscar}>Buscar</button>
            </label>

            <div className='pedido-cards-container'>
                {pedidos.map((pedido, index) => (
                    <div className="pedido-card" key={index}>

                        <div className="pedido-info">
                            <p>Número do pedido: {pedido.numeroPedido}</p>
                            <p>Data: {pedido.dataPedido}</p>
                            <p>Valor total: {pedido.valorTotal}</p>
                            <button className='botaoAzul' onClick={() => toggleDetalhes(pedido)}>Detalhes</button>
                        </div>

                        {detalhesPedido === pedido && (
                            <div className="pedido-detalhes">
                                <div>
                                    <li>Status</li>
                                    {pedido.statusPedido}
                                    <p>-------------------------------------------------</p>
                                </div>
                                <div>
                                    <li>Endereço de entrega</li>
                                    {pedido.statusPedido}
                                    <p>-------------------------------------------------</p>
                                </div>
                                <div>
                                    <li>Forma de pagamento</li>
                                    {pedido.formaPagamento}
                                    <p>-------------------------------------------------</p>
                                </div>
                                <div>
                                    <li>Frete</li>
                                    {pedido.frete}
                                    <p>-------------------------------------------------</p>
                                </div>
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default GerenciamentoPedidos;
