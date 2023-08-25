package com.example.api.rest.controller;

import com.example.api.domain.entity.User;
import com.example.api.domain.enums.StatusUser;
import com.example.api.domain.repository.Users;
import com.example.api.exception.UserNaoEncontradoException;
import com.example.api.rest.dto.AtualizacaoStatusUserDTO;
import jakarta.validation.Valid;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
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


}
