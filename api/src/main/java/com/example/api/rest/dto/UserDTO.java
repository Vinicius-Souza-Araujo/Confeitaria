package com.example.api.rest.dto;

import com.example.api.domain.entity.Endereco;
import com.example.api.domain.enums.Generos;
import com.example.api.domain.enums.Status;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {

    @NotEmpty(message = "Campo nome é obrigatorio.")
    private String nome;

    @NotEmpty(message = "Campo email é obrigatorio.")
    private String email;

    @NotEmpty(message = "Campo senha é obrigatorio.")
    private String senha;

    @NotEmpty(message = "Campo cpf é obrigatorio.")
    @Size(min = 11, max = 11, message = "CPF deve conter exatamente 11 caracteres.")
    private String cpf;

    private String genero;

    private String dataNascimento;

    private Endereco endereco;

    public UserDTO() {

    }
}
