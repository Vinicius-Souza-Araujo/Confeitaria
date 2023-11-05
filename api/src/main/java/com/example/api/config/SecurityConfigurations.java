package com.example.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST,"/api/users/login").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/users/cadastrar").hasRole("ADM")
                        .requestMatchers(HttpMethod.PATCH,"/api/users/atualizar/**").hasRole("ADM")
                        .requestMatchers(HttpMethod.PATCH,"/api/users/atualizarCliente/**").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/api/users/atualizar/status/**").hasRole("ADM")
                        .requestMatchers(HttpMethod.PATCH,"/api/users/atualizar/senha/**").hasRole("ADM")
                        .requestMatchers(HttpMethod.GET,"/api/users/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/users/cadastrarCliente").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/users/enderecoCliente").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/produtos/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/calculo-frete/**").permitAll()

                        .requestMatchers(HttpMethod.GET,"/api/endereco/enderecosCliente/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/endereco").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/endereco/**").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/api/endereco/atualizar/{id}").permitAll()

                        .requestMatchers(HttpMethod.PUT,"/api/produtos/**").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/api/produtos/atualizarEstoque/**").permitAll()

                        .requestMatchers(HttpMethod.POST,"/api/produtos/cadastrar").hasRole("ADM")
                        .requestMatchers(HttpMethod.PUT,"/api/produtos/**").hasRole("ADM")
                        .requestMatchers(HttpMethod.GET,"/api/imagens/acessar/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/imagens/upload").hasRole("ADM")

                        .requestMatchers(HttpMethod.GET,"/api/endereco/consulta").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/endereco/cadastrar").permitAll()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173/"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "content-type"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "content-type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }




}
