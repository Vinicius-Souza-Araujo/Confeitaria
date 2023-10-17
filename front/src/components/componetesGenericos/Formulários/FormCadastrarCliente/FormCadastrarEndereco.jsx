import React from 'react'
import { useState } from 'react';



function FormCadastrarEndereco() {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
const [enderecos, setEnderecos] = useState([])
    
const adicionar = () => {
const novoEndereco={numero, logradouro}
setEnderecos([...enderecos, novoEndereco])
setLogradouro("")
setNumero("")
}

  return (
    <div>
<h1>Cadastrar Endereço</h1>
<h2>novo endereço</h2>
<form>
<label for="logradouro">Logradouro</label>
<input type="text" id="logradouro" value={logradouro} onChange={(event)=>setLogradouro(event.target.value)} placeholder="digite o nome da rua" required/>

<label for="numero">Numero</label>
<input type="number" id="numero" value={numero} onChange={(event)=>setNumero(event.target.value)} placeholder="insira o número da casa ou prédio" required/>

<button onClick = {adicionar}>adicionar</button>
</form>

<div>
  {enderecos.map((endereco, index) => (
<div key = {index}>
  <h3>endereço {index+1}</h3>
<p>logradouro: {endereco.logradouro}</p>
<p>numero: {endereco.numero}</p>
</div>
  ))}
</div>
        </div>
  )
}

export default FormCadastrarEndereco