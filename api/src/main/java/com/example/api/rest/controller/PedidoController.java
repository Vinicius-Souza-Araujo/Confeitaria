package com.example.api.rest.controller;

import com.example.api.domain.entity.Pedido;
import com.example.api.domain.entity.Produto;
import com.example.api.domain.entity.User;
import com.example.api.domain.enums.StatusPedido;
import com.example.api.domain.repository.ItensPedidoRepository;
import com.example.api.domain.repository.Produtos;
import com.example.api.domain.repository.UserRepository;
import com.example.api.rest.dto.FindUsersDTO;
import com.example.api.rest.dto.HistoricoPedidosDTO;
import com.example.api.rest.dto.ItensPedidoDTO;
import com.example.api.rest.dto.PedidoComItensDTO;
import com.example.api.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
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

    @Autowired
    private ItensPedidoRepository itensPedidoRepository;

    private final PedidoService pedidoService;

    @Autowired
    private Produtos produtoRepository;

    @Autowired
    public PedidoController(PedidoService pedidosService) {
        this.pedidoService = pedidosService;
    }

    @Transactional(rollbackFor = Exception.class)
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarPedido(@RequestBody PedidoComItensDTO pedidoComItensDTO) {

        Pedido pedido = new Pedido();

        pedido.setStatusPedido(StatusPedido.AGUARDANDO);
        pedido.setDataPedido(LocalDate.now());

        //RESOLVER COMO FICARÁ A QUESTAO DO NUMERO DO PEDIDO
//        pedido.setNumeroPedido(13);

        User cliente = userRepository.getById(pedidoComItensDTO.getIdCliente());

        pedido.setValorTotal(BigDecimal.ZERO);

        pedido.setUsuario(cliente);

        pedidoService.cadastrarPedido(pedido);

        pedido.getId();


        List<ItensPedido> itensPedidoList = new ArrayList<>();

        for (ItensPedidoDTO itensPedidoDTO : pedidoComItensDTO.getItens()) {
            ItensPedido itemPedido = new ItensPedido();

            Produto produto = produtoRepository.getById(itensPedidoDTO.getIdProduto());

            itemPedido.setProduto(produto);

            itemPedido.setQuantidade(itensPedidoDTO.getQuantidade());

            itemPedido.setPedido(pedido);

            itensPedidoList.add(itemPedido);
        }

        itensPedidoRepository.saveAll(itensPedidoList);


        return ResponseEntity.status(HttpStatus.CREATED).body("Pedido cadastrado com sucesso.");
    }

    @GetMapping("/historico/{clienteId}")
    public List<HistoricoPedidosDTO> historicoPedidos (@PathVariable Integer clienteId){
        List<HistoricoPedidosDTO> historico;
        return historico = pedidoService.getPedidosCliente(clienteId).stream().map(HistoricoPedidosDTO::new).toList();
    }
}