import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../../UserContext';
import '../FormAlterarCliente/formClient.css'

const FormAlterarClient = () => {  
    const [nome, setNome] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [genero, setGenero] = useState('')
    const user = useContext(UserContext);
    
   return (
    <div className='estrutura-alt-client'>
        <div className='imagem-client-alt'>
            <img 
                className="sorvete" 
                src="src\assets\sorvete.svg" 
                alt="Imagem de uma casquinha com sorvete de laranja" 
            />
        </div>

        <div className='form-client-alt'>
            <h3>Alterar dados de cadastro</h3>
            <form className='form-client-estru'>
             
                <label htmlFor="nome">Nome</label>
                <input 
                    type="text"
                    name="nome" 
                    id="nome" 
                    placeholder='Nome'
                />

                <label htmlFor="dataNasc">Data De Nascimento</label>
                <input type="date" id="dataNasc" />

                <label htmlFor="genero"> Gênero </label>

                <select name="genero" id="genero">
                    <option value="" disabled selected>Selecione uma opção</option>
                    <option value="MASC">MASC</option>
                    <option value="FEM">FEM</option>
                    <option value="OUTROS">OUTROS</option>
                </select>
            
               <button type="submit">Alterar</button>
            </form>
        </div>
    </div>
  )

}

export default FormAlterarClient
