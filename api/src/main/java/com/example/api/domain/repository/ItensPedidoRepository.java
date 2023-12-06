package com.example.api.domain.repository;

import com.example.api.domain.entity.ItensPedido;
import com.example.api.domain.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItensPedidoRepository extends JpaRepository<ItensPedido, Integer> {
    @Query("SELECT item FROM ItensPedido item WHERE item.pedido.id = :pedidoId")
    List<ItensPedido> findItensByPedidoId(@Param("pedidoId") Long pedidoId);
}
