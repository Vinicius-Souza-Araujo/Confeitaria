package com.example.api.domain.repository;

import com.example.api.domain.entity.Pedido;
import com.example.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
}
