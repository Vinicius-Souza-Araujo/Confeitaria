import React from 'react';
import './GerenciamentoPedidos.css';
import { useState, useEffect, useContext } from 'react';
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
        console.log(pedidos)
    }, []);

    async function getPedidos() {
        const { url, options } = GET_PEDIDOS(user.data.id);
        const response = await fetch(url, options);
        const pedidos = await response.json();
        console.log(pedidos);
        setPedidos(pedidos);
    }

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
                        <p>Valor total: {pedido.valorTotal}</p>

                        <button onClick={() => toggleDetalhes(pedido)}>Detalhes</button>
                        <div>
                            {detalhesPedido === pedido && (
                                <div className="pedido-detalhes">
                                    <p>Status: {pedido.statusPedido}</p>
                                    <p>Endereço de entrega:</p>
                                    <p>Forma de pagamento:</p>
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
