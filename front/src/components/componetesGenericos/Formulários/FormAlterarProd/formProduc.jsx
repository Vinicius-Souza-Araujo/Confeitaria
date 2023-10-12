import React from 'react'
import { useState } from 'react'
import { PUT_PRODUTOS } from '../../../../Api';
import { UserContext } from '../../../../UserContext';
import { Estrelas } from '../../Estrelas/Estrelas';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


export const FormProduc = (props) => {
    
    const [nome, setNome] = useState(props.nome);
    const [quantidade, setQuantidade] = useState(props.quantidade);
    const [status, setStatus] = useState(props.status);
    const [valor, setValor] = useState(props.valor);
    const [avaliacao, setAvaliacao] = useState(props.avaliacao);
    const [id, setId] = useState(props.id);
    const [show, setShow] = useState(false);
    const user = React.useContext(UserContext);
    

    async function putProduto(){
      console.log('Isso é o ID'+ id)
        const {url, options} = PUT_PRODUTOS({
            id: id,
            nome: nome,
            status: status,
            quantidade: quantidade,
            avaliacao: avaliacao,
            valor: valor   
        }, user.data.token);
        const response = await fetch(url, options);    
    }

    function handleEnviar(event){
        event.preventDefault();
        putProduto();
        setShow(false);
    }

  return (
    <div> 
            
            <form onSubmit={handleEnviar}>
                <label htmlFor="nome">
                     Nome
                    <input type="text" name="nome" id="nome" placeholder='Nome' onChange={(event) => setNome(event.target.value)} value={nome} required/>
                </label>
                
                <label htmlFor="quantidade">
                    Quantidade
                    <input type="number" name="quantidade" id="quantidade" placeholder='Quantidade' onChange={(event) => setQuantidade(event.target.value)} value={quantidade} required/>
                </label>

               <label htmlFor="valor">
                    Valor
                    <input type="number" name="valor" id="valor" onChange={(event) => setValor(event.target.value)} value={valor} required/>
               </label>

               <label htmlFor="avaliacao">
                    Avaliação
                    <Estrelas onChange={(novaAvaliacao) => setAvaliacao(novaAvaliacao)} valor={avaliacao}/>
               </label>
               
                <Alert show={show} variant="success" className='alerta'>
                <Alert.Heading className='tituto-modal'>Deseja confirmar a alteração?</Alert.Heading>
        
                <div className="d-flex justify-content-end">
                  <Button className='botaoAzul' onClick={() => setShow(false)} variant="outline-success">
                    Não
                  </Button>

                  <Button className='botaoSummit' type='summit' onClick={handleEnviar}>Sim</Button>
                </div>
              </Alert>{!show && <Button onClick={() => setShow(true)}>Enviar</Button>}
         
          
            </form>        
    </div>
  )
}
