package com.example.api.domain.repository;

import com.example.api.domain.entity.Pedido;
import com.example.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    @Query("SELECT p FROM Pedido p WHERE p.usuario.id = :clienteId")
    List<Pedido> getPedidosCliente(@Param("clienteId") Integer clienteId);
}
