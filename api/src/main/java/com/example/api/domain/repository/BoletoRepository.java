package com.example.api.domain.repository;

import com.example.api.domain.entity.Boleto;
import com.example.api.domain.entity.Cartao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoletoRepository extends JpaRepository<Boleto, Long> {
}
