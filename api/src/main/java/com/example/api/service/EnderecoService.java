package com.example.api.service;

import com.example.api.rest.dto.EnderecoRequest;
import com.example.api.rest.dto.EnderecoResponse;
import com.example.api.rest.feign.EnderecoFeign;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnderecoService {
    private final EnderecoFeign enderecoFeign;

    public EnderecoResponse executa(EnderecoRequest request){
        return enderecoFeign.buscaEnderecoCep(request.getCep());
    }
}
