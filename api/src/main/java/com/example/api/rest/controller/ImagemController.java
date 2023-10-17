package com.example.api.rest.controller;


import com.example.api.domain.entity.ImagemProduto;
import com.example.api.domain.entity.Produto;
import com.example.api.domain.repository.ImagensProduto;
import com.example.api.domain.repository.Produtos;
import com.example.api.domain.repository.UserRepository;
import com.example.api.exception.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/imagens")
public class ImagemController {

    @Value("${upload.path}")
    private String uploadPath;

    private Produtos produtos;
    private ImagensProduto repository;

    public ImagemController(Produtos produtos, ImagensProduto repository) {
        this.produtos = produtos;
        this.repository = repository;
    }

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public ResponseEntity<Response> upLoadImagem(@RequestParam("files") List<MultipartFile> imagens, @RequestParam("produtoId") Integer produtoId) {

        if (imagens == null || imagens.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(HttpStatus.BAD_REQUEST, "Nenhuma imagem foi enviada."));
        }

        if (produtoId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(HttpStatus.BAD_REQUEST, "O parâmetro 'produtoId' é obrigatório."));
        }

        Optional<Produto> optionalProduto = produtos.findById(produtoId);

        if (!optionalProduto.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(HttpStatus.NOT_FOUND, "Produto não encontrado."));
        }

        Produto produto = optionalProduto.get();

        for (MultipartFile imagem : imagens) {
            try {
                if (!imagem.isEmpty()) {


                    File uploadDir = new File(uploadPath);
                    if (!uploadDir.exists()) {
                        uploadDir.mkdirs();
                    }

                    // Obtenha o nome do arquivo original da imagem
                    String nomeArquivo = imagem.getOriginalFilename();

                    String nomeUnico = UUID.randomUUID().toString();
                    String extensao = nomeArquivo.substring(nomeArquivo.lastIndexOf('.'));
                    String novoNomeArquivo = nomeUnico + extensao;

                    // Crie o caminho completo onde a imagem será salva
                    String caminhoCompleto = uploadPath + File.separator + novoNomeArquivo;

                    // Crie um objeto File com o caminho completo
                    File arquivo = new File(caminhoCompleto);

                    // Salva a imagem no arquivo
                    imagem.transferTo(arquivo);

                    ImagemProduto imagemProduto = new ImagemProduto();
                    imagemProduto.setProduto(produto);
                    imagemProduto.setNome(novoNomeArquivo);
                    imagemProduto.setFlag(false);
                    repository.save(imagemProduto);

                    System.out.println("Imagem salva em: " + caminhoCompleto);

                    // Faça qualquer outra ação necessária aqui
                }


            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Ocorreu um erro ao salvar a imagem."));
            }
        }


        return ResponseEntity.status(HttpStatus.CREATED).body(new Response(HttpStatus.CREATED, "Salvado com sucesso."));
    }

    @GetMapping("/acessar/{nomeDaImagem}")
    public ResponseEntity<Resource> acessarImagem(@PathVariable String nomeDaImagem) {
        try {

            String caminhoCompleto = uploadPath + File.separator + nomeDaImagem;
            File imagem = new File(caminhoCompleto);


            if (imagem.exists()) {

                Resource resource = new FileSystemResource(imagem);
                return ResponseEntity.ok()
                        .contentLength(imagem.length())
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/atualizar/{produtoId}/{nomeDaImagem}")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public ResponseEntity<Response> atualizarImagem(@PathVariable Integer produtoId, @PathVariable String nomeDaImagem, @RequestParam("file") MultipartFile novaImagem) {
        if (novaImagem == null || novaImagem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(HttpStatus.BAD_REQUEST, "Nenhuma imagem foi enviada."));
        }

        Optional<Produto> optionalProduto = produtos.findById(produtoId);

        if (!optionalProduto.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(HttpStatus.NOT_FOUND, "Produto não encontrado."));
        }

        Produto produto = optionalProduto.get();

        try {
            // Verifique se a imagem antiga existe antes de prosseguir
            String caminhoCompleto = uploadPath + File.separator + nomeDaImagem;
            File arquivoAntigo = new File(caminhoCompleto);

            if (!arquivoAntigo.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(HttpStatus.NOT_FOUND, "Imagem não encontrada para atualização."));
            }

            if (!novaImagem.isEmpty()) {
                File uploadDir = new File(uploadPath);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                // Exclua a imagem antiga
                arquivoAntigo.delete();

                // Salve a nova imagem no arquivo
                novaImagem.transferTo(arquivoAntigo);

                // Atualize o nome da imagem no banco de dados
                ImagemProduto imagemProduto = repository.findByProdutoAndNome(produto, nomeDaImagem);
                if (imagemProduto != null) {
                    imagemProduto.setNome(nomeDaImagem);
                    repository.save(imagemProduto);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(HttpStatus.NOT_FOUND, "Imagem não encontrada para atualização."));
                }

                System.out.println("Imagem atualizada em: " + caminhoCompleto);

                // Faça qualquer outra ação necessária aqui
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Ocorreu um erro ao atualizar a imagem."));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new Response(HttpStatus.OK, "Imagem atualizada com sucesso."));
    }


    @PutMapping("/atualizarFlag/{produtoId}/{nomeDaImagem}")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public ResponseEntity<Response> atualizarFlagImagem(@PathVariable Integer produtoId, @PathVariable String nomeDaImagem) {
        try {
            Optional<Produto> optionalProduto = produtos.findById(produtoId);

            if (!optionalProduto.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(HttpStatus.NOT_FOUND, "Produto não encontrado."));
            }

            Produto produto = optionalProduto.get();
            ImagemProduto imagemParaAtualizar = repository.findByProdutoAndNome(produto, nomeDaImagem);

            if (imagemParaAtualizar == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(HttpStatus.NOT_FOUND, "Imagem não encontrada para atualização."));
            }

            List<ImagemProduto> imagensDoProduto = repository.findByProduto(produto);

            // Agora que sabemos que a imagem existe, podemos definir a flag corretamente
            for (ImagemProduto imagem : imagensDoProduto) {
                if (imagem == imagemParaAtualizar) {
                    imagem.setFlag(true);
                } else {
                    imagem.setFlag(false);
                }
            }

            repository.saveAll(imagensDoProduto);

            return ResponseEntity.status(HttpStatus.OK).body(new Response(HttpStatus.OK, "Flag da imagem atualizada com sucesso."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Ocorreu um erro ao atualizar a flag da imagem."));
        }
    }
}
