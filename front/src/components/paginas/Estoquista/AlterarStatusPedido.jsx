import React, { useState } from "react";
import { PATCH_STATUS_PEDIDO } from "../../../Api";
import { useLocation } from "react-router-dom";

export const AlterarStatusPedido = () => {
  const [novoStatus, setNovoStatus] = useState("");
  const { state } = useLocation();
  console.log("State:", state);
  const pedido = state?.pedido || {};
  console.log("Pedido:", pedido);

  const [exibirStatus, setExibirStatus] = useState(false);

  const handleAlterar = (e) => {
    setNovoStatus(e.target.value);
  };

  async function alterarStatus(idPedido) {
    console.log(pedido);
    const { url, options } = PATCH_STATUS_PEDIDO(
      { statusPedido: novoStatus },
      idPedido
    );
    const response = await fetch(url, options);
    setExibirStatus(false);
    console.log(response);
  }

  return (
    <div>
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
        <option value="AGUARDANDO_PAGAMENTO">Aguardando Pagamento</option>
        <option value="REJEITADO">Rejeitado</option>
        <option value="SUCESSO">Sucesso</option>
        <option value="AGUARDANDO_RETIRADA">Aguardando retirada</option>
        <option value="EM_TRANSITO">Em trânsito</option>
        <option value="ENTREGUE">Entregue</option>
      </select>

      <button className="botaoRosa" onClick={() => alterarStatus(pedido.id)}>
        Confirmar
      </button>
    </div>
  );
};
