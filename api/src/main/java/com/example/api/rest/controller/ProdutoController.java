package com.example.api.rest.controller;


import com.example.api.domain.entity.Produto;
import com.example.api.domain.entity.User;
import com.example.api.domain.enums.Status;
import com.example.api.domain.repository.Produtos;
import com.example.api.domain.repository.Users;
import com.example.api.exception.Response;
import com.example.api.rest.dto.CadastrarProdutoDTO;
import com.example.api.rest.dto.DadosAtualizacaoProduto;
import com.example.api.rest.dto.DadosAtualizacaoProduto;
import jakarta.validation.Valid;
import org.springframework.data.domain.*;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos/")
public class ProdutoController {

    private Produtos repository;
    public ProdutoController(Produtos repository) {
        this.repository = repository;
    }

    @GetMapping()
    public Page<Produto> find(Produto filtro, @RequestParam(defaultValue = "0") int page){

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);


        Example<Produto> example = Example.of(filtro, matcher);
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        PageRequest pageable = PageRequest.of(page, 10, sort);

        return repository.findAll(example, pageable);
    }

    @PutMapping
    @Transactional
    public void atualizar (@RequestBody @Valid DadosAtualizacaoProduto dados){
        var produto = repository.getReferenceById(dados.id());
        produto.atualizarInformacoes(dados);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Response> criarProduto(@RequestBody @Valid CadastrarProdutoDTO dto) {

        Produto novoProduto = new Produto(
                dto.getNome(),
                dto.getAvaliacao(),
                dto.getQuantidade(),
                dto.getValor()
        );

        novoProduto.setStatus(Status.ATIVADO);
        repository.save(novoProduto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new Response(HttpStatus.CREATED, "Produto criado com sucesso."));

    }

}
