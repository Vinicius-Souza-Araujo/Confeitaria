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
//    @Transactional
//    @PostMapping("/atrelarPagamento/{pedidoId}")
//    public ResponseEntity<String> atrelarFormaPagamento(
//            @PathVariable Integer pedidoId,
//            @RequestBody FormaDePagamentoDTO formaPagamento) {
//
//        Pedido pedido = pedidoRepository.findById(pedidoId).orElse(null);
//
//        if (pedido == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        // Verifica o tipo de forma de pagamento
//        if (formaPagamento.getCartao() != null) {
//            Cartao cartao = formaPagamento.getCartao();
//
//            cartao.setUser(pedido.getUsuario());
//
//            formaPagamento.setCartao(cartao);
//        } else if (formaPagamento.getBoleto() != null) {
//            Boleto boleto = formaPagamento.getBoleto();
//            // Você pode configurar o boleto, se necessário
//            formaPagamento.setBoleto(boleto);
//        } else {
//            return ResponseEntity.badRequest().body("Forma de pagamento inválida.");
//        }
//
//        FormaPagamento forma = new FormaPagamento(formaPagamento);
//
//        pedido.setFormaPagamento(forma);
//        pedidoRepository.save(pedido);
//
//        return ResponseEntity.ok("Forma de pagamento atrelada com sucesso.");
//    }

//    @PostMapping("pagamengo/{num_pedido}")
//    public ResponseEntity<> atrelandoPagamento(){
//    }

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