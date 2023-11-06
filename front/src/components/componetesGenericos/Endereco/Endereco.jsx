import React, { useState } from 'react';
import { GET_ENDERENCO, GET_CEP } from '../../../Api';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../../UserContext';
import './Endereco.css'

export const Endereco = () => {
  const user = useContext(UserContext);
  const [enderencos, setEnderenco] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [novoEndereco, setNovoEndereco] = useState({ logradouro: '', numero: '', bairro: '', cep: '', localidade: '', uf: '', complemento: ''});

  useEffect(() => {
    get_enderenco();
  }, []);

  async function get_enderenco() {
    const { url, options } = GET_ENDERENCO(user.data.id);
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      setEnderenco(data);
    } else {
      console.error('Erro ao procurar dados do cliente');
    }
  }

  const handleNovoEnderecoChange = (e) => {
    const { name, value } = e.target;
    setNovoEndereco({ ...novoEndereco, [name]: value });
  };

  const handleAdicionarEndereco = () => {
    setShowForm(true);
  };

  const handleSubmitNovoEndereco = (e) => {
    e.preventDefault();
    setEnderenco([...enderencos, { ...novoEndereco, tipo: 'ENTREGA', statusEndereco: 'ATIVADO' }]);
    setNovoEndereco({ logradouro: '', numero: '', bairro: '', cep: '', localidade:'', uf: '', complemento:'' });
    setShowForm(false);
  };

  async function CadastrarEnderenco () {
      
  }

  async function getCEP(cep) {
    const cepSemTraco = cep.replace("-", "");
    const { url, options } = GET_CEP(cepSemTraco);
    const response = await fetch(url, options);
    const data = await response.json();

    setNovoEndereco((prevEndereco) => ({
      ...prevEndereco,
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade, 
      uf: data.uf.toLowerCase(),
      complemento: data.complemento
    }));
  }

  return (
    <div className='body'>
      <h2>Endereço de entrega</h2>

      {enderencos.length > 0 ? (
          enderencos.map((endereco, index) => {
            if (endereco.tipo === 'ENTREGA') {
              return (
                <div className='form-endereco' key={index}>
                  <div className='dados_enderenco'>
                    <br />
                    <h3 className='titulo-enderenco'>Enderenço n° {index} </h3>
                    <br />
                    <p><b>CEP:</b>{endereco.cep}</p>
                    <p><b>Logradouro:</b> {endereco.logradouro}, <b>Número:</b> {endereco.numero}</p>
                    <p><b>Bairro</b> {endereco.bairro}, {endereco.localidade} - {endereco.uf}</p>
                    <p><b>Complemento:</b> {endereco.complemento}</p>
                  </div>
    
                  <div className='botao-desativar'>
                    <button>{endereco.statusEndereco}</button>
                  </div>

                </div>
              );
            }
          })
      ) : (
        <div>
          <p>Nenhum endereço de entrega cadastrado</p>
        </div>
      )}

      {showForm ? (

        
        <form onSubmit={handleSubmitNovoEndereco}>
          <div>
            <label htmlFor="Cep">CEP</label>
            <input
                type="text"
                name="cep"
                placeholder="CEP"
                value={novoEndereco.cep}
                onChange={handleNovoEnderecoChange}
                onBlur={() => getCEP(novoEndereco.cep)}
            />

          </div>
         

          <label htmlFor="logradouro">Logradouro</label>
          <input
            type="text"
            name="logradouro"
            placeholder="Logradouro"
            value={novoEndereco.logradouro}
            onChange={handleNovoEnderecoChange}
          />

        <label htmlFor="numero">Número</label>
          <input
            type="number"
            name="numero"
            placeholder="numero"
            value={novoEndereco.numero}
            onChange={handleNovoEnderecoChange}
          />
          
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={novoEndereco.bairro}
            onChange={handleNovoEnderecoChange}
          />

          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            name="Cidade"
            placeholder="Cidade"
            value={novoEndereco.localidade}
            onChange={handleNovoEnderecoChange}
          />

        <label htmlFor="complemento">Complemento</label>
        <input
            type="text"
            name="complemento"
            placeholder="Complemento"
            value={novoEndereco.complemento}
            onChange={handleNovoEnderecoChange}
        />

        <label htmlFor="uf">UF</label>
        <select 
            name="uf" 
            id="uf" 
            value={novoEndereco.uf}
            onChange={handleNovoEnderecoChange} >
            <option value="">Selecione um estado</option>
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
          
          <button>Adicionar</button>
        </form>
      ) : (
        <button onClick={handleAdicionarEndereco}>Adicionar endereço</button>
      )}
    </div>
  );
};
