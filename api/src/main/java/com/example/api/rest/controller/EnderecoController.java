package com.example.api.rest.controller;

import com.example.api.domain.entity.Endereco;
import com.example.api.domain.entity.User;
import com.example.api.domain.enums.GrupoUser;
import com.example.api.domain.enums.StatusEndereco;
import com.example.api.domain.repository.EnderecoRepository;
import com.example.api.domain.repository.UserRepository;
import com.example.api.domain.repository.UserRepository;
import com.example.api.exception.Response;
import com.example.api.exception.UserNaoEncontradoException;
import com.example.api.rest.dto.*;
import com.example.api.service.EnderecoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/endereco")
public class EnderecoController {

    private final EnderecoRepository enderecoRepository;
    @Autowired
    private UserRepository userRepository;

    private final EnderecoService enderecoService;

    @GetMapping("/consulta")
    public ResponseEntity consultaCep(@RequestBody EnderecoRequest enderecoRequest){
        return ResponseEntity.ok(enderecoService.executa(enderecoRequest));
    }


    // url aceitas = http://localhost:8080/api/endereco?id=5 (volta só o id) ou http://localhost:8080/api/endereco (pega toso enderecos)
    @GetMapping()
    public List<EnderecoDTO> listEndereco(@RequestParam(required = false) Integer idCliente){
        if (idCliente != null){
            return enderecoRepository.findByClienteId(idCliente).stream().map(EnderecoDTO::new).toList();
        }
        return enderecoRepository.findAll().stream().map(EnderecoDTO::new).toList();
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
                dto.getTipo(),
                user
        );
        novoEndereco.setStatusEndereco(StatusEndereco.ATIVADO);
        enderecoRepository.save(novoEndereco);

        return ResponseEntity.status(HttpStatus.CREATED).body(new Response(HttpStatus.CREATED, "Endereço cadastrado com sucesso."));
    }

    @PatchMapping("/atualizar/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody @Valid EnderecoDTO dto){

        enderecoRepository
                .findById(id)
                .map(endereco ->{
                    endereco.setCep(dto.cep());
                    endereco.setLogradouro(dto.logradouro());
                    endereco.setBairro(dto.bairro());
                    endereco.setLocalidade(dto.localidade());
                    endereco.setUf(dto.uf());
                    endereco.setStatusEndereco(dto.statusEndereco());
                    return enderecoRepository.save(endereco);
                }).orElseThrow(() -> new UserNaoEncontradoException());

        return ResponseEntity.status(HttpStatus.OK).body("Endereço atualizado com sucesso.");
    }


}
