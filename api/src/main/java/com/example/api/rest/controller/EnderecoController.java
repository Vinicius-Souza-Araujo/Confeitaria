package com.example.api.rest.controller;

import com.example.api.rest.dto.EnderecoRequest;
import com.example.api.service.EnderecoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/endereco/")
public class EnderecoController {

    private final EnderecoService enderecoService;

    @GetMapping("/consulta")
    public ResponseEntity consultaCep(@RequestBody EnderecoRequest enderecoRequest){
        return ResponseEntity.ok(enderecoService.executa(enderecoRequest));
    }
}
