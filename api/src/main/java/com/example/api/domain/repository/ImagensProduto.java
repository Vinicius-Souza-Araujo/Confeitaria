package com.example.api.domain.repository;

import com.example.api.domain.entity.ImagemProduto;
import com.example.api.domain.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImagensProduto extends JpaRepository<ImagemProduto, Integer> {
    ImagemProduto findByProdutoAndNome(Produto produto, String nomeDaImagem);

    List<ImagemProduto> findByProduto(Produto produto);
}
