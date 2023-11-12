import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../../UserContext';
import { Link } from 'react-router-dom';
import { GET_CLIENTE, PATCH_CLIENTE } from '../../../../Api';
import { Endereco } from '../../Endereco/Endereco';
import '../FormAlterarCliente/formClient.css'

const FormAlterarClient = () => {  
    const [nome, setNome] = useState('')
    const [dataNasc, setDataNasc] = useState()
    const [genero, setGenero] = useState('')
    const [senha, setSenha] = useState('')
    const [repetirSenha, setRepetirSenha] = useState('')
    const [validarSenha, setValidarSenha] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const user = useContext(UserContext);
    
    useEffect(() => {  
       get_cliente()
      }, []); 

      async function get_cliente(){
        const {url, options} = GET_CLIENTE(user.data.id);
        const response = await fetch(url, options);
        
        if (response.ok) {
            const data = await response.json();
            setNome(data.nome)
            setGenero(data.genero)
            setDataNasc(data.dataNascimento)
            setSenha(data.senha)
            setRepetirSenha(data.senha)
        } else {
            console.error('Erro ao procurar dados do cliente');
        }
    }

    async function alterarCliente(event){
        event.preventDefault();
        const {url, options} = PATCH_CLIENTE({
            nome:nome,
            genero: genero,
            dataNascimento: dataNasc,
            senha: senha
        }, user.data.id);

        const response = await fetch(url, options)


        console.log(response)
    }

    const validadorSenha= () => {
        if (senha === repetirSenha) {
          setValidarSenha(true);
        } else {
          setValidarSenha(false);
        }
      };


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
                    onChange={(event) => setNome(event.target.value)}
                    type="text"
                    name="nome" 
                    id="nome" 
                    placeholder='Digite seu nome'
                    value={nome}
                />

                <label htmlFor="dataNasc">Data De Nascimento</label>
                <input onChange={(event) => {setDataNasc(event.target.value)}} type="date" id="dataNasc" value={dataNasc} />

                <label htmlFor="genero"> Gênero </label>

                <select onChange={(event) => setGenero(event.target.value)} name="genero" id="genero" value={genero}>
                    <option value="">Selecione uma opção</option>
                    <option value="MASC">Masculino</option>
                    <option value="FEM">Feminino</option>
                    <option value="OUTROS">Outros</option>
                </select>

                <label htmlFor="senha">Senha</label>
                <input type="password" 
                        id="senha" 
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)} 
                        />

                <label htmlFor="repetirSenha">Repetir Senha</label>
                <input 
                    type="password" 
                    id="repetirSenha" 
                    value={repetirSenha}
                    onChange={(event) => setRepetirSenha(event.target.value)}
                    onBlur={validadorSenha}/>
                
                {!validarSenha&& <p>As senhas não coincidem.</p>}
                
                <Link to="/alterarEnderenco"><button className='botaoAzul'>Atualizar endereço</button></Link>            
                <button className='botaoAzul'onClick={alterarCliente} type="submit">Alterar dados pessoais</button>
                
            </form>
        </div>
    </div>
  )

}

export default FormAlterarClient
