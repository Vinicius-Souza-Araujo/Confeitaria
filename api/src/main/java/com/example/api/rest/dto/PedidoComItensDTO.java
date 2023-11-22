package com.example.api.rest.dto;

import com.example.api.domain.entity.Endereco;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PedidoComItensDTO {

    private Integer IdCliente;

    private Integer numeroPedido;

    private String status;

    private List<ItensPedidoDTO> itens;

    private Long IdEndereco;
}
