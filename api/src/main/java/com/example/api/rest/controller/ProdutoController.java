package com.example.api.rest.controller;


import com.example.api.domain.entity.Produto;
import com.example.api.domain.entity.User;
import com.example.api.domain.repository.Produtos;
import com.example.api.domain.repository.Users;
import com.example.api.rest.dto.DadosAtualizacaoProduto;
import com.example.api.rest.dto.DadosAtualizacaoProduto;
import jakarta.validation.Valid;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private Produtos repository;
    public ProdutoController(Produtos repository) {
        this.repository = repository;
    }

    @GetMapping()
    public List<Produto> find(Produto filtro){

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        Example example = Example.of(filtro, matcher);
        return repository.findAll(example);
    }

    @PutMapping
    @Transactional
    public void atualizar (@RequestBody @Valid DadosAtualizacaoProduto dados){
        var produto = repository.getReferenceById(dados.id());
        produto.atualizarInformacoes(dados);
    }
}
