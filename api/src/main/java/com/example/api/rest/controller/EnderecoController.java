package com.example.api.rest.controller;

import com.example.api.domain.entity.Endereco;
import com.example.api.domain.entity.User;
import com.example.api.domain.enums.GrupoUser;
import com.example.api.domain.enums.Status;
import com.example.api.domain.enums.StatusEndereco;
import com.example.api.domain.repository.EnderecoRepository;
import com.example.api.domain.repository.Users;
import com.example.api.exception.Response;
import com.example.api.rest.dto.CadastrarUserDTO;
import com.example.api.rest.dto.EnderecoRequest;
import com.example.api.rest.dto.NovoEnderecoDTO;
import com.example.api.service.EnderecoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/endereco")
public class EnderecoController {

    @Autowired
    private EnderecoRepository enderecoRepository;
    @Autowired
    private Users userRepository;

    private final EnderecoService enderecoService;

    @GetMapping("/consulta")
    public ResponseEntity consultaCep(@RequestBody EnderecoRequest enderecoRequest){
        System.out.println("aaaaaaaa");
        return ResponseEntity.ok(enderecoService.executa(enderecoRequest));
    }

    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Response> cadastrarEndereco(@RequestBody @Valid NovoEnderecoDTO dto){
        System.out.println(dto);

        User user = userRepository.findById(dto.getClientId()).orElse(null);

        Endereco novoEndereco = new Endereco(
                dto.getCep(),
                dto.getLogradouro(),
                dto.getComplemento(),
                dto.getBairro(),
                dto.getLocalidade(),
                dto.getUf(),
                user
        );
        novoEndereco.setStatusEndereco(StatusEndereco.ATIVADO);
        enderecoRepository.save(novoEndereco);

        return ResponseEntity.status(HttpStatus.CREATED).body(new Response(HttpStatus.CREATED, "Endereço cadastrado com sucesso."));
    }


}
