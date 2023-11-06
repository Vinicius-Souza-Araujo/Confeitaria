package com.example.api.rest.dto;

import com.example.api.domain.entity.Boleto;
import com.example.api.domain.entity.Cartao;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FormaDePagamentoDTO{
    private Long id;
    private Cartao cartao;
    private Boleto boleto;
    private Integer parcelas;
}
