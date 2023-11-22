package com.example.api.rest.dto;

import com.example.api.domain.entity.Endereco;
import com.example.api.domain.entity.FormaPagamento;
import com.example.api.domain.entity.Pedido;
import com.example.api.domain.entity.User;
import com.example.api.domain.enums.StatusPedido;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;


public record HistoricoPedidosDTO(

        Long id,

        BigDecimal valorTotal,

        StatusPedido statusPedido,

        LocalDate dataPedido,

        Integer numeroPedido,

        Long idFormaPagamento,

        Long idEndereco
) {

        public HistoricoPedidosDTO (Pedido pedido){
                this(
                        pedido.getId(),
                        pedido.getValorTotal(),
                        pedido.getStatusPedido(),
                        pedido.getDataPedido(),
                        pedido.getNumeroPedido(),
                        pedido.getFormaPagamento().getId(),
                        pedido.getEndereco().getId()
                        );
        }
}
