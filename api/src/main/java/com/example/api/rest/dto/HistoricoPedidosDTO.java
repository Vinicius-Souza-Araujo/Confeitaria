package com.example.api.rest.dto;

import com.example.api.domain.entity.*;
import com.example.api.domain.enums.StatusPedido;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class HistoricoPedidosDTO{

        private Long id;

        private BigDecimal valorTotal;

        private StatusPedido statusPedido;

        private LocalDate dataPedido;

        private Integer numeroPedido;

        private Endereco endereco;

        private Long formaPagamentoid;

        private Cartao cartao;

        private Integer parcelas;

        private Boleto boleto;

        private List<ItensDoPedidoDTO> itensPedidos;

        private BigDecimal frete;

        public HistoricoPedidosDTO(Long id, BigDecimal valorTotal, StatusPedido statusPedido, LocalDate dataPedido, Integer numeroPedido) {
                this.id = id;
                this.valorTotal = valorTotal;
                this.statusPedido = statusPedido;
                this.dataPedido = dataPedido;
                this.numeroPedido = numeroPedido;
        }

        public HistoricoPedidosDTO(Long id, BigDecimal valorTotal, StatusPedido statusPedido, LocalDate dataPedido, Integer numeroPedido, Long formaPagamentoId) {
                this.id = id;
                this.valorTotal = valorTotal;
                this.statusPedido = statusPedido;
                this.dataPedido = dataPedido;
                this.numeroPedido = numeroPedido;
                this.formaPagamentoid = formaPagamentoId;

        }

        public HistoricoPedidosDTO (Pedido pedido){
                this.id = pedido.getId();
                this.valorTotal = pedido.getValorTotal();
                this.statusPedido = pedido.getStatusPedido();
                this.dataPedido = pedido.getDataPedido();
                this.numeroPedido = pedido.getNumeroPedido();

        }
}
