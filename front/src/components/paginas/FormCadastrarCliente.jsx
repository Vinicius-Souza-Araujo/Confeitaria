import React from 'react'
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

function FormCadastrarCliente({onAddAddress}) {
    const [nome, setNome] =useState("");
    const [isValid, setIsValid] = useState(true);
    const [email, setEmail] =useState("");
    const [senha, setSenha] =useState("");
    const [confirmarSenha, setConfirmarSenha] =useState("");
    const [validarSenha, setValidarSenha] =useState(true);
    const [cpf, setCpf] = useState('');
    const [validarCpf, setValidarCpf] = useState(false);
    const [dataNasc, setDataNasc] = useState('');
    const [masculino, setMasculino] = useState('');
    const [feminino, setFeminino] = useState('');
    const [outro, setOutro] = useState('');
    const [nf, setNf] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [cepE, setCepE] = useState('');
    const [logradouroE, setLogradouroE] = useState('');
    const [numeroE, setNumeroE] = useState('');
    const [complementoE, setComplementoE] = useState('');
    const [bairroE, setBairroE] = useState('');
    const [cidadeE, setCidadeE] = useState('');
    const [ufE, setUfE] = useState('');    
    const [enderecos, setEnderecos] = useState([])
    const navigate=useNavigate('')

    const adicionar = () => {
      const novoEndereco={cepE, logradouroE, numeroE, complementoE, bairroE, cidadeE, ufE}
      setEnderecos([...enderecos, novoEndereco])
      setCepE('')
      setLogradouroE('')
      setNumeroE('')
      setComplementoE('')
      setBairroE('')
      setCidadeE('')
      setUfE('')

    }

  const validarNome= (input) => {
    const words = input.split(' ');
    
    if (words.length === 2 && words.every(word => word.length >= 3)) {
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

  const validadorSenha= () => {
    if (senha === confirmarSenha) {
      setValidarSenha(true);
    } else {
      setValidarSenha(false);
    }
  };

  const handleCPFChange = (event) => {
    const cpfValue = event.target.value.replace(/\D/g, '');
    setCpf(cpfValue);
  }

  const handleCepChange = (e) => {
      setCep(e.target.value);
};

const handleCepEChange = (e) => {
  setCepE(e.target.value);
};


  return (
    <div>
    <h1>Cadastro De Cliente</h1>
    <form >
    <fieldset>
    <legend><h2>Dados Cliente</h2></legend>  
    <label htmlFor="nome">NomeCompleto</label>
    <input type="text" id="nome" value={nome} 
    onChange={handleInputChange} placeholder="Digite seu nome completo"
required />
{!isValid && <p>O nome completo deve conter duas palavras com no mínimo 3 letras cada.</p>}

    <label htmlFor="email">Email</label>
    <input type="email" value={email} id="email" placeholder="digite seu email"
            onChange={(event)=>setEmail(event.target.value)} required/>

<label htmlFor="senha">Senha</label>
<input type="password" id="senha" value={senha}
            onChange={handlePasswordChange} required/>

<label htmlFor="repetirSenha">Repetir Senha</label>
<input type="password" id="repetirSenha" value={confirmarSenha}
onChange={handleConfirmPasswordChange}
onBlur={validadorSenha} required           />
{!validarSenha&& <p>As senhas não coincidem.</p>}

<label htmlFor="cpf">CPF</label>
<InputMask
        mask="999.999.999-99"
        value={cpf}
        id="cpf"
        onChange={handleCPFChange}
        placeholder="Digite seu CPF"
        required  
    />

<label htmlFor="dataNasc">Data De Nascimento</label>
    <input type="date" id="dataNasc" value={dataNasc} 
onChange={(event)=>setDataNasc(event.target.value)} required />

    <label htmlFor="genero">Gênero</label>
<label htmlFor="masculino">Masculino</label>
  <input type="radio" name="genero" id="masculino" value={masculino} onChange={(event)=>setMasculino(event.target.value)} />
  <label htmlFor="feminino">Feminino</label>
  <input type="radio" name="genero" id="feminino" value={feminino} onChange={(event)=>setFeminino(event.target.value)} />
  <label htmlFor="outro">Outro</label>
  <input type="radio" name="genero" id="outro" value={outro} onChange={(event)=>setOutro(event.target.value)} />
  <label htmlFor="naoInformar">Não informar</label>
  <input type="radio" name="genero" id="naoInformar" value={nf} onChange={(event)=>setNf(event.target.value)} />
</fieldset>

<fieldset>
    <legend><h2>Dados Endereço Faturamento</h2></legend>
    
    <label htmlFor="cep">CEP</label>
    <InputMask
        mask="99999-999"
        id="cep"
        value={cep}
        placeholder="digite seu cep"
        onChange={handleCepChange}
      required />

<label htmlFor="logradouro">Logradouro</label>
<input type="text" id="logradouro" value={logradouro} onChange={(event)=>setLogradouro(event.target.value)} placeholder="digite o nome da rua" required/>

<label htmlFor="numero">Numero</label>
<input type="number" id="numero" value={numero} onChange={(event)=>setNumero(event.target.value)} placeholder="insira o número da casa ou prédio" required/>

<label htmlFor="complemento">Complemento</label>
<input type="text" id="complemento" value={complemento} onChange={(event)=>setComplemento(event.target.value)} placeholder="digite o bloco e número do apartamento, ou algum ponto de referência" required/>

<label htmlFor="bairro">Bairro</label>
<input type="text" id="bairro" value={bairro} onChange={(event)=>setBairro(event.target.value)} placeholder="digite o nome do bairro" required/>

<label htmlFor="cidade">Cidade</label>
<input type="text" id="cidade" value={cidade} onChange={(event)=>setCidade(event.target.value)} placeholder="digite o nome da sua cidade" required/>

      <label htmlFor="uf">UF</label>
<select name="uf" id="uf" value={uf} 
        onChange={(event)=>setUf(event.target.value)} required>
            <option value="AC">AC</option>
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
    
    <fieldset>
    <legend><h2>Dados Endereço De Entrega</h2></legend>
    
    <label htmlFor="cep">CEP</label>
<InputMask
        mask="99999-999"
        id="cepE"
        value={cepE}
        placeholder="digite seu cep"
        onChange={handleCepEChange}
      required />

<label htmlFor="logradouro">Logradouro</label>
<input type="text" id="logradouroE" value={logradouroE} onChange={(event)=>setLogradouroE(event.target.value)} placeholder="digite o nome da rua" required />

<label htmlFor="numero">Numero</label>
<input type="number" id="numeroE" value={numeroE} onChange={(event)=>setNumeroE(event.target.value)} placeholder="insira o número da casa ou prédio" required />

<label htmlFor="complemento">Complemento</label>
<input type="text" id="complementoE" value={complementoE} onChange={(event)=>setComplementoE(event.target.value)} placeholder="digite o bloco e número do apartamento, ou algum ponto de referência" required />

<label htmlFor="bairro">Bairro</label>
<input type="text" id="bairroE" value={bairroE} onChange={(event)=>setBairroE(event.target.value)} placeholder="digite o nome do bairro" required />

<label htmlFor="cidade">Cidade</label>
<input type="text" id="cidadeE" value={cidadeE} onChange={(event)=>setCidadeE(event.target.value)} placeholder="digite o nome da sua cidade" required />

      <label htmlFor="uf">UF</label>
<select name="uf" id="ufE" value={ufE} 
onChange={(event)=>setUfE(event.target.value)} required >
    <option value="AC">AC</option>
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

<button onClick = {adicionar}>adicionar novo endereço de entrega</button>
    </fieldset>

    
    <input type="submit" id="enviar" />
</form>

<div>
  {enderecos.map((endereco, index) => (
<div key = {index}>
  <h3>endereço de entrega{index+1}</h3>
  <p>cep: {endereco.cepE}</p>
<p>logradouro: {endereco.logradouroE}</p>
<p>numero: {endereco.numeroE}</p>
<p>complemento: {endereco.complementoE}</p>
<p>bairro: {endereco.bairroE}</p>
<p>uf: {endereco.ufE}</p>
</div>
  ))}
</div>

</div>
  )
}

export default FormCadastrarCliente