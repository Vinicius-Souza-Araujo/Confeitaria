import React from 'react'
import { useState } from 'react'
import { POST_PRODUTO } from '../../../Api';
import { UserContext } from '../../../UserContext';
import { Estrelas } from '../../componetesGenericos/Estrelas/Estrelas';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


export const FormCadastarProd = () => {

    const user = React.useContext(UserContext);
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [valor, setValor] = useState(0);
    const [status, setStatus] = useState('');
    const [avaliacao, setAvaliacao] = useState(0.5);
    const [show, setShow] = useState(false);

    async function handleEnviar(event){
      console.log(avaliacao)
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
    }
      
  }


  return (
    <div>
             <form onSubmit={handleEnviar}>
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

               <label htmlFor="avaliacao">
                    Avaliação
                    <Estrelas onChange={(novaAvaliacao) => setAvaliacao(novaAvaliacao)} value={avaliacao}/>
               </label>
               
               <label htmlFor="status">
                Status
               <select value={status} onChange={(event) => setStatus(event.target.value)} name="status" id="status" required>
                    <option value="" disabled> Selecione uma opção</option>
                    <option value="DESATIVADO">DESATIVADO</option>
                    <option value="ATIVADO">ATIVADO</option>
                </select>
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
