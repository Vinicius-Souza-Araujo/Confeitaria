import React from 'react'
import { useState } from 'react'
import { IMaskInput } from "react-imask";
import { cpf } from 'cpf-cnpj-validator';
import { UserContext } from '../../../../UserContext';
import Error from '../../../../Helper/Error';
import { PATCH_USER, PATCH_SENHA } from '../../../../Api';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export const FormAlterarUser = (props) => {

  const user = React.useContext(UserContext);
  const [nome, setNome] = React.useState(props.nome);
  const [cpfUsuario, setCpfUsuario] = React.useState(props.cpfUsuario);
  const [grupo, setGrupo] = React.useState(props.grupo);
  const [senha, setSenha] = React.useState('');
  const [confirmarSenha, setConfirmarSenha] = React.useState('');
  const [id, seId] = React.useState(props.id);
  const [error, setError] = React.useState('');
  const [show, setShow] = useState(false);



    const handleCpfChange = (event) => {
        const cpfValue = event.target.value.replace(/\D/g, '');
        setCpfUsuario(cpfValue);
      }
    
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

    console.log(id)

    const {url, options} = PATCH_USER ({
      id: id,
      nome: nome,
      cpf : cpfUsuario,
      grupo :grupo
    }, user.data.token, id);
    AlterarSenha()

    const response = await fetch(url, options, id);
    setShow(false)
}

async function AlterarSenha(){
  const {url, options} = PATCH_SENHA ({
    novaSenha: senha
  }, user.data.token, id)

  const response = await fetch(url, options, id);
}

  return (
    <div>
        <form onSubmit={handleSummit}>
                <input value={nome} onChange={(event) => setNome(event.target.value)} type="text" name="nome" id="nome" placeholder='Digite seu nome' required/>
                <IMaskInput value={cpfUsuario} onChange={handleCpfChange} mask="000.000.000-00" placeholder="Digite o seu CPF"/>
                <select value={grupo} onChange={e => setGrupo(e.target.value)}   name="grupo" id="grupo">
                <option value="" disabled> Selecione uma opção</option>
                <option value="ADM">Administrador</option>
                <option value="ESTOQUISTA" >Estoquista</option>
                </select>
                
                <input value={senha} onChange={(event) => setSenha(event.target.value)} type="password" name="senha" id="senha" placeholder='Informe a senha' required/>            
                <input value={confirmarSenha} onChange={(event) => setConfirmarSenha(event.target.value)}  type="password" name="confir-senha" id="confir-senha" placeholder='Confirme a senha' required/>
                
                <Alert show={show} variant="success" className='alerta'>
                <Alert.Heading>Deseja confirmar a alteração?</Alert.Heading>

                <div className="d-flex justify-content-end">
                  <Button onClick={() => setShow(false)} variant="outline-success">
                    Não
                  </Button>

                  <Button type='summit' onClick={handleSummit}>Sim</Button>
                </div>
              </Alert>{!show && <Button onClick={() => setShow(true)}>Enviar</Button>}
         
            </form>
            <Error error={error} />
    </div>
  

  )
}
