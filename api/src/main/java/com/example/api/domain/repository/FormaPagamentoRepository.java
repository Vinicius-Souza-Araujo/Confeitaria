package com.example.api.domain.repository;

import com.example.api.domain.entity.Cartao;
import com.example.api.domain.entity.FormaPagamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormaPagamentoRepository extends JpaRepository<FormaPagamento, Long> {
}
