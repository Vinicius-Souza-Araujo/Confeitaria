package com.example.api.rest.dto;

import com.example.api.domain.entity.Endereco;
import com.example.api.domain.entity.User;
import com.example.api.domain.enums.StatusEndereco;
import jakarta.persistence.*;

public record EnderecoDTO(
        Long id,
        String cep,
        String logradouro,
        String complemento,
        String bairro,
        String localidade,
        String uf,
        StatusEndereco statusEndereco,
        Integer clienteId
) {

    public EnderecoDTO(Endereco endereco){
        this(endereco.getId(),
                endereco.getCep(),
                endereco.getLogradouro(),
                endereco.getComplemento(),
                endereco.getBairro(),
                endereco.getLocalidade(),
                endereco.getUf(),
                endereco.getStatusEndereco() ,
        endereco.getCliente().getId());
    }
}
