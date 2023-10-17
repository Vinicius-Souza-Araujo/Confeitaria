package com.example.api.service;

import com.example.api.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // Subistitui o construtor da classe feito a mão.
public class AuthorizationServiceImpl implements UserDetailsService {
    @Autowired
    private final UserRepository repository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if( this.repository == null ){
            System.out.println("REPOSITORIO É NULO DENTRO DO USERDETAILS_SERVICE");
        }
        return repository.findByEmail(username);
    }
}
