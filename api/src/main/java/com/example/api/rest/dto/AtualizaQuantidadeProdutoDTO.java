package com.example.api.rest.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AtualizaQuantidadeProdutoDTO {

	@Min(value = 0, message = "a quantidade não pode ser negativa")
	@NotNull(message = "campo quantidade é obrigatório")
	private Integer quantidade;
}
