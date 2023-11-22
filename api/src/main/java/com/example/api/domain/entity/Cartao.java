package com.example.api.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.time.YearMonth;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "cartao")
public class Cartao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_cartao", nullable = false)
    private Long numeroCartao;

    @Column(name = "codigo_verificador", nullable = false)
    private Integer codigoVerificador;

    @Column(name = "nome_completo", nullable = false, length = 255)
    private String nomeCompleto;

    @Column(name = "data_vencimento", nullable = false)
    private String dataVencimento;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User user;

    public Cartao(Long numeroCartao, Integer codigoVerificador, String nomeCompleto, String dataVencimento){
       this.numeroCartao = numeroCartao;
       this.codigoVerificador = codigoVerificador;
       this.nomeCompleto = nomeCompleto;
       this.dataVencimento = dataVencimento;
    };



}
