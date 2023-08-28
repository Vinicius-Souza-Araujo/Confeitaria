package com.example.api.rest.dto;

import com.example.api.domain.enums.StatusUser;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AtualizacaoStatusUserDTO {
    @NotEmpty(message = "Campo novoStatus é obrigatório.")
    @Pattern(regexp = "ATIVADO|DESATIVADO", message = "Grupo invalido. Valores aceitos são: ATIVADO, DESATIVADO")
    private String novoStatus;
}
