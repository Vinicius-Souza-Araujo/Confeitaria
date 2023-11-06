package com.example.api.rest.dto;

import com.example.api.domain.entity.FormaPagamento;
import com.example.api.domain.entity.Pedido;
import com.example.api.domain.entity.User;
import com.example.api.domain.enums.StatusPedido;

import java.math.BigDecimal;
import java.time.LocalDate;

public record HistoricoPedidosDTO(

        Long id,

        BigDecimal valorTotal,

        StatusPedido statusPedido,

        LocalDate dataPedido

) {

        public HistoricoPedidosDTO (Pedido pedido){
                this(
                        pedido.getId(),
                        pedido.getValorTotal(),
                        pedido.getStatusPedido(),
                        pedido.getDataPedido()
                        );
        }
}
