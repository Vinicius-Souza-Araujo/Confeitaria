package com.example.api.rest.controller;

import com.example.api.rest.dto.CalculoFreteDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/calculo-frete")
public class CalculoFreteAPI {

    private final WebClient webClient;

    public CalculoFreteAPI(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://www.cepcerto.com/ws/json-frete-personalizado").build();
    }

    @GetMapping("{cepOrigem}/{cepDestino}/{valorFrete}")
    public ResponseEntity<CalculoFreteDTO> calculoFrete(
            @PathVariable("cepOrigem") String cepOrigem,
            @PathVariable("cepDestino") String cepDestino,
            @PathVariable("valorFrete") String valorFrete) {

        cepOrigem = "06413080";
        valorFrete = "0.5";
        Double valorFreteInt = Double.parseDouble(valorFrete);
        Double valorFrete2 = valorFreteInt*1.5;
        Double valorFrete3 = valorFreteInt*2;


        try {
            CalculoFreteDTO calculoFreteDTO = webClient
                    .get()
                    .uri("/{cepOrigem}/{cepDestino}/{valorFrete}/e7db6bd189a5fbbf053072b32964794e663ce243", cepOrigem, cepDestino, valorFrete)
                    .retrieve()
                    .bodyToMono(CalculoFreteDTO.class)
                    .block();


            return ResponseEntity.ok(calculoFreteDTO);

        }catch (WebClientResponseException e) {
            System.out.println("Erro no cliente: " + e.getRawStatusCode());
            System.out.println("Corpo da resposta: " + e.getResponseBodyAsString());
            e.printStackTrace();
            return ResponseEntity.status(e.getRawStatusCode()).body(null);
        }


         catch (Exception e) {
            System.out.println("erro " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {

        e.printStackTrace();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno do servidor");
    }
}
