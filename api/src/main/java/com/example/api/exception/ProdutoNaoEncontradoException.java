package com.example.api.exception;

public class ProdutoNaoEncontradoException  extends RuntimeException{

	public ProdutoNaoEncontradoException() {
		super("Produto não encontrado.");
	}
}
