import React from 'react'
import { IMaskInput } from "react-imask";
import './form.css'

function Form() {

  const handleSummit = (e) => {
    e.preventDefaut();
    console.log('Teste');
  }

  return (
    <div>
        <form onSubmit={handleSummit}>
            <input type="text" name="nome" id="nome" placeholder='Digite seu nome' required/>
            <input type="email" name="email" id="email" placeholder='Digite seu email' required/>
            <IMaskInput mask="000.000.000-00" placeholder="Digite o seu CPF"/>
            <input type="text" name="grupo" id="grupo" placeholder='Grupo' required />
            <input type="password" name="senha" id="senha" placeholder='Informe a senha' required/>            
            <input type="password" name="confir-senha" id="confir-senha" placeholder='Confirme a senha' required/>
            <input className='botaoSummit' type="submit" value="Confirma" />    
        </form>
    </div>
  )
}

export default Form