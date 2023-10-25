package com.example.api.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "pedido")
public class PedidoEntity {

    @Column(name ="endereco")
    @OneToMany(mappedBy = "cliente")
    private List<Endereco> endereco = new ArrayList<>();
}
