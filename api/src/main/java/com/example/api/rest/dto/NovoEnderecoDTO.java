package com.example.api.rest.dto;

import com.example.api.domain.enums.TipoDeEndereco;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NovoEnderecoDTO {
    String cep;
    String logradouro;
    String complemento;
    String bairro;
    String localidade;
    String uf;

    TipoDeEndereco tipo;

    Integer clientId;
}
