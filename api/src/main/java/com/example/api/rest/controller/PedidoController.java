package com.example.api.rest.controller;

import com.example.api.domain.entity.*;
import com.example.api.domain.enums.StatusPedido;
import com.example.api.domain.repository.*;
import com.example.api.rest.dto.*;
import com.example.api.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.example.api.service.PedidoService;

import java.math.BigDecimal;
import java.text.Normalizer;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private CartaoRepository cartaoRepository;

    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

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
        Random random = new Random();

        Integer aleatorio = random.nextInt(10000);

        pedido.setStatusPedido(StatusPedido.AGUARDANDO);
        pedido.setDataPedido(LocalDate.now());

        pedido.setNumeroPedido(aleatorio);

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

    @Transactional
    @PostMapping("/atrelarPagamento/{pedidoId}")
    public ResponseEntity<String> atrelarFormaPagamento(@PathVariable Integer pedidoId, @RequestBody FormaPagamento formaPagamento){
        try{
            return pedidoService.adicionandoFormaPagamento(pedidoId, formaPagamento);
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
}