package com.example.api.domain.entity;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
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

//    public FormaPagamento(FormaDePagamentoDTO forma){
//        this(forma.getId(),
//                forma.getCartao(),
//                forma.getBoleto(),
//                forma.getParcelas()
//        );
//    }



}
