package com.example.api.domain.entity;

import com.example.api.domain.enums.GrupoUser;
import com.example.api.domain.enums.StatusUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "usuarios")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome", length = 255)
    @NotEmpty(message = "Campo nome é obrigatório.")
    private String nome;

    @Column(name = "email", length = 255)
    @NotEmpty(message = "Campo email é obrigatório.")
    private String email;

    @Column(name = "senha", length = 255)
    @NotEmpty(message = "Campo senha é obrigatório.")
    private String senha;

    @Column(name = "cpf", length = 11)
    @NotEmpty(message = "Campo cpf é obrigatório.")
    private String cpf;
    @Enumerated(EnumType.STRING)
    @Column(name = "grupo")
    @NotNull(message = "Campo grupo é obrigatório")
    private GrupoUser grupo;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @NotNull(message = "Campo status é obrigatório")
    private StatusUser status;
}
