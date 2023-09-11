package com.example.api.rest.dto;

import com.example.api.domain.entity.Produto;
import com.example.api.domain.entity.ImagemProduto;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProdutoComImagemDTO {
    private Integer id;
    private String nome;
    private String status;
    private BigDecimal avaliacao;
    private Integer quantidade;
    private BigDecimal valor;
    private String imagemNome;

    public ProdutoComImagemDTO(Produto produto, ImagemProduto imagemProduto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.status = produto.getStatus().toString();
        this.avaliacao = produto.getAvaliacao();
        this.quantidade = produto.getQuantidade();
        this.valor = produto.getValor();
        this.imagemNome = imagemProduto != null ? imagemProduto.getNome() : null;
    }
}