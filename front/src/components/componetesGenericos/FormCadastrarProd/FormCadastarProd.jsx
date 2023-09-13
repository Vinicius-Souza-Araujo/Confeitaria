import React from 'react'

export const FormCadastarProd = () => {
    function handleEnviar(event){
        event.preventDefault();
        putProduto();
    }

  return (
    <div>
             <form onSubmit={handleEnviar}>
                <label htmlFor="nome">
                     Nome
                    <input type="text" name="nome" id="nome" placeholder='Nome' required/>
                </label>
                
                <label htmlFor="quantidade">
                    Quantidade
                    <input type="number" name="quantidade" id="quantidade" placeholder='Quantidade' required/>
                </label>

               <label htmlFor="valor">
                    Valor
                    <input type="number" name="valor" id="valor" required/>
               </label>

               <label htmlFor="avaliacao">
                    Avaliação
                    <input type="number" name="avaliacao" id="avaliacao" required/>
               </label>
               
                <select name="status" id="status" required>
                    <option value="" disabled> Selecione uma opção</option>
                    <option value="DESATIVADO">DESATIVADO</option>
                    <option value="ATIVADO">ATIVADO</option>
                </select>

                <button className='botaoRosa' type="submit" >Enviar</button>
          
            </form>  
    </div>
  )
}
