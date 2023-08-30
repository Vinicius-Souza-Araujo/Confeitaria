package com.example.api.domain.repository;

import com.example.api.domain.entity.User;
import com.example.api.domain.enums.StatusUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface Users extends JpaRepository<User, Integer> {


    boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);

    @Query("SELECT u.cpf FROM User u WHERE u.id = :id")
    String findCpfById(Integer id);

    UserDetails findByEmail(String email);
}