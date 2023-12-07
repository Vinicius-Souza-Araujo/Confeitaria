import React, { useState, useEffect, useContext } from "react";
import "./GerenciamentoPedidos.css";
import { UserContext } from "../../../../UserContext";
import { GET_PEDIDOS } from "../../../../Api";

const GerenciamentoPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const user = useContext(UserContext);
  const [detalhesPedido, setDetalhesPedido] = useState(null);
  const { data } = React.useContext(UserContext);

  useEffect(() => {
    getPedidos();
  }, []);

  function formatarData(data) {
    console.log(data);
    const dataObj = new Date(data);
    const dia = data.slice(-2);
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  async function getPedidos() {
    const { url, options } = GET_PEDIDOS(user.data.id);
    const response = await fetch(url, options);
    const pedidos = await response.json();
    setPedidos(pedidos);
  }

  const handleBuscar = () => {
    const pedidosFiltrados = pedidos.filter(
      (pedido) =>
        pedido.numeroPedido.toString().includes(filtro) ||
        pedido.dataPedido.includes(filtro)
    );
    setPedidos(pedidosFiltrados);
  };

  const toggleDetalhes = (pedido) => {
    console.log("detalhesPedido:", detalhesPedido);
    console.log("pedido:", pedido);
  
    if (detalhesPedido === pedido) {
      setDetalhesPedido(null);
    } else {
      setDetalhesPedido(pedido);
    }
  };
  

  return (
    <div id="gerenciamento-pedidos" className="gerenciamento-pedidos">
      <h1 className="titulo-principal">Meus Pedidos</h1>
      <h2 className="nome-cliente">Cliente: {data.email}</h2>
{/* 
      <label className="box-input-buscar">
        <input
          onChange={(event) => setFiltro(event.target.value)}
          className="input-buscar"
          placeholder="Buscar..."
        />
        <button className="botaoSummit" onClick={handleBuscar}>
          Buscar
        </button>
      </label> */}

      <div className="pedido-cards-container">
        {pedidos.map((pedido, index) => (
          <div className="pedido-card" key={index}>
            <div className="pedido-info">
              <p>Número do pedido: {pedido.numeroPedido}</p>
              <p>Data: {formatarData(pedido.dataPedido)}</p>
              <p>
                Valor Total:{" "}
                {(pedido.valorTotal || 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <button
                className="botaoAzul"
                onClick={() => toggleDetalhes(pedido)}
              >
                Detalhes
              </button>
            </div>

            {detalhesPedido === pedido && (
              <div className="pedido-detalhes">
                <div>
                  <p>Status do Pedido: {pedido.statusPedido}</p>
                  <p>-------------------------------------------------</p>
                </div>
                <div>
                  <p>Endereço de Entrega:</p>
                  <p>CEP: {pedido.endereco.cep}</p>
                  <p>Logradouro: {pedido.endereco.logradouro}</p>
                  <p>-------------------------------------------------</p>
                </div>
                <div>
                  <p>Forma de Pagamento:</p>
                  {pedido.formaPagamento.cartao && (
                   <p>Cartão: {pedido.formaPagamento && pedido.formaPagamento.cartao}</p>
                  )}
                  {pedido.formaPagamento.boleto && (
                    <div>
                      <p>Boleto</p>
                      <p>
                        Código de Barras:{" "}
                        {pedido.formaPagamento.boleto.numeroBoleto}
                      </p>
                    </div>
                  )}
                  {pedido.formaPagamento.parcelas && (
                    <p>Parcelas: {pedido.formaPagamento.parcelas}</p>
                  )}

                  <p>-------------------------------------------------</p>
                </div>
                <div>
                  <p>ID do Pedido: {pedido.id}</p>
                  <p>Número do Pedido: {pedido.numeroPedido}</p>
                  <p>Data do Pedido: {formatarData(pedido.dataPedido)}</p>
                  <p>
                    Valor Total:{" "}
                    {(pedido.valorTotal || 0).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
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
