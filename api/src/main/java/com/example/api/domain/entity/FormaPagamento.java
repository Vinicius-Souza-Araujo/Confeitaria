package com.example.api.domain.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@Table(name = "forma_pagamento")
public class FormaPagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cartao_id")
    private Cartao cartao;

    @ManyToOne
    @JoinColumn(name = "boleto_id")
    private Boleto boleto;

    @Column(name = "parcelas")
    private Integer parcelas;
}
