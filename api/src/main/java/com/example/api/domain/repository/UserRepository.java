package com.example.api.domain.repository;

import com.example.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);

    @Query("SELECT u.cpf FROM User u WHERE u.id = :id")
    String findCpfById(Integer id);

    List<User> findByNome (String nome);

    UserDetails findByEmail(String email);

    List<User> findByNomeContainingIgnoreCase(String nome);
}
