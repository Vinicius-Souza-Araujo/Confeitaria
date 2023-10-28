package com.example.api.rest.controller;

import com.example.api.domain.entity.Endereco;
import com.example.api.domain.entity.User;
import com.example.api.domain.enums.Generos;
import com.example.api.domain.enums.GrupoUser;
import com.example.api.domain.enums.Status;
import com.example.api.domain.enums.StatusEndereco;
import com.example.api.domain.repository.EnderecoRepository;
import com.example.api.domain.repository.UserRepository;
import com.example.api.exception.Response;
import com.example.api.exception.UserNaoEncontradoException;
import com.example.api.rest.dto.*;
import com.example.api.service.TokenServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenServiceImpl tokenService;

//    @Autowired
//    private EnderecoService enderecoService;

    @Autowired
    private EnderecoRepository enderecoRepository;
    private UserRepository repository;
    public UserController(UserRepository repository) {
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
                    user.setStatus(Status.valueOf(novoStatus));
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

    @PatchMapping("/atualizarCliente/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public ResponseEntity<String> updateCliente(@PathVariable Integer id, @RequestBody @Valid AtualizarClienteDTO dto){
        String novaSenha = new BCryptPasswordEncoder().encode(dto.getSenha());
        repository
                .findById(id)
                .map(user ->{
                    user.setNome(dto.getNome());
                    user.setDataNascimento(dto.getDataNascimento());
                    user.setSenha(novaSenha);
                    user.setGenero(dto.getGenero());
                    return repository.save(user);
                }).orElseThrow(() -> new UserNaoEncontradoException());

        return ResponseEntity.status(HttpStatus.OK).body("Cliente atualizado com sucesso.");
    }


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO dto){
        var usernamePassword = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getSenha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        User user = (User) auth.getPrincipal();

        if (user.getStatus() == Status.DESATIVADO) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("O usuário está inativo.");
        }

        var token = tokenService.generateToken((User)auth.getPrincipal());
        return ResponseEntity.ok( new LoginResponseDTO(token, user.getEmail(), user.getGrupo()));
    }

    @PostMapping("/cadastrar")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Response> cadastrarUsuario(@RequestBody @Valid CadastrarUserDTO dto){

        boolean emailExistente = repository.existsByEmail(dto.getEmail());
        boolean cpfExistente = repository.existsByCpf(dto.getCpf());

        if(emailExistente){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new Response(HttpStatus.CONFLICT, "E-mail já existe."));
        }
        if(cpfExistente){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new Response(HttpStatus.CONFLICT, "Cpf já existe."));

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

        novoUsuario.setStatus(Status.ATIVADO);
        repository.save(novoUsuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(new Response(HttpStatus.CREATED, "Usuário criado com sucesso."));
    }

    @PostMapping("/cadastrarCliente")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Response> cadastrarCliente(@RequestBody @Valid UserDTO cliente){
        boolean emailExistente = repository.existsByEmail(cliente.getEmail());
        boolean cpfExistente = repository.existsByCpf(cliente.getCpf());

        if(emailExistente){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new Response(HttpStatus.CONFLICT, "E-mail já existe."));
        }
        if(cpfExistente){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new Response(HttpStatus.CONFLICT, "Cpf já existe."));

        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(cliente.getSenha());


        Endereco enderecoNovoCliente = new Endereco(
                cliente.getEndereco()
        );

        LocalDate dataNascimento = LocalDate.parse(cliente.getDataNascimento(), DateTimeFormatter.ISO_DATE);
        Generos genero = Generos.valueOf(cliente.getGenero());


        User novoCliente = new User(
                cliente.getNome(),
                cliente.getEmail(),
                encryptedPassword,
                cliente.getCpf(),
                genero,
                dataNascimento
        );

        enderecoNovoCliente.setStatusEndereco(StatusEndereco.ATIVADO);
        enderecoNovoCliente.setCliente(novoCliente);

        novoCliente.setStatus(Status.ATIVADO);
        novoCliente.setGrupo(GrupoUser.CLIENTE);
        repository.save(novoCliente);
        enderecoRepository.save(enderecoNovoCliente);

        return ResponseEntity.status(HttpStatus.CREATED).body(new Response(HttpStatus.CREATED, "Usuário criado com sucesso."));
    }

//    @GetMapping()
//    public List<User> find(User filtro){
//        System.out.println(filtro.toString());
//        ExampleMatcher matcher = ExampleMatcher.matching()
//                .withIgnoreCase()
//                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
//
//        Example example = Example.of(filtro, matcher);
//        List<User> lista = repository.findAll(example);
//
//        if( lista == null || lista.isEmpty())
//            System.out.println("LISTA_VAZIA");
//        return lista;
//    }

    @GetMapping()
    public ResponseEntity<List<FindUsersDTO>> find(@RequestParam(required = false) String nome){
        List<FindUsersDTO> usuarios;

        if( nome != null && !nome.isEmpty()){
            usuarios = repository.findByNomeContainingIgnoreCase(nome).stream().map(FindUsersDTO::new).toList();;
        }else{
            usuarios = repository.findAll().stream().map(FindUsersDTO::new).toList();
        }
        return ResponseEntity.ok(usuarios);
    }


    @GetMapping("/cliente/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
        Optional<User> userOptional = repository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getGrupo() == GrupoUser.CLIENTE) {
                UserDTO userDTO = new UserDTO();
                userDTO.setNome(user.getNome());
                userDTO.setEmail(user.getEmail());
                userDTO.setCpf(user.getCpf());
                userDTO.setGenero(user.getGenero().toString());
                userDTO.setDataNascimento(user.getDataNascimento().toString());
                return ResponseEntity.ok(userDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
