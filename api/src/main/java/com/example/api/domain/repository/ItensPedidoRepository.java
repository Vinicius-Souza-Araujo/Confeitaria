package com.example.api.domain.repository;

import com.example.api.domain.entity.ItensPedido;
import com.example.api.domain.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItensPedidoRepository extends JpaRepository<ItensPedido, Integer> {

//    List<ItensPedido> saveAll(List<ItensPedido> itensPedidoList);

}
