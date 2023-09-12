package com.example.api.rest.controller;


import java.util.List;
import java.util.stream.Collectors;


import com.example.api.exception.UserNaoEncontradoException;
import com.example.api.rest.ApiErrors;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.api.exception.ProdutoNaoEncontradoException;
import com.example.api.exception.UserNaoEncontradoException;
import com.example.api.rest.ApiErrors;

@RestControllerAdvice
public class AplicationControllerAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrors handleMethodNotValidException(MethodArgumentNotValidException ex){
        List<String> erros = ex.getBindingResult().getAllErrors()
                .stream()
                .map(erro -> erro.getDefaultMessage())
                .collect(Collectors.toList());
        return new ApiErrors(erros);
    }

    @ExceptionHandler(UserNaoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrors handlePedidoNotFoundException(UserNaoEncontradoException ex){
        String mensagemErro = ex.getMessage();
        return new ApiErrors(mensagemErro);
    }

    
    @ExceptionHandler(ProdutoNaoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrors handlePedidoNotFoundException(ProdutoNaoEncontradoException ex) {
        String mensagemErro = ex.getMessage();
        return new ApiErrors(mensagemErro);
    }

        @ExceptionHandler(SizeLimitExceededException.class)
        @ResponseStatus(HttpStatus.BAD_REQUEST)
        public ApiErrors handleSizeLimitExceededException(SizeLimitExceededException ex) {
            return new ApiErrors("Uma imagem excedeu o limite máximo de 10 MB.");
        }
}
