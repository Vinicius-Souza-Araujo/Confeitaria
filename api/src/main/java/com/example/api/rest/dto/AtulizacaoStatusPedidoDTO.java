package com.example.api.rest.dto;

import com.example.api.domain.enums.StatusPedido;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AtulizacaoStatusPedidoDTO {
    private StatusPedido statusPedido;
}
