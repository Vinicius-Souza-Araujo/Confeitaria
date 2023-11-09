import React, { useState } from 'react';
import { GET_ENDERENCO, GET_CEP, POST_ENDERENCO, PATCH_STATUS_ENDERENCO } from '../../../Api';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../../UserContext';
import './Endereco.css'

export const Endereco = () => {
  const user = useContext(UserContext);
  const [enderencos, setEnderenco] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState()
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
    if (name === "cep" && value.length === 8 && !isNaN(value)) {
      setNovoEndereco({ ...novoEndereco, [name]: value });
      getCEP(value);
    } else {
      setNovoEndereco({ ...novoEndereco, [name]: value });
    }
  };
  

  const handleAdicionarEndereco = () => {
    setShowForm(true);
  };

  async function handleStatus(id, novoStatus, body){
    if(novoStatus === 'ATIVADO') { novoStatus = 'DESATIVADO'}
    else if (novoStatus === 'DESATIVADO'){ novoStatus = 'ATIVADO'}
    const {url, options} = PATCH_STATUS_ENDERENCO({...body, statusEndereco: novoStatus}, id);
    const response = await fetch(url, options);
    console.log(response)
    get_enderenco()
  }

  const handleSubmitNovoEndereco = (e) => {
    e.preventDefault();
    const enderenco = { ...novoEndereco, clientId: user.data.id, tipo: 'ENTREGA', statusEndereco: 'ATIVADO' } 
    cadastrarEnderenco(enderenco)
    setEnderenco([...enderencos, enderenco]);
    setNovoEndereco({ logradouro: '', numero: '', bairro: '', cep: '', localidade:'', uf: '', complemento:'' });
    setShowForm(false);
  };

  async function cadastrarEnderenco (endereco) {
      const {url, options} = POST_ENDERENCO(endereco);
      const response = await fetch(url, options)
      console.log(response)
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
    <div className='estrutura-alt-enderenco'>

      <div>
            <img 
                className="sorvete" 
                src="src\assets\leite.svg" 
                alt="Imagem com três garrafinhas de leite e dois donuts sabor morango" 
                 
            />
      </div>

      <div className='estrutura-enderenco'>
            <h2>Endereço de entrega</h2>

            {showForm ? (              
              <form  class='form-novoEnderenco' onSubmit={handleSubmitNovoEndereco}>

                <div>
                  <label htmlFor="Cep">CEP</label>
                  <input
                    type="text"
                    name="cep"
                    placeholder="CEP"
                    value={novoEndereco.cep || ''}
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
                /> <label htmlFor="numero">Número</label><input
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
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
              </select>
                
                <button className='botaoRosa'>Adicionar</button>

                <br />
                <br />

              </form>
              ) : (
              <button className='botaoRosa' onClick={handleAdicionarEndereco}>Adicionar endereço</button>
            )}

                {enderencos.length > 0 ? (
                    enderencos.map((endereco, index) => {
                      if (endereco.tipo === 'ENTREGA') {
                        return (
                          <div className='form-endereco' key={index}>
                              <br />
                              <h4 className='titulo-enderenco'>Enderenço n° {index} </h4>
                              <br />
                              <p><b>CEP:</b>{endereco.cep}</p>
                              <p><b>Logradouro:</b> {endereco.logradouro}, <b>Número:</b> {endereco.numero}</p>
                              <p><b>Bairro</b> {endereco.bairro}, {endereco.localidade} - {endereco.uf}</p>
                              <p><b>Complemento:</b> {endereco.complemento}</p>
                            
                            <div className='botao-desativar'>
                              <button className='botaoAzul' 
                                  onClick={() => handleStatus(endereco.id, 
                                    endereco.statusEndereco, 
                                    {bairro: endereco.bairro, 
                                    logradouro: endereco.logradouro, 
                                    cep: endereco.cep, 
                                    localidade: endereco.localidade,
                                    complemento: endereco.complemento,
                                    uf: endereco.uf
                                    })}>
                                    {endereco.statusEndereco}
                              </button>
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
        
      </div>
      
    </div>
  );
};
