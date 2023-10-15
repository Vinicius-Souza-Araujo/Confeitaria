package com.example.api.rest.dto;

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

    Integer clientId;
}
