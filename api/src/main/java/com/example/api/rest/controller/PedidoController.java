package com.example.api.rest.controller;

import com.example.api.domain.entity.Pedido;
import com.example.api.domain.entity.User;
import com.example.api.domain.enums.StatusPedido;
import com.example.api.domain.repository.UserRepository;
import com.example.api.rest.dto.ItensPedidoDTO;
import com.example.api.rest.dto.PedidoComItensDTO;
import com.example.api.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.api.domain.entity.ItensPedido;
import com.example.api.service.PedidoService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private UserRepository userRepository;

    private final PedidoService pedidoService;

    @Autowired
    public PedidoController(PedidoService pedidosService) {
        this.pedidoService = pedidosService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarPedido(@RequestBody PedidoComItensDTO pedidoComItensDTO) {

        Pedido pedido = new Pedido();

        pedido.setStatusPedido(StatusPedido.AGUARDANDO);
        pedido.setDataPedido(LocalDate.now());

        pedido.setNumeroPedido(13);

        User cliente = userRepository.getById(pedidoComItensDTO.getIdCliente());

        pedido.setValorTotal(BigDecimal.ZERO);

        pedido.setUsuario(cliente);

        pedidoService.cadastrarPedido(pedido);


//        List<ItensPedido> itensPedidoList = new ArrayList<>();
//
//        for (ItensPedidoDTO itensPedidoDTO : pedidoComItensDTO.getItens()) {
//            ItensPedido itemPedido = new ItensPedido();
//            itemPedido.setProduto(itensPedidoDTO.getProduto());
//            itemPedido.setQuantidade(itensPedidoDTO.getQuantidade());
//
//            itemPedido.setPedido(pedido); // Associe o item ao pedido.
//            itensPedidoList.add(itemPedido);
//        }
//
//        pedido.setItensPedido(itensPedidoList);
//
//        // Chame o serviço para salvar o pedido com os itens.
//        pedidoService.cadastrarPedido(pedido);

        return ResponseEntity.status(HttpStatus.CREATED).body("Pedido cadastrado com sucesso.");
    }
}