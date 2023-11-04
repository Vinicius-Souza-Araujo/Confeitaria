package com.example.api.service;

import com.example.api.domain.entity.Pedido;
import com.example.api.domain.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    @Autowired
    public PedidoService(PedidoRepository pedidosRepository) {
        this.pedidoRepository = pedidosRepository;
    }

    public List<Pedido> getPedidosCliente(Integer clienteId) {
        return pedidoRepository.getPedidosCliente(clienteId);
    }
    public void cadastrarPedido(Pedido pedido) {
        pedidoRepository.save(pedido);
    }
}