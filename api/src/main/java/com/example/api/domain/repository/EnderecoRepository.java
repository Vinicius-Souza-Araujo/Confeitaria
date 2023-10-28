package com.example.api.domain.repository;

import com.example.api.domain.entity.Endereco;
import com.example.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
    @Query("SELECT e FROM Endereco e WHERE e.cliente.id = :clienteId")
    List<Endereco> findByClienteId(@Param("clienteId") Integer clienteId);

}
