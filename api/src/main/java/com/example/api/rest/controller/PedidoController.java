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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    private EnderecoRepository enderecoRepository;

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

        pedido.setStatusPedido(StatusPedido.AGUARDANDO_PAGAMENTO);
        pedido.setDataPedido(LocalDate.now());

        pedido.setNumeroPedido(aleatorio);

        User cliente = userRepository.getById(pedidoComItensDTO.getIdCliente());

        pedido.setValorTotal(BigDecimal.ZERO);

        pedido.setUsuario(cliente);

        Endereco endereco = enderecoRepository.getById(pedidoComItensDTO.getIdEndereco());

        pedido.setEndereco(endereco);

        pedidoService.cadastrarPedido(pedido);

        Long pedidoId = pedido.getId();

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


        return ResponseEntity.status(HttpStatus.CREATED).body("Pedido cadastrado com sucesso. Pedido ID: " + pedidoId);
    }

//    @GetMapping("/historico/{clienteId}")
//    public List<HistoricoPedidosDTO> historicoPedidos (@PathVariable Integer clienteId){
//        List<HistoricoPedidosDTO> historico;
//        return historico = pedidoService.getPedidosCliente(clienteId).stream().map(HistoricoPedidosDTO::new).toList();
//    }

    @GetMapping("/historico/{clienteId}")
    public ResponseEntity<List<HistoricoPedidosDTO>> historicoPedidos(@PathVariable Integer clienteId){
        List<HistoricoPedidosDTO> historico = new ArrayList<>();
        List<Pedido> listaPedidos = pedidoService.getPedidosCliente(clienteId);

        for (int i = 0; i < listaPedidos.size(); i++) {
            Pedido pedido = listaPedidos.get(i);

            Endereco endereco = enderecoRepository.findById(pedido.getEndereco().getId()).orElse(null);
            Endereco endereco1 = new Endereco();
            endereco1.setCep(endereco.getCep());
            endereco1.setLogradouro(endereco.getLogradouro());
            endereco1.setBairro(endereco.getBairro());
            endereco1.setLocalidade(endereco.getLocalidade());
            endereco1.setTipo(endereco.getTipo());
            HistoricoPedidosDTO historicoPedido = new HistoricoPedidosDTO(pedido.getId(),pedido.getValorTotal(),pedido.getStatusPedido(),pedido.getDataPedido(),pedido.getNumeroPedido(), pedido.getFormaPagamento());
            historicoPedido.setEndereco(endereco1);



            historico.add(historicoPedido);
        }
        return ResponseEntity.ok(historico);
    }

    @GetMapping("/historico")
    public ResponseEntity<List<HistoricoPedidosDTO>> historicoTodosPedidos(){
        List<HistoricoPedidosDTO> historico;
        historico = pedidoService.getTodosPedidosCliente().stream().map(HistoricoPedidosDTO::new).toList();
        return ResponseEntity.ok(historico);
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

    @PatchMapping("/atualizarStatus/{pedidoId}")
    public ResponseEntity<String> atualizarStatusPedido(@PathVariable Integer pedidoId, @RequestBody AtulizacaoStatusPedidoDTO statusPedido) {
        try {
            Optional<Pedido> optionalPedido = pedidoRepository.findById(pedidoId);

            if (optionalPedido.isPresent()) {
                Pedido pedido = optionalPedido.get();
                pedido.setStatusPedido(statusPedido.getStatusPedido());
                pedidoRepository.save(pedido);

                return ResponseEntity.ok("Status do pedido atualizado com sucesso.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}