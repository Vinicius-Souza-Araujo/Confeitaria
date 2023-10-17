package com.example.api.rest.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CadastrarUserDTO {
    @NotEmpty(message = "Campo nome é obrigatorio.")
    private String nome;
    @NotEmpty(message = "Campo email é obrigatorio.")
    private String email;
    @NotEmpty(message = "Campo senha é obrigatorio.")
    private String senha;
    @NotEmpty(message = "Campo cpf é obrigatorio.")
    @Size(min = 11, max = 11, message = "CPF deve conter exatamente 11 caracteres.")
    private String cpf;
    @NotNull(message = "Campo grupo é Obrigatorio")
    @Pattern(regexp = "ADM|ESTOQUISTA|CLIENTE", message = "Grupo invalido. Valores aceitos são: ADM, ESTOQUISTA")
    private String grupo;
}
