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

@Getter
@Setter
public class HistoricoPedidosDTO{

        private Long id;

        private BigDecimal valorTotal;

        private StatusPedido statusPedido;

        private LocalDate dataPedido;

        private Integer numeroPedido;

        private Endereco endereco;

        private FormaPagamento formaPagamento;

        public HistoricoPedidosDTO(Long id, BigDecimal valorTotal, StatusPedido statusPedido, LocalDate dataPedido, Integer numeroPedido) {
                this.id = id;
                this.valorTotal = valorTotal;
                this.statusPedido = statusPedido;
                this.dataPedido = dataPedido;
                this.numeroPedido = numeroPedido;
        }

        public HistoricoPedidosDTO(Long id, BigDecimal valorTotal, StatusPedido statusPedido, LocalDate dataPedido, Integer numeroPedido, FormaPagamento formaPagamento) {
                this.id = id;
                this.valorTotal = valorTotal;
                this.statusPedido = statusPedido;
                this.dataPedido = dataPedido;
                this.numeroPedido = numeroPedido;
                this.formaPagamento = formaPagamento;
        }

        public HistoricoPedidosDTO (Pedido pedido){
                this.id = pedido.getId();
                this.valorTotal = pedido.getValorTotal();
                this.statusPedido = pedido.getStatusPedido();
                this.dataPedido = pedido.getDataPedido();
                this.numeroPedido = pedido.getNumeroPedido();

        }
}
