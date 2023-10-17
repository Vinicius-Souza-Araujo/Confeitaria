package com.example.api.domain.repository;

import com.example.api.domain.entity.Endereco;
import com.example.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
//    @Query("SELECT e1_0 FROM Enderecos WHERE fk_cliente_id = :userId")
//    List<Endereco> findByUserId(Integer userId);

}
