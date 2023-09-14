import React from 'react'
import { useState } from 'react'
import { POST_PRODUTO } from '../../../Api';
import { UserContext } from '../../../UserContext';
import { Estrelas } from '../../componetesGenericos/Estrelas/Estrelas';

export const FormCadastarProd = () => {
    function handleEnviar(event){
        event.preventDefault();
        putProduto();
    }
    const [avaliacao, setAvaliacao] = useState(0.5);

  return (
    <div>
             <form onSubmit={handleEnviar}>
                <label htmlFor="nome">
                     Nome
                    <input type="text" name="nome" id="nome" required/>
                </label>
                
                <label htmlFor="quantidade">
                    Quantidade
                    <input type="number" name="quantidade" id="quantidade" required/>
                </label>

               <label htmlFor="valor">
                    Valor
                    <input type="number" name="valor" id="valor" required/>
               </label>

               <label htmlFor="avaliacao">
                    Avaliação
                    <Estrelas onChange={(novaAvaliacao) => setAvaliacao(novaAvaliacao)} value={avaliacao}/>
               </label>
               
               <label htmlFor="status">
                Status
               <select name="status" id="status" required>
                    <option value="" disabled> Selecione uma opção</option>
                    <option value="DESATIVADO">DESATIVADO</option>
                    <option value="ATIVADO">ATIVADO</option>
                </select>
               </label>
               

                <button className='botaoRosa' type="submit" >Enviar</button>
          
            </form>  
    </div>
  )
}
