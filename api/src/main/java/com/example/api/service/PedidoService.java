package com.example.api.service;

import com.example.api.domain.entity.Boleto;
import com.example.api.domain.entity.Cartao;
import com.example.api.domain.entity.FormaPagamento;
import com.example.api.domain.entity.Pedido;
import com.example.api.domain.repository.BoletoRepository;
import com.example.api.domain.repository.CartaoRepository;
import com.example.api.domain.repository.FormaPagamentoRepository;
import com.example.api.domain.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private CartaoRepository cartaoRepository;

    @Autowired
    private BoletoRepository boletoRepository;

    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

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

    public ResponseEntity<String> adicionandoFormaPagamento(Integer pedidoId, FormaPagamento formaPagamento){
        Pedido pedido = pedidoRepository.findById(pedidoId).orElse(null);

        FormaPagamento pagamento = new FormaPagamento();

        if (pedido == null) {
            return ResponseEntity.notFound().build();
        }

        if(formaPagamento.getCartao() != null  && formaPagamento.getParcelas() != null){
            Cartao cartao = formaPagamento.getCartao();

            cartao.setUser(pedido.getUsuario());
            cartaoRepository.save(cartao);

            pagamento.setCartao(cartao);
            pagamento.setParcelas(formaPagamento.getParcelas());

            formaPagamentoRepository.save(pagamento);

            pedido.setFormaPagamento(pagamento);
            pedidoRepository.save(pedido);

            return ResponseEntity.ok("Cartão atrelada com sucesso.");
        } else if (formaPagamento.getBoleto() != null) {
            Boleto boleto = formaPagamento.getBoleto();
            boletoRepository.save(boleto);
            pagamento.setBoleto(boleto);

            formaPagamentoRepository.save(pagamento);

            pedido.setFormaPagamento(pagamento);
            pedidoRepository.save(pedido);

            return ResponseEntity.ok("Boleto atrelado com sucesso.");

        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}