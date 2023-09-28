import React from 'react'
import { useState } from 'react'
import { POST_PRODUTO, GET_PRODUTOS_ESTOQUE, POST_UPLOAD_IMAGEM } from '../../../../Api';
import { UserContext } from '../../../../UserContext';
import { Estrelas } from '../../Estrelas/Estrelas';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ImageUploadForm from '../Imagem/ImageUploadForm';


export const FormCadastarProd = () => {


    const user = React.useContext(UserContext);
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [valor, setValor] = useState(0);
    const [status, setStatus] = useState('ATIVADO');
    const [avaliacao, setAvaliacao] = useState(0.5);
    const [dataProduto,setProduto] = useState();
    const [show, setShow] = useState(false);
    const [selectedImages, setSelectedImages] = React.useState([]);
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {  
      getProdutos();
    }, []);

    async function getProdutos(){
      const {url, options} = GET_PRODUTOS_ESTOQUE(0);
      const response = await fetch(url, options);
      
      if (response.ok) {
          const dataProduto = await response.json();
          setProduto(dataProduto.content[0]);
      } else {
          console.error('Erro ao procurar dados do produto');
      }
      
    }

   const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    };

    const handleImagens = async (id) => {  
   
      const formData = new FormData();
      console.log('formData' + formData);
      selectedImages.forEach((image, index) => {
        formData.append('files', image, image.name);
      });

      console.log(id)
      formData.append('produtoId', id);
  
      try {
          const { url, options } = POST_UPLOAD_IMAGEM(formData, user.data.token);
          const response = await fetch(url, options);
  
        if (response.status === 201) {
          setMessage('Imagens salvas com sucesso.');
        } else {
          setMessage('Ocorreu um erro ao salvar as imagens.');
        }
      } catch (error) {
        console.error('Erro:', error);
        setMessage('Ocorreu um erro ao enviar as imagens.');
      }
    };

    async function handleEnviar(event){
      event.preventDefault();

      const {url, options} = POST_PRODUTO({
        nome: nome,
        quantidade: quantidade,
        valor: valor,
        status: status,
        avaliacao: avaliacao
      }, user.data.token);
  
      const response = await fetch(url, options);
      
      if (response.ok) {
        setNome('');
        setQuantidade('');
        setValor('');
        setAvaliacao('');
        setStatus('');
      };
      
      const { url: ultimoProdutoUrl, options: ultimoProdutoOptions } = GET_PRODUTOS_ESTOQUE(0);
      const ultimoProdutoResponse = await fetch(ultimoProdutoUrl, ultimoProdutoOptions);
      if (ultimoProdutoResponse.ok) {
        const ultimoProdutoData = await ultimoProdutoResponse.json();
        const produtoId = ultimoProdutoData.content[0].id;
        await handleImagens(produtoId); 
      }
}

  return (
    <div>
             <form onSubmit={handleEnviar} encType="multipart/form-data">
                <label htmlFor="nome">
                     Nome
                    <input value={nome} onChange={(event) => setNome(event.target.value)} type="text" name="nome" id="nome" required/>
                </label>
                
                <label htmlFor="quantidade">
                    Quantidade
                    <input value={quantidade} onChange={(event) => setQuantidade(event.target.value)}  type="number" name="quantidade" id="quantidade" required/>
                </label>

               <label htmlFor="valor">
                    Valor
                    <input value={valor} onChange={(event) => setValor(event.target.value)}  type="number" name="valor" id="valor" required/>
               </label>
              
              <div>
                <label htmlFor="images">Selecione as imagens:</label>
                <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    required
                  />
               </div>
              {message && <p>{message}</p>}

               <label htmlFor="avaliacao">
                    Avaliação
                    <Estrelas onChange={(novaAvaliacao) => setAvaliacao(novaAvaliacao)} value={avaliacao}/>
               </label>
               
              <Alert show={show} variant="success" className='alerta'>
                <Alert.Heading>Deseja confirmar a criação do produto?</Alert.Heading>

                <div className="d-flex justify-content-end">
                  <Button onClick={() => setShow(false)} variant="outline-success">
                    Não
                  </Button>

                  <Button type='summit' onClick={handleEnviar}>Sim</Button>
                </div>
              </Alert>{!show && <Button onClick={() => setShow(true)}>Enviar</Button>}
          
            </form>  
    </div>
  )
}
