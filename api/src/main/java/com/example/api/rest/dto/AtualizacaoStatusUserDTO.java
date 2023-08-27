package com.example.api.rest.dto;

import com.example.api.domain.enums.StatusUser;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AtualizacaoStatusUserDTO {
    @NotEmpty(message = "Campo novoStatus é obrigatório.")
    private String novoStatus;




}
