package com.example.api.rest.dto;

import com.example.api.domain.enums.Generos;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AtualizarClienteDTO {
    private String nome;

    private LocalDate dataNascimento;

    private String senha;

    private Generos genero;
}
