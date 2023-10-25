package com.example.api.rest.dto;

import com.example.api.domain.entity.Endereco;
import com.example.api.domain.enums.Status;

import java.math.BigDecimal;

public record DadosAtualizacaoProduto(
        Integer id,
        String nome,
        Status status,
        BigDecimal avaliacao,
        Integer quantidade,
        BigDecimal valor) {
}
