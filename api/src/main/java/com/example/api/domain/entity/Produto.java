package com.example.api.domain.entity;


import com.example.api.domain.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome", length = 255)
    @NotEmpty(message = "Campo nome é obrigatório.")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @NotNull(message = "Campo status é obrigatório")
    private Status status;

    @Column(name = "avaliacao")
    @NotEmpty(message = "Campo avaliacao é obrigatório.")
    @Min(value = 1, message = "A avaliação deve ser no mínimo 1.")
    @Max(value = 5, message = "A avaliação deve ser no máximo 5.")
    @Digits(integer = 1, fraction = 0, message = "A avaliação deve ter no máximo 1 dígito.")
    private Integer avaliacao;


    @Column(name = "quantidade")
    @NotEmpty(message = "Campo aquantidade é obrigatório.")
    @Min(value = 0, message = "A quantidade não pode ser negativa.")
    private Integer quantidade;

    @Column(name = "valor")
    @NotNull(message = "Campo valor é obrigatório.")
    @DecimalMin(value = "0.00", inclusive = true, message = "O valor não pode ser negativo.")
    private BigDecimal valor;


}
