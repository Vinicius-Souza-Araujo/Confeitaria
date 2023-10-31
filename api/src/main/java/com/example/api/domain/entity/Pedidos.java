package com.example.api.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "pedidos")
public class Pedidos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_pedido")
    private Integer numeroPedido;

    @Column(name = "valor_total", precision = 10, scale = 2, columnDefinition = "DECIMAL(10, 2) default 0.00")
    private BigDecimal valorTotal;

    @Column(name = "status", length = 255)
    private String status;

    @Column(name = "data_pedido")
    private LocalDate dataPedido;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User usuario;

    @ManyToOne
    @JoinColumn(name = "forma_pagamento_id")
    private FormaPagamento formaPagamento;
}
