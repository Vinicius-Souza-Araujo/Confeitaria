package com.example.api.rest.controller;

import com.example.api.domain.entity.User;
import com.example.api.domain.enums.GrupoUser;
import com.example.api.domain.enums.StatusUser;
import com.example.api.domain.repository.Users;
import com.example.api.exception.UserNaoEncontradoException;
import com.example.api.rest.dto.*;
import com.example.api.service.TokenServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenServiceImpl tokenService;

    private Users repository;
    public UserController(Users repository) {
        this.repository = repository;
    }

    @PatchMapping("atualizar/status/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void updateStatus(@PathVariable Integer id, @RequestBody @Valid AtualizacaoStatusUserDTO dto){
        String novoStatus = dto.getNovoStatus();
        repository
                .findById(id)
                .map(user ->{
                    user.setStatus(StatusUser.valueOf(novoStatus));
                    return repository.save(user);
                }).orElseThrow(() -> new UserNaoEncontradoException());

    }

    @PatchMapping("atualizar/senha/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void updateSenha(@PathVariable Integer id, @RequestBody @Valid AtualizacaoSenhaUserDTO dto){
        String novoSenha = new BCryptPasswordEncoder().encode(dto.getNovaSenha());
        repository
                .findById(id)
                .map(user ->{
                    user.setSenha(novoSenha);
                    return repository.save(user);
                }).orElseThrow(() -> new UserNaoEncontradoException());

    }

    @PatchMapping("atualizar/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody @Valid AtualizacaoDTO dto){

        String cpfAtual = repository.findCpfById(id);
        if(repository.existsByCpf(dto.getCpf()) && !cpfAtual.equals(dto.getCpf())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cpf já existe.");
        }



        repository
                .findById(id)
                .map(user ->{
                    user.setGrupo(GrupoUser.valueOf(dto.getGrupo()));
                    user.setNome(dto.getNome());
                    user.setCpf(dto.getCpf());
                    return repository.save(user);
                }).orElseThrow(() -> new UserNaoEncontradoException());

        return ResponseEntity.status(HttpStatus.OK).body("Usuário atualizado com sucesso.");
    }


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO dto){
        var usernamePassword = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getSenha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        User user = (User) auth.getPrincipal();

        if (user.getStatus() == StatusUser.DESATIVADO) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("O usuário está inativo.");
        }

        var token = tokenService.generateToken((User)auth.getPrincipal());
        return ResponseEntity.ok( new LoginResponseDTO(token));
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

        String encryptedPassword = new BCryptPasswordEncoder().encode(dto.getSenha());
            GrupoUser grupo= GrupoUser.valueOf(dto.getGrupo());

            User novoUsuario = new User(
                    dto.getNome(),
                    dto.getEmail(),
                    encryptedPassword,
                    dto.getCpf(),
                    grupo
            );

            novoUsuario.setStatus(StatusUser.ATIVADO);
            repository.save(novoUsuario);

            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário criado com sucesso.");
        }
        @GetMapping("/listar")
        @ResponseStatus(HttpStatus.OK)
        public List<ListarUserDTO> listUser () {
        return repository.findAll().stream().map(ListarUserDTO::new).toList();
        }

        @GetMapping("/listar/{nome}")
        public List<ListarUserDTO> listarUsuarioPeloNome(@PathVariable String nome){
            return repository.findByNome(nome).stream().map(ListarUserDTO::new).toList();
        }

}
