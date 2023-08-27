import React from 'react'
import InputMask from 'react-input-mask';
import './form.css'

function Form() {

  return (
    <div>
        <form>
            <input type="text" name="nome" id="nome" placeholder='Nome completo' required/>
            <input type="email" name="email" id="email" placeholder='exemplo@gmail.com' required/>
            <InputMask placeholder='CPF' name="cpf" id="cpf" mask="999.999.999-99" required></InputMask>
            <input type="text" name="grupo" id="grupo" placeholder='Grupo' required />
            <input type="password" name="senha" id="senha" placeholder='Informe a senha' required/>            
            <input type="password" name="confir-senha" id="confir-senha" placeholder='Confirme a senha' required/>
            <input className='botaoSummit' type="submit" value="Confirma" />    
        </form>
    </div>
  )
}

export default Form