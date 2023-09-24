import React from 'react';
import { IMaskInput } from "react-imask";
import './form.css';
import { POST_USER } from '../../../../Api';
import Error from '../../../../Helper/Error';
import { cpf } from 'cpf-cnpj-validator';
import { UserContext } from '../../../../UserContext';

function Form() {

  const user = React.useContext(UserContext);
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [cpfUsuario, setCpfUsuario] = React.useState('');
  const [grupo, setGrupo] = React.useState("ADM");
  const [senha, setSenha] = React.useState('');
  const [confirmarSenha, setConfirmarSenha] = React.useState('');
  const [error, setError] = React.useState('');

  async function handleSummit(event) {
    event.preventDefault();
    
    if(senha != confirmarSenha){
      setError('Senhas não coincidem.');
      return;
    }
    else{
      setError('');
    }

    if(!cpf.isValid(cpfUsuario)){
      setError('CPF inválido.');
      return;
    }
    else{
      setError('');
    }

    const {url, options} = POST_USER({
      nome: nome,
      email: email,
      senha: senha,
      cpf : cpfUsuario,
      grupo :grupo
    }, user.data.token);

    const response = await fetch(url, options);

    if (response.ok) {
      setNome('');
      setEmail('');
      setCpfUsuario('');
      setGrupo('ADM');
      setSenha('');
      setConfirmarSenha('');
      setError('');
  
  } else {
    try {
      const data = await response.json();
      setError(data.message);
    } catch (error) {
      setError('Ocorreu um erro ao processar a solicitação.');
    }
  }

  }

 

  const handleCpfChange = (event) => {
    const cpfValue = event.target.value.replace(/\D/g, '');
    setCpfUsuario(cpfValue);
  }

  return (
    <div className='formulario-form'>
        <form onSubmit={handleSummit}>
            <input value={nome} onChange={(event) => setNome(event.target.value)} type="text" name="nome" id="nome" placeholder='Digite seu nome' required/>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" name="email" id="email" placeholder='Digite seu email' required/>
            <IMaskInput value={cpfUsuario} onChange={handleCpfChange} mask="000.000.000-00" placeholder="Digite o seu CPF"/>
            <select value={grupo} onChange={e => setGrupo(e.target.value)}   name="grupo" id="grupo">
              <option value="" disabled> Selecione uma opção</option>
              <option value="ADM">Administrador</option>
              <option value="ESTOQUISTA" >Estoquista</option>
            </select>
            
            <input value={senha} onChange={(event) => setSenha(event.target.value)} type="password" name="senha" id="senha" placeholder='Informe a senha' required/>            
            <input value={confirmarSenha} onChange={(event) => setConfirmarSenha(event.target.value)}  type="password" name="confir-senha" id="confir-senha" placeholder='Confirme a senha' required/>
            <button  className='botaoSummit' value="Confirma">Confirma</button>    
        </form>
        <Error error={error} />
    </div>
  )
}

export default Form