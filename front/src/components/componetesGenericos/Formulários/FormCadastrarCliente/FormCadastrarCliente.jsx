import React, { useState } from 'react';
import { GET_CEP } from '../../../../Api';
import { POST_CLIENTE } from '../../../../Api';
import { useNavigate } from 'react-router-dom';
import './FormCadastrarCliente.css';
import { IMaskInput } from "react-imask";

function FormCadastrarCliente() {

  const [nome, setNome] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [validarSenha, setValidarSenha] = useState(true);
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [genero, setGenero] = useState('');
  const [message, setMessage] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const navigate = useNavigate('');


  async function handleEnviar(event) {
    event.preventDefault();

    console.log(
      {
        nome: nome,        
        cpf: cpf,
        email: email,
        dataNascimento: dataNasc,
        senha: senha,
        genero: genero,
        endereco: {
          cep: cep,
          logradouro: logradouro,
          complemento: complemento,
          bairro: bairro,
          localidade: cidade,
          uf: uf
        }
      })
    const { url, options } = POST_CLIENTE({
      nome: nome,
      cpf: cpf,
      email: email,
      dataNascimento: dataNasc,
      senha: senha,
      genero: genero,
      endereco: {
        cep: cep,
        logradouro: logradouro,
        complemento: complemento,
        bairro: bairro,
        localidade: cidade,
        uf: uf,
        tipo: 'FATURAMENTO'
      }
    });

    const response = await fetch(url, options);
    console.log("retorno cadastrar >>>" + response.ok)

    if (response.ok) {
      setMessage('Sucesso ao cadastrar usuário.')
      navigate('/');
    } else {
      setMessage('Erro ao cadastrar usuário.')
    }


  }

  const validarNome = (input) => {
    const words = input.split(' ');

    if (words.length >= 2 && words.every(word => word.length >= 3)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setNome(inputValue);
    validarNome(inputValue);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setSenha(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmarSenha(newConfirmPassword);
  };

  const validadorSenha = () => {
    if (senha === confirmarSenha) {
      setValidarSenha(true);
    } else {
      setValidarSenha(false);
    }
  };

  const handleCPFChange = (event) => {
    const cpfValue = event.target.value.replace(/\D/g, '');
    setCpf(cpfValue);
  };
  
  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  async function getCEP(cep) {
    const cepSemTraco = cep.replace("-", "");
    const { url, options } = GET_CEP(cepSemTraco);
    const response = await fetch(url, options);
    const data = await response.json()


    setCidade(data.localidade)
    setBairro(data.bairro)
    setComplemento(data.complemento)
    setLogradouro(data.logradouro)
    setUf(data.uf.toLowerCase())


  }


  return (

    <div className='estrutura-alt-client'>
      <div className='imagem-client-alt'>
        <img
          className="leite"
          src="src\assets\leite.jpg"
          alt="Imagem de uma garrafinha de leite com canudo"
        />
      </div>
      <div>
        <h1>Cadastro De Cliente</h1>
        <form onSubmit={handleEnviar}>
          <fieldset>

            <legend><h5>Dados Cliente</h5></legend>

            <label htmlFor="nome">NomeCompleto</label>

            <input type="text"
              id="nome"
              value={nome}
              onChange={handleInputChange} 
              placeholder="Digite seu nome completo"
              required
            />

            {!isValid && <p> O nome completo deve conter duas palavras ou mais com no mínimo 3 letras cada. </p>}

            <label htmlFor="genero">Genero</label>
            <select defaultValue="" name="genero" id="genero" onChange={(event) => setGenero(event.target.value)} required>
              <option value="" disabled >Selecione uma opção</option>
              <option value="MASC">MASCULINO</option>
              <option value="FEM">FEMININO</option>
              <option value="OUTROS">OUTROS</option>
            </select>


            <label htmlFor="email">Email</label>
            <input type="email"
              value={email}
              id="email"
              placeholder="Digite seu email"
              onChange={(event) => setEmail(event.target.value)}
              required />

            <label htmlFor="senha">Senha</label>
            <input type="password"
              id="senha" value={senha}
              placeholder="Digite sua senha"
              onChange={handlePasswordChange} required />

            <label htmlFor="repetirSenha">Repetir Senha</label>
            <input type="password" id="repetirSenha" value={confirmarSenha}
              onChange={handleConfirmPasswordChange}
              placeholder="Digite sua senha novamente"
              onBlur={validadorSenha} required />
            {!validarSenha && <p>As senhas não coincidem.</p>}

            <label htmlFor="cpf">CPF</label>
            <IMaskInput
mask="000.000.000-00" 
              value={cpf}
              id="cpf"
              onChange={handleCPFChange}
              placeholder="Digite seu CPF"
              required />

            <label htmlFor="dataNasc">Data De Nascimento</label>
            <input type="date" 
            id="dataNasc" 
            value={dataNasc}
            placeholder="Insira sua data de nascimento"
              onChange={(event) => setDataNasc(event.target.value)} 
              required />



          </fieldset>

          <fieldset>
            <legend><h5>Dados Endereço Faturamento</h5></legend>
            <label htmlFor="cep">CEP</label>
            <IMaskInput 
              mask="00000-000"
              id="cep"
              value={cep}
              placeholder="Digite seu CEP"
              onChange={handleCepChange}
              required
            />

            <button onClick={() => getCEP(cep)}>Consultar CEP</button>

            <label htmlFor="logradouro">Logradouro</label>

            <input
              type="text"
              id="logradouro"
              value={logradouro}
              onChange={(event) => setLogradouro(event.target.value)}
              placeholder="Digite o nome da rua"
              required
            />

            <label htmlFor="numero">Numero</label>
            <input type="number" 
            id="numero" 
            value={numero} 
            onChange={(event) => setNumero(event.target.value)} 
            placeholder="Insira o número da casa ou prédio" 
            required />

            <label htmlFor="complemento">Complemento</label>
            <input type="text"
              id="complemento"
              value={complemento}
              onChange={(event) => setComplemento(event.target.value)}
              placeholder="Digite o bloco e número do apartamento, ou algum ponto de referência"
            />

            <label htmlFor="bairro">Bairro</label>
            <input type="text" 
            id="bairro" 
            value={bairro} 
            onChange={(event) => setBairro(event.target.value)} 
            placeholder="Digite o nome do bairro" 
            required />

            <label htmlFor="cidade">Cidade</label>
            <input type="text" 
            id="cidade" 
            value={cidade} 
            onChange={(event) => setCidade(event.target.value)} 
            placeholder="Digite o nome da sua cidade" 
            required />

            <label htmlFor="uf">UF</label>
            <select name="uf" id="uf" value={uf}
              onChange={(event) => setUf(event.target.value)} required>
              <option value="ac">AC</option>
              <option value="al">AL</option>
              <option value="ap">AP</option>
              <option value="am">AM</option>
              <option value="ba">BA</option>
              <option value="ce">CE</option>
              <option value="df">DF</option>
              <option value="es">ES</option>
              <option value="go">GO</option>
              <option value="ma">MA</option>
              <option value="mt">MT</option>
              <option value="ms">MS</option>
              <option value="mg">MG</option>
              <option value="pa">PA</option>
              <option value="pb">PB</option>
              <option value="pr">PR</option>
              <option value="pe">PE</option>
              <option value="pi">PI</option>
              <option value="rj">RJ</option>
              <option value="rn">RN</option>
              <option value="rs">RS</option>
              <option value="ro">RO</option>
              <option value="rr">RR</option>
              <option value="sc">SC</option>
              <option value="sp">SP</option>
              <option value="se">SE</option>
              <option value="to">TO</option>
            </select>

          </fieldset>
          <button type="submit" id="enviar" onSubmit={handleEnviar} >enviar</button>
          {message && <p>{message}</p>}
        </form>
      </div>

    </div>
  )
}

export default FormCadastrarCliente