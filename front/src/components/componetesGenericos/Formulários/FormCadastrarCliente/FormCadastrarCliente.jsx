import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { GET_CEP } from '../../../../Api';
import { POST_CLIENTE } from '../../../../Api';
import { useNavigate } from 'react-router-dom';

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


    async function handleEnviar(event){
      event.preventDefault();

      console.log(
        { nome: nome,
        cpf: cpf,
        email: email,
        dataNascimento: dataNasc,
        senha: senha,
        genero: genero,
        endereco:{
          cep: cep,
          logradouro: logradouro,
          complemento: complemento,
          bairro: bairro,
          localidade: cidade,
          uf: uf
        }
      })
      const {url, options} = POST_CLIENTE({
        nome: nome,
        cpf: cpf,
        email: email,
        dataNascimento: dataNasc,
        senha: senha,
        genero: genero,
        endereco:{
          cep: cep,
          logradouro: logradouro,
          complemento: complemento,
          bairro: bairro,
          localidade: cidade,
          uf: uf
        }
      });
      
      const response = await fetch(url, options);
      console.log("retorno cadastrar >>>" + response.ok)

      if (response.ok){
          setMessage('Sucesso ao cadastrar usuário.')
          navigate('/');
      } else{
        setMessage('Erro ao cadastar usuário.')
      }
    
      
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
        setCpf(event.target.value.replace(/\D/g, ''));
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
    <div>
    <h1>Cadastro De Cliente</h1>
    <form onSubmit={handleEnviar}>
        <fieldset>
      
        <legend><h2>Dados Cliente</h2></legend>

        <label htmlFor="nome">NomeCompleto</label>
        
        <input type="text" 
              id="nome" 
              value={nome} 
              onChange={handleInputChange} placeholder="Digite seu nome completo"
              required 
        />

    {!isValid && <p> O nome completo deve conter duas palavras com no mínimo 3 letras cada. </p>}
    
    <select name="genero" id="genero" onChange={(event) => setGenero(event.target.value)} required>
        <option value="" disabled selected>Selecione uma opção</option>
        <option value="MASC">MASC</option>
        <option value="FEM">FEM</option>
        <option value="OUTROS">OUTROS</option>
    </select>


      <label htmlFor="email">Email</label>
      <input type="email" 
            value={email} 
            id="email" 
            placeholder="digite seu email"
            onChange={(event)=>setEmail(event.target.value)} 
            required/>

      <label htmlFor="senha">Senha</label>
      <input type="password" 
             id="senha" value={senha}
             onChange={handlePasswordChange} required/>

      <label htmlFor="repetirSenha">Repetir Senha</label>
      <input type="password" id="repetirSenha" value={confirmarSenha}
      onChange={handleConfirmPasswordChange}
      onBlur={validadorSenha} required />
      {!validarSenha&& <p>As senhas não coincidem.</p>}

      <label htmlFor="cpf">CPF</label>
      <InputMask
             value={cpf}
             id="cpf"
             onChange={handleCPFChange}
             placeholder="Digite seu CPF"
             required  />

      <label htmlFor="dataNasc">Data De Nascimento</label>
      <input type="date" id="dataNasc" value={dataNasc} 
      onChange={(event)=>setDataNasc(event.target.value)} required />


    
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
        required 
      />

      <button onClick={() => getCEP(cep)}>Consultar CEP</button>

      <label htmlFor="logradouro">Logradouro</label>
      
      <input
          type="text"
          id="logradouro"
          value={logradouro}
          onChange={(event) => setLogradouro(event.target.value)}
          placeholder="digite o nome da rua"
          required
      />

      <label htmlFor="numero">Numero</label>
      <input type="number" id="numero" value={numero} onChange={(event)=>setNumero(event.target.value)} placeholder="insira o número da casa ou prédio" required/>

      <label htmlFor="complemento">Complemento</label>
      <input type="text" 
        id="complemento" 
        value={complemento} 
        onChange={(event) => setComplemento(event.target.value)} 
        placeholder="digite o bloco e número do apartamento, ou algum ponto de referência" 
        />

      <label htmlFor="bairro">Bairro</label>
      <input type="text" id="bairro" value={bairro} onChange={(event)=>setBairro(event.target.value)} placeholder="digite o nome do bairro" required/>

      <label htmlFor="cidade">Cidade</label>
      <input type="text" id="cidade" value={cidade} onChange={(event)=>setCidade(event.target.value)} placeholder="digite o nome da sua cidade" required/>

      <label htmlFor="uf">UF</label>

        <select name="uf" id="uf" value={uf} 
            onChange={(event)=>setUf(event.target.value)} required>
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
      <button type="submit" id="enviar" >enviar</button>
      {message && <p>{message}</p>}
    </form>
  </div>
  )
}

export default FormCadastrarCliente