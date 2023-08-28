package com.example.api.service;

import com.example.api.domain.repository.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // Subistitui o construtor da classe feito a mão.
public class AuthorizationServiceImpl implements UserDetailsService {
    private final Users repository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return repository.findByEmail(username);
    }
}
