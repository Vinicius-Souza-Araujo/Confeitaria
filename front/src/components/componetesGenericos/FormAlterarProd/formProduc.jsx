import React from 'react'
import { useState } from 'react'
import { PUT_PRODUTOS } from '../../../Api';
import { UserContext } from '../../../UserContext';
import { Estrelas } from '../../componetesGenericos/Estrelas/Estrelas';


export const FormProduc = (props) => {
    
    const [nome, setNome] = useState(props.nome);
    const [quantidade, setQuantidade] = useState(props.quantidade);
    const [status, setStatus] = useState(props.status);
    const [valor, setValor] = useState(props.valor);
    const [avaliacao, setAvaliacao] = useState(props.avaliacao);
    const [id, setId] = useState(props.id);

    const user = React.useContext(UserContext);
    

    async function putProduto(){
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
               
                <select name="status" id="status" onChange={(event) => setStatus(event.target.value)} value={status} required>
                    <option value="" disabled> Selecione uma opção</option>
                    <option value="DESATIVADO">DESATIVADO</option>
                    <option value="ATIVADO">ATIVADO</option>
                </select>

                <button className='botaoRosa' type="submit" >Enviar</button>
          
            </form>        
    </div>
  )
}
