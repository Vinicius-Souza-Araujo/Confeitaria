package com.example.api.rest.dto;

import com.example.api.domain.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CadastrarProdutoDTO {


    @NotEmpty(message = "Campo nome é obrigatório.")
    private String nome;


    @NotNull(message = "Campo avaliacao é obrigatório.")
    @DecimalMin(value = "0.0", message = "A avaliação deve ser no mínimo 0.0.")
    @DecimalMax(value = "5.0", message = "A avaliação deve ser no máximo 5.0.")
    @Digits(integer = 1, fraction = 1, message = "A avaliação deve ter no máximo 1 dígito antes da vírgula e 1 dígito após a vírgula.")
    private BigDecimal avaliacao;



    @NotNull(message = "Campo aquantidade é obrigatório.")
    @Min(value = 0, message = "A quantidade não pode ser negativa.")
    private Integer quantidade;


    @NotNull(message = "Campo valor é obrigatório.")
    @DecimalMin(value = "0.00", inclusive = true, message = "O valor não pode ser negativo.")
    private BigDecimal valor;

}
