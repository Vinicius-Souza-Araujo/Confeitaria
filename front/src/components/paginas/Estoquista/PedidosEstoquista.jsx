import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_PEDIDOS_SEM_FILTRO, PATCH_STATUS_PEDIDO } from "../../../Api";
import Header from '../../header/Header';
import "./Estoquista.css";

export const PedidosEstoquista = () => {
  const [exibirStatus, setExibirStatus] = useState(false);
  const [novoStatus, setNovoStatus] = useState("");

  const [pedido, setPedido] = useState({
    id: "",
    NumeroPedido: "",
    DataPedido: "",
    StatusPedido: "",
    Total: "",
  });

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getPedidos();
  }, []);

  async function getPedidos() {
    const { url, options } = GET_PEDIDOS_SEM_FILTRO();
    const response = await fetch(url, options);
    const pedidos = await response.json();
    const initialExibirStatus = pedidos.reduce((acc, pedido) => {
      acc[pedido.id] = false;
      return acc;
    }, {});

    setExibirStatus(initialExibirStatus);

    setPedidos(pedidos.slice().reverse());
  }

  async function alterarStatus(idPedido) {
    const { url, options } = PATCH_STATUS_PEDIDO(
      { statusPedido: novoStatus },
      idPedido
    );
    const response = await fetch(url, options);
    setExibirStatus(false);
    console.log(response);
    getPedidos();

  }

  const handleAlterar = (e) => {
    setNovoStatus(e.target.value);
  };



  return (
    <div>
       <Header />
      <h1 className="titulo_rosa">Pedidos</h1>
      <div className="estrutura-tab-PA">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>N° PEDIDO</th>
              <th>FORMA DE PAGAMENTO</th>
              <th>STATUS</th>
              <th>ESCOLHA O STATUS</th>
              <th>ALTERAR</th>
              <th>DETALHES</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => {
              return (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.numeroPedido}</td>
                  <td>
                    {pedido.formaPagamento &&
                      pedido.formaPagamento.cartao &&
                      !pedido.formaPagamento.boleto &&
                      "Cartão"}
                    {pedido.formaPagamento &&
                      !pedido.formaPagamento.cartao &&
                      pedido.formaPagamento.boleto &&
                      "Boleto"}
                    {(!pedido.formaPagamento ||
                      (!pedido.formaPagamento.cartao &&
                        !pedido.formaPagamento.boleto)) &&
                      "N/A"}
                  </td>

                  <td>{pedido.statusPedido}</td>

                  <td>
                    <div className="novoStatusPedido">
                      <label htmlFor="novoStatus">Selecione novo status</label>
                      <select
                        name="novoStatus"
                        id="novoStatus"
                        onChange={(e) => handleAlterar(e)}
                      >
                        <option value="" disabled>
                          {" "}
                          Selecione uma opção{" "}
                        </option>
                        <option value="AGUARDANDO_PAGAMENTO">
                          Aguardando Pagamento
                        </option>
                        <option value="REJEITADO">Rejeitado</option>
                        <option value="SUCESSO">Sucesso</option>
                        <option value="AGUARDANDO_RETIRADA">
                          Aguardando retirada
                        </option>
                        <option value="EM_TRANSITO">Em trânsito</option>
                        <option value="ENTREGUE">Entregue</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <button className="botaoAzul" onClick={() => alterarStatus(pedido.id)}>
                      Alterar pedido
                    </button>
                  </td>
                  <td>
                    <Link to='/detalhesPedidos'>
                        <button className="botaoRosa">Detalhes</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
