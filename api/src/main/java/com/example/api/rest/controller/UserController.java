package com.example.api.rest.controller;

import com.example.api.domain.entity.User;
import com.example.api.domain.enums.GrupoUser;
import com.example.api.domain.enums.StatusUser;
import com.example.api.domain.repository.Users;
import com.example.api.exception.UserNaoEncontradoException;
import com.example.api.rest.dto.AtualizacaoStatusUserDTO;
import com.example.api.rest.dto.CadastrarUserDTO;
import jakarta.validation.Valid;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private Users repository;
    public UserController(Users repository) {
        this.repository = repository;
    }




    @PatchMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateStatus(@PathVariable Integer id, @RequestBody @Valid AtualizacaoStatusUserDTO dto){
        String novoStatus = dto.getNovoStatus();
        repository
                .findById(id)
                .map(user ->{
                    user.setStatus(StatusUser.valueOf(novoStatus));
                    return repository.save(user);
                }).orElseThrow(() -> new UserNaoEncontradoException());

    }
        @PostMapping("/cadastrar")
        @ResponseStatus(HttpStatus.CREATED)
        public ResponseEntity<String> cadastrarUsuario(@RequestBody @Valid CadastrarUserDTO dto){
            boolean emailExistente = repository.existsByEmail(dto.getEmail());
            boolean cpfExistente = repository.existsByCpf(dto.getCpf());
            if(emailExistente){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já existe.");
            }
            if(cpfExistente){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Cpf já existe.");
            }
            GrupoUser grupo= GrupoUser.valueOf(dto.getGrupo());
            User novoUsuario = new User(
                    dto.getNome(),
                    dto.getEmail(),
                    dto.getSenha(),
                    dto.getCpf(),
                    grupo
            );
            novoUsuario.setStatus(StatusUser.ATIVADO);
            repository.save(novoUsuario);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário criado com sucesso.");
        }
}
