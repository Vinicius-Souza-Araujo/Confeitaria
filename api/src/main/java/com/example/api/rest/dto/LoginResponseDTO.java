package com.example.api.rest.dto;


import com.example.api.domain.enums.GrupoUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginResponseDTO {
    private String token;
    private String email;
    private GrupoUser grupo;

}
