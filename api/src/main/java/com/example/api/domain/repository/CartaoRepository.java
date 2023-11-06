package com.example.api.domain.repository;

import com.example.api.domain.entity.Cartao;
import com.example.api.domain.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartaoRepository extends JpaRepository<Cartao, Long> {

}
