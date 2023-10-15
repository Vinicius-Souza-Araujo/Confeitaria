package com.example.api.domain.repository;

import com.example.api.domain.entity.Endereco;
import com.example.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

}
