package com.example.api.rest.dto;

import com.example.api.domain.entity.ItensPedido;
import com.example.api.domain.entity.Pedido;
import com.example.api.domain.entity.Produto;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ItensDoPedidoDTO {

    private Long id;

    private Long pedido;

    private Integer produto;

    private Integer quantidade;

    private BigDecimal subtotal;

    public ItensDoPedidoDTO(ItensPedido itensPedido) {
        this.id = itensPedido.getId();
        this.pedido = itensPedido.getPedido().getId();
        this.produto = itensPedido.getProduto().getId();
        this.quantidade = itensPedido.getQuantidade();
        this.subtotal = itensPedido.getSubtotal();
    }
}
