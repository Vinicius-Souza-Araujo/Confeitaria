package com.example.api.domain.entity;

import com.example.api.domain.enums.StatusPedido;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_pedido", columnDefinition = "SERIAL")
    private Integer numeroPedido;

    @Column(name = "valor_total", precision = 10, scale = 2, columnDefinition = "DECIMAL(10, 2) default 0.00")
    private BigDecimal valorTotal;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 255)
    private StatusPedido statusPedido;

    @Column(name = "data_pedido")
    private LocalDate dataPedido;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User usuario;

    @ManyToOne
    @JoinColumn(name = "forma_pagamento_id")
    private FormaPagamento formaPagamento;
}
