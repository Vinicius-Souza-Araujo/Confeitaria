package com.example.api.exception;

public class UserNaoEncontradoException extends RuntimeException{

    public UserNaoEncontradoException(){
        super("Usuário não encontrado.");
    }
}
