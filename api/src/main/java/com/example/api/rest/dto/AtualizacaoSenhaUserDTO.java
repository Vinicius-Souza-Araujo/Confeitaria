package com.example.api.rest.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AtualizacaoSenhaUserDTO {

    @NotEmpty(message = "Campo novaSenha é obrigatório.")
    private String novaSenha;
}
