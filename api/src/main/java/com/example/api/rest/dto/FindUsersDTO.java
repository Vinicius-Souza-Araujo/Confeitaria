package com.example.api.rest.dto;

import com.example.api.domain.entity.User;
import com.example.api.domain.enums.GrupoUser;
import com.example.api.domain.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record FindUsersDTO (
        Integer id,
         String nome,
         String email,
         String senha,
         String cpf,
         GrupoUser grupo,
         Status status
) {
    public FindUsersDTO(User user){
        this(user.getId(),
                user.getNome(),
                user.getEmail(),
                user.getSenha(),
                user.getCpf(),
                user.getGrupo(),
                user.getStatus());

    }
}
