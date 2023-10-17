package com.example.api.domain.entity;

import com.example.api.domain.enums.Generos;
import com.example.api.domain.enums.GrupoUser;
import com.example.api.domain.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "usuarios")
public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome", length = 255)
    @NotEmpty(message = "Campo nome é obrigatório.")
    private String nome;

    @Column(name = "email", length = 255)
    @NotEmpty(message = "Campo email é obrigatório.")
    private String email;

    @Column(name = "senha", length = 255)
    @NotEmpty(message = "Campo senha é obrigatório.")
    private String senha;

    @Column(name = "cpf", length = 11)
    @NotEmpty(message = "Campo cpf é obrigatório.")
    private String cpf;
    @Enumerated(EnumType.STRING)
    @Column(name = "grupo")
    @NotNull(message = "Campo grupo é obrigatório")
    private GrupoUser grupo;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @NotNull(message = "Campo status é obrigatório")
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name = "genero")
    private Generos genero;

    @Column(name ="data_nascimento")
    private LocalDate dataNascimento;

    @Column(name ="endereco")
    @OneToMany(mappedBy = "cliente")
    private List<Endereco> endereco = new ArrayList<>();

    public User(String nome, String email, String senha, String cpf, Generos genero, LocalDate dataNascimento){
        this.nome = nome;
        this.email = email;
        this.senha =  senha;
        this.cpf = cpf;
        this.genero = genero;
        this.dataNascimento = dataNascimento;

    }

    public User(String nome, String email, String senha, String cpf, GrupoUser grupo) {
        this.nome = nome;
        this.email = email;
        this.senha =  senha;
        this.cpf = cpf;
        this.grupo = grupo;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.grupo == GrupoUser.ADM){
            return List.of(new SimpleGrantedAuthority("ROLE_ADM"));

        }else if(this.grupo == GrupoUser.ESTOQUISTA){
            return List.of(new SimpleGrantedAuthority("ROLE_ESTOQUISTA"));
        }
        else{
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", cpf='" + cpf + '\'' +
                ", grupo=" + grupo +
                ", status=" + status +
                ", genero=" + genero +
                ", dataNascimento=" + dataNascimento +
                ", endereco=" + endereco +
                '}';
    }
}

