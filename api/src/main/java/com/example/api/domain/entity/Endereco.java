package com.example.api.domain.entity;


import com.example.api.domain.enums.StatusEndereco;
import com.example.api.domain.enums.TipoDeEndereco;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "enderecos")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column
    private String cep;

    @Column
    private String logradouro;

    @Column
    private String complemento;

    @Column
    private String bairro;
    @Column
    private String localidade;
    @Column
    private String uf;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_endereco")
    private StatusEndereco statusEndereco;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoDeEndereco tipo;

    @ManyToOne
    @JoinColumn(name = "fk_cliente_id", nullable = false)
    private User cliente;

    //SPRING NECESSITA DE UM CONSTRUTOR VAZIO NÃO TIRAR
    @Deprecated
    public Endereco(){}

    public Endereco(String cep, String logradouro, String complemento, String bairro, String localidade, String uf) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.bairro = bairro;
        this.localidade = localidade;
        this.uf = uf;
    }

    public Endereco(String cep, String logradouro, String complemento, String bairro, String localidade, String uf,TipoDeEndereco tipo ,User cliente) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.bairro = bairro;
        this.localidade = localidade;
        this.uf = uf;
        this.tipo= tipo;
        this.cliente = cliente;
    }

    public Endereco(Endereco endereco) {
        this.cep = endereco.getCep();
        this.logradouro = endereco.getLogradouro();
        this.complemento = endereco.getComplemento();
        this.bairro = endereco.getBairro();
        this.localidade = endereco.getLocalidade();
        this.uf = endereco.getUf();
        this.tipo= endereco.getTipo();
        this.cliente = endereco.getCliente();
    }


}
