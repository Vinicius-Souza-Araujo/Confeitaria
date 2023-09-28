import React from 'react'
import { useState } from 'react'
import { PUT_PRODUTOS } from '../../../../Api';
import { UserContext } from '../../../../UserContext';
import { Estrelas } from '../../Estrelas/Estrelas';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PUT_IMAGEM } from '../../../../Api';
import './formProduc.css'

export const FormProduc = (props) => {
    
    const [nome, setNome] = useState(props.nome);
    const [quantidade, setQuantidade] = useState(props.quantidade);
    const [status, setStatus] = useState(props.status);
    const [valor, setValor] = useState(props.valor);
    const [avaliacao, setAvaliacao] = useState(props.avaliacao);
    const [id, setId] = useState(props.id);
    const [imagens, setImagens] = useState(props.imagens);
    const [novaImagem, setNovaImagem] = useState();
    const [flag, setFlag] = useState('');
    const [nomeImagem, setNomeImagem] = useState('');
    const [show, setShow] = useState(false);
    const user = React.useContext(UserContext);
    const url_img = "http://localhost:8080/api/imagens/acessar/";
    

    async function putProduto() {
      const { url, options } = PUT_PRODUTOS({
        id: id,
        nome: nome,
        status: status,
        quantidade: quantidade,
        avaliacao: avaliacao,
        valor: valor
      }, user.data.token);
    
      try {
        const response = await fetch(url, options);
    
        if (response.ok) {
          console.log('Produto atualizado com sucesso!');
        } else {
          console.error('Falha ao atualizar o produto.');
        }
      } catch (error) {
        console.error('Erro durante a solicitação:', error);
      }
    }
    

    const handleReturn = () => {
      navigate("/ProdutosAdmin");
    };

    function handleEnviar(event){
        event.preventDefault();
        if (novaImagem) {
          handleAlterarImagem();
        }
        putProduto();
        setShow(false);
        
          
    }

    async function handleAlterarImagem () {
      console.log("isso é imagem"+nomeImagem)
      const {url, options} = PUT_IMAGEM (id, nomeImagem,novaImagem, user.data.token);

      const response = await fetch(url, options, id);
      if (response.ok) {
        console.log('Imagem atualizada!');
      } else {
        console.error('Falha ao atualizar a imagem.');
      }
  
    }

    const handleImageChange = (e, nome, flag) => {
      const file = e.target.files[0];
      setNovaImagem(file);
      setFlag(flag);
      setNomeImagem(nome);
    };
  
  return (
    <div> 
            <form onSubmit={handleEnviar} >
                <div className='dados-textuais'>
                  <span>
                      <label htmlFor="nome">
                          Nome
                          <input type="text" name="nome" id="nome" placeholder='Nome' onChange={(event) => setNome(event.target.value)} value={nome} required/>
                      </label>

                        
                      <label htmlFor="quantidade">
                          Quantidade
                          <input type="number" name="quantidade" id="quantidade" placeholder='Quantidade' onChange={(event) => setQuantidade(event.target.value)} value={quantidade} required/>
                      </label>
                  </span>
                    
                  <span>
                      <label htmlFor="avaliacao">
                              Avaliação
                              <Estrelas onChange={(novaAvaliacao) => setAvaliacao(novaAvaliacao)} valor={avaliacao}/>
                        </label>
                        
                        <label htmlFor="valor">
                              Valor
                              <input type="number" name="valor" id="valor" onChange={(event) => setValor(event.target.value)} value={valor} required/>
                        </label>
                  </span>
                    

                </div>
               
              <h4>Imagens</h4>
               {imagens.map((imagem) => (
              <div className='estrutura_imagem'>
                <form onSubmit={handleEnviar} encType="multipart/form-data">
                  <div className='sub-container-imagem'>
                  <img className='img-card-form' src={url_img + imagem.nome} />
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multipart
                    onChange={(event) => handleImageChange(event, imagem.nome, imagem.flag)}
                  />

                  {/* <Form.Check className='switch-form'
                      type="switch"
                      id="custom-switch"
                      label="Principal"
                      custom
                  /> */}
                </div>
                
                </form>
                
              </div>
            ))}
               
                <Alert  className="alert alert-light" show={show} variant="success">
                <Alert.Heading className='tituto-modal'>Deseja confirmar a alteração?</Alert.Heading>
        
                <div className="d-flex justify-content-end">
                  <Button className='botaoAzul' onClick={() => setShow(false)} variant="outline-success">
                    Não
                  </Button>

                  <Button className='botaoSummit' type='summit' onClick={handleEnviar}>Sim</Button>
                </div>
              </Alert>{!show && <Button className='botaoRosa' onClick={() => setShow(true)}>Enviar</Button>}          
            </form>
 
    </div>
  )
}
