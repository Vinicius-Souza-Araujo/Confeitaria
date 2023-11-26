package com.example.api.rest.controller;


import com.example.api.domain.entity.Boleto;
import com.example.api.domain.entity.Cartao;
import com.example.api.domain.entity.FormaPagamento;
import com.example.api.domain.repository.FormaPagamentoRepository;
import com.example.api.rest.dto.FormaPagamentoDTO;
import com.example.api.rest.dto.HistoricoPedidosDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/formaPagamento")
public class FormaPagamentoController {
    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

    @GetMapping("/buscar/{id}")
    public ResponseEntity<FormaPagamentoDTO> getFormaPagamentoById(@PathVariable Long id) {

        // Encontra a forma de pagamento pelo ID
        FormaPagamento formaPagamento = formaPagamentoRepository.findById(id)
                .orElse(null); // Retorna null se não encontrar



        if (formaPagamento != null) {
            FormaPagamentoDTO formaPagamentoDTO = new FormaPagamentoDTO();
            formaPagamentoDTO.setId(formaPagamento.getId());


            Cartao cartao = new Cartao();
            cartao.setId(formaPagamento.getCartao().getId());
            cartao.setNumeroCartao(formaPagamento.getCartao().getNumeroCartao());
            cartao.setCodigoVerificador(formaPagamento.getCartao().getCodigoVerificador());
            cartao.setNomeCompleto(formaPagamento.getCartao().getNomeCompleto());
            cartao.setDataVencimento(formaPagamento.getCartao().getDataVencimento());

            formaPagamentoDTO.setCartao(cartao);
            formaPagamentoDTO.setParcelas(formaPagamento.getParcelas());
            formaPagamentoDTO.setBoleto(formaPagamento.getBoleto());


            return ResponseEntity.ok(formaPagamentoDTO); // Retorna 200 OK com a forma de pagamento encontrada
        } else {
            return ResponseEntity.notFound().build(); // Retorna 404 Not Found se não encontrar a forma de pagamento
        }
    }


//    @GetMapping("/buscar/{formaPagamentoId}")
//    public ResponseEntity<FormaPagamentoDTO> historicoPedidos(@PathVariable Long formaPagamentoId){
//        FormaPagamento formaPagamento = new FormaPagamento();
//        Cartao cartao;
//        Boleto boleto;
//        formaPagamento.setId(formaPagamentoId);
//
////        formaPagamento = formaPagamentoRepository.findById(formaPagamentoId).orElse(null);
////        if(formaPagamento.getCartao() != null){
////
////        }
//
//        if(formaPagamentoRepository.findById(formaPagamentoId).get().getCartao() != null){
//            cartao =  formaPagamentoRepository.findById(formaPagamentoId).get().getCartao();
//            int parcelas = formaPagamentoRepository.findById(formaPagamentoId).get().getParcelas();
//
//            formaPagamento.setCartao(cartao);
//            formaPagamento.setParcelas(parcelas);
//
//        } else if (formaPagamentoRepository.findById(formaPagamentoId).get().getBoleto() != null) {
//            boleto = formaPagamentoRepository.findById(formaPagamentoId).get().getBoleto();
//            formaPagamento.setBoleto(boleto);
//        }
//
//
//        FormaPagamentoDTO formaPagamentoDTO = new FormaPagamentoDTO(formaPagamento);
//
//        return ResponseEntity.ok(formaPagamentoDTO);
//    }
}
