package com.example.api.domain.entity;


import com.example.api.domain.enums.Status;
import com.example.api.rest.dto.DadosAtualizacaoProduto;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome", length = 255)
    @NotEmpty(message = "Campo nome é obrigatório.")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @NotNull(message = "Campo status é obrigatório")
    private Status status;

    @Column(name = "avaliacao")
    @NotNull(message = "Campo avaliacao é obrigatório.")
    @DecimalMin(value = "0.0", message = "A avaliação deve ser no mínimo 0.0.")
    @DecimalMax(value = "5.0", message = "A avaliação deve ser no máximo 5.0.")
    @Digits(integer = 1, fraction = 1, message = "A avaliação deve ter no máximo 1 dígito antes da vírgula e 1 dígito após a vírgula.")
    private BigDecimal avaliacao;


    @Column(name = "quantidade")
    @NotNull(message = "Campo aquantidade é obrigatório.")
    @Min(value = 0, message = "A quantidade não pode ser negativa.")
    private Integer quantidade;

    @Column(name = "valor")
    @NotNull(message = "Campo valor é obrigatório.")
    @DecimalMin(value = "0.00", inclusive = true, message = "O valor não pode ser negativo.")
    private BigDecimal valor;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImagemProduto> imagens;


    public Produto(String nome, BigDecimal avaliacao, Integer quantidade, BigDecimal valor) {
        this.nome = nome;
        this.avaliacao = avaliacao;
        this.quantidade = quantidade;
        this.valor = valor;
    }


    public void atualizarInformacoes(DadosAtualizacaoProduto dados) {
        if(dados.nome() != null)
            this.nome = dados.nome();

        if(dados.status() != null)
            this.status = dados.status();

        if(dados.avaliacao() != null)
            this.avaliacao = dados.avaliacao();

        if(dados.quantidade() != null)
            this.quantidade = dados.quantidade();

        if(dados.valor() != null)
            this.valor = dados.valor();

    }
}
