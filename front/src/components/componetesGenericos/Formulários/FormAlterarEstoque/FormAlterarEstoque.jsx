import React from 'react'
import { useState } from 'react'
import { PATCH_ESTOQUE } from '../../../../Api';
import { UserContext } from '../../../../UserContext';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


export const FormAlterarEstoque = (props) => {
    const [quantidade, setQuantidade] = useState(props.quantidade);
    const [id, setId] = useState(props.id);
    const [show, setShow] = useState(false);
    const user = React.useContext(UserContext);
    

    async function putProduto(){
        console.log(id);
        const {url, options} = PATCH_ESTOQUE({
            quantidade: quantidade
        }, id);
        const response = await fetch(url, options);
        setShow(false)    
    }

    function handleEnviar(event){
        event.preventDefault();
        putProduto();
        setShow(false);
    }

  return (
    <div> 
            
            <form onSubmit={handleEnviar}>
 
                <label htmlFor="quantidade">
                    Quantidade
                    <input type="number" name="quantidade" id="quantidade" placeholder='Quantidade' onChange={(event) => setQuantidade(event.target.value)} value={quantidade} required/>
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
