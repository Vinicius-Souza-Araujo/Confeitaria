import React, { useState, useRef } from 'react';
import { IMaskInput } from "react-imask";
import { UserContext } from '../../../../UserContext';
import Error from '../../../../Helper/Error';
import { PATCH_CLIENTE, PATCH_SENHA } from '../../../../Api';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import FormCadastrarEndereco from "../FormCadastrarCliente/FormCadastrarCliente";


export const FormAlterarCliente = (props) => {
  const user = React.useContext(UserContext);
  const [nome_cliente, setNome_cliente] = React.useState(props.nome_cliente);
  const [genero, setGenero] = React.useState(props.genero);
  const [data_nascimento, setData_nascimento] = React.useState(props.data_nascimento);
  const [senha, setSenha] = React.useState('');
  const [confirmarSenha, setConfirmarSenha] = React.useState('');
  const [idCliente, setIdCliente] = React.useState(props.idCliente);
  const [error, setError] = React.useState('');
  const [show, setShow] = useState(false);

  // useRef para acessar a instância de FormCadastrarEndereco
  const formCadastrarEnderecoRef = useRef();

  async function handleSummit(event) {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      setError('Senhas não coincidem.');
      return;
    } else {
      setError('');
    }

    console.log(idCliente);

    const { url, options } = PATCH_CLIENTE({
      idCliente: idCliente,
      nome_cliente: nome_cliente,
      data_nascimento: data_nascimento,
      genero: genero
    }, user.data, idCliente);
    AlterarSenha();

    const response = await fetch(url, options, idCliente);
    setShow(false);
  }

  async function AlterarSenha() {
    const { url, options } = PATCH_SENHA({
      novaSenha: senha
    }, user.data, idCliente);

    const response = await fetch(url, options, idCliente);
  }

  return (
    <div>
      <form onSubmit={handleSummit}>
        <input value={nome_cliente} onChange={(event) => setNome(event.target.value)} type="text" name="nome" id="nome" placeholder='Digite seu nome' required />
        <IMaskInput value={data_nascimento} onChange={handleDataChange} mask="00/00/0000" placeholder="Digite a sua data de nascimento (DD/MM/AAAA)" />
        <select value={genero} onChange={e => setGenero(e.target.value)} name="genero" id="genero">
          <option value="" disabled> Selecione uma opção</option>
          <option value="MASC">Masculino</option>
          <option value="FEM" >Feminino</option>
          <option value="OUTROS" >Outros</option>
        </select>

        {/* Botão para chamar adicionar() de FormCadastrarEndereco */}
        <button onClick={() => formCadastrarEnderecoRef.current.adicionar()}>Adicionar novo endereço</button>

        <input value={senha} onChange={(event) => setSenha(event.target.value)} type="password" name="senha" id="senha" placeholder='Informe a senha' required />
        <input value={confirmarSenha} onChange={(event) => setConfirmarSenha(event.target.value)} type="password" name="confir-senha" id="confir-senha" placeholder='Confirme a senha' required />

        <Alert show={show} variant="success" className='alerta'>
          <Alert.Heading>Deseja confirmar a alteração?</Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Não
            </Button>
            <Button type='summit' onClick={handleSummit}>Sim</Button>
          </div>
        </Alert>
        {!show && <Button onClick={() => setShow(true)}>Enviar</Button>}
      </form>
      <Error error={error} />

      {/* Renderiza o componente FormCadastrarEndereco e associa o ref a ele */}
      <FormCadastrarEndereco ref={formCadastrarEnderecoRef} />
    </div>
  );
}
export default FormAlterarCliente;