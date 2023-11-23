package com.example.api.rest.dto;

import com.example.api.domain.entity.Boleto;
import com.example.api.domain.entity.Cartao;
import com.example.api.domain.entity.FormaPagamento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FormaPagamentoDTO {

    private Long id;

    private Cartao cartao;

    private Boleto boleto;

    private Integer parcelas;

    public FormaPagamentoDTO(FormaPagamento formaPagamento) {
        this(
                formaPagamento.getId(),
                formaPagamento.getCartao(),
                formaPagamento.getBoleto(),
                formaPagamento.getParcelas()
                );
    }

}
