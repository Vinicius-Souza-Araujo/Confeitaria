package com.example.api.rest.dto;

public class CalculoFreteDTO {
    private String cepOrigem;
    private String cepDestino;
    private String km;

    private String valorFrete;

    public CalculoFreteDTO() {
    }

    public CalculoFreteDTO(String cepDestino) {
        this.cepDestino = cepDestino;
    }

    public CalculoFreteDTO(String ceporigem, String cepDestino, String valorFrete) {
        this.cepOrigem = ceporigem;
        this.cepDestino = cepDestino;
        this.valorFrete = valorFrete;
    }

    public String getCepOrigem() {
        return cepOrigem;
    }

    public void setCepOrigem(String cepOrigem) {
        this.cepOrigem = cepOrigem;
    }

    public String getCepDestino() {
        return cepDestino;
    }

    public void setCepDestino(String cepDestino) {
        this.cepDestino = cepDestino;
    }

    public String getKm() {
        return km;
    }

    public void setKm(String km) {
        this.km = km;
    }

    public String getValorFrete() {
        return valorFrete;
    }

    public void setValorFrete(String valorFrete) {
        this.valorFrete = valorFrete;
    }
}

/*

{
"ceporigem":"01527050",
"cepdestino":"20020030",
"km":"442",
"valorfrete":"2210,00",
}




 */