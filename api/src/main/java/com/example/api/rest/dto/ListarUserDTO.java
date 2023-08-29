package com.example.api.rest.dto;

import com.example.api.domain.entity.User;
import com.example.api.domain.enums.GrupoUser;
import com.example.api.domain.enums.StatusUser;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public record ListarUserDTO (String nome, String email, StatusUser status, GrupoUser grupo){
    public ListarUserDTO(User user){
        this(user.getNome(), user.getEmail(), user.getStatus(), user.getGrupo());
    }
}
