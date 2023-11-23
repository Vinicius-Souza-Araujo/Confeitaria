import React, { useState, useEffect } from 'react';
import { GET_CEP, GET_VALOR_FRETE, POST_PEDIDO, GET_ENDERENCO } from '../../../Api';
import { useCart } from '../../componetesGenericos/ItemCarrinho/CartContext';
import { UserContext } from '../../../UserContext';
import { useNavigate, Link } from 'react-router-dom';
import './Carrinho.css';

const Carrinho = () => {
  const [enderecoEntrega, setEnderecoEntrega] = useState([]);
  const [idEnderenco, setIdEnderenco] = useState('')
  const [enderecoEntregaLogin, setEnderecoEntregaLogin] = useState([]);
  const user = React.useContext(UserContext);
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(0);
  const [tipoEntrega, setTipoEntrega] = useState('')
  const { cartState, clearCart, dispatch } = useCart();
  const [subTotal, setSubTotal] = useState(parseFloat(cartState.totalValor));
  const [total, setTotal] = useState(parseFloat(cartState.totalValor));
  const navigate = useNavigate('')
  const url_img = "http://localhost:8080/api/imagens/acessar/";
  
  
  async function geradoPedido() {

    const itensDoCarrinho = cartState.cartItems.map((item) => {
      return {
        idProduto: item.id,
        quantidade: item.quantidade,
      };
    });

    const Bodyjson = {
      idCliente: user.data.id,
      itens: itensDoCarrinho,
      status: 'AGUARDANDO_PAGAMENTO',
      idEndereco: enderecoEntrega.id
    }

    console.log(Bodyjson)
    
    const {url, options} = POST_PEDIDO(Bodyjson);

    const response = await fetch(url, options)
    const responseBody = await response.text();
    const idPedidoFinal = (responseBody.match(/Pedido ID: (\d+)/))[1]
    navigate(`/pagamento/${idPedidoFinal}`);
  }

  useEffect(() => {
    get_enderenco();
    incrementar();
  }, []);


  useEffect(() => {
    setTotal(parseFloat(cartState.totalValor) + parseFloat(frete));
  }, [cartState, frete]);
  
  
  

  async function get_enderenco() {

    if (user.data.id != ''){
        const { url, options } = GET_ENDERENCO(user.data.id);
        const response = await fetch(url, options);
      
        if (response.ok) {
          const data = await response.json();
          setEnderecoEntregaLogin(data);
        } else {
          console.error('Erro ao procurar dados do cliente');
        }
  }
  }

  async function incrementar(index) {
    const updatedCart = [...cartState.cartItems];
    updatedCart[index].quantidade += 1;
    dispatch({ type: 'SET_CART', payload: updatedCart });
  }
  
  
  async function decrementar(index) {
    const updatedCart = [...cartState.cartItems];
    if (updatedCart[index].quantidade > 0) {
      updatedCart[index].quantidade -= 1;
      dispatch({ type: 'SET_CART', payload: updatedCart });
    }
  }
  

  const handleRemoveItem = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: itemId } });
  };
  

  async function calcularFrete() {
    const { url, options } = GET_VALOR_FRETE(cep);
  
    const response = await fetch(url, options);
    const data = await response.json();
  
    if (response.ok) {
      let novoFrete = 0;
      
      if (tipoEntrega === 'entrega-rapida') {
        novoFrete = parseFloat(data.valorFrete) * 1.5;
      } else if (tipoEntrega === 'entrega-correios') {
        novoFrete = parseFloat(data.valorFrete) * 2;
      } else {
        novoFrete = parseFloat(data.valorFrete);
      }
      setFrete(novoFrete);
      dispatch({ type: 'CALCULAR_FRETE', payload: novoFrete });
    } else {
      console.error(response);
    }
  }
  
  
  async function getCEP(cep) {
    const { url, options } = GET_CEP(cep);
    const response = await fetch(url, options);
    const data = await response.json();

    setEnderecoEntrega({
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf.toLowerCase(),
      complemento: data.complemento
    });
  }

  const handleRemoveAllItems = () => {
  clearCart();
  setTotal(parseFloat(frete));
  setSubTotal(0);
};



  return (
    <div className='body-carrinho'>
      <div className='img-logo-carrinho'>
        <img className="logo_login" src="/public/logo.png" alt="logo do site" />
      </div>

      <div className='remover-todos-itens'>
              <button className='botao-remover-itens' onClick={handleRemoveAllItems}>
                <img src="src\assets\lixo.svg" width={30}/>Remover todos os itens
              </button>
            </div>
     
      <div className='estrutura-carrinho-base'>
        

        <div className='estrutura-itens'>
    
          <div className='produtos-carrinho'>
          <div className='itens-carrinho'>
  {cartState.cartItems.map((item, index) => {
    const imagemTrue = item.imagens.find((imagem) => imagem.flag === false);
    const imgNome = imagemTrue ? imagemTrue.nome : '';
    return (
      <div key={index} className='card-item-pedidos'>
        <div className='dados-textuais-item'>
          <div>
            <img className='img-card' src={url_img + imgNome} />
          </div>
          <div>
            <h4>{item.nome}</h4>
            <p>
              {(item.valor || 0).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>
        </div>
        <div>
          <button className='continuar-compra' onClick={() => decrementar(index)}>{'<'}</button>{item.quantidade}
          <button className='continuar-compra' onClick={() => incrementar(index, dispatch) }>{'>'}</button>
          <button className='continuar-compra' onClick={() => {handleRemoveItem(item.id)}}>Remover item</button>
        </div>
      </div>
    );
  })}
</div>

          </div>

        </div>

        <div className='resumo-pedido'>
                  <h4>Resumo</h4>  

                  <div className='texto-valores'>
                      <div className='categoria-resumo'>
                        <p>Frete</p>
                        <p>Subtotal</p>
                      </div>
                      <div className='categoria-resumo'>
                        <p>
                          {frete.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                        <p>
                          {subTotal.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                    </div>
</div>

                  <hr/>

                  <div className='total'>
                    <p>Total</p>
                    <h4>{total.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </h4>

                    <div className='botoes-pagamento'>
                    {user.data.grupo === 'CLIENTE' ? (
                          <div>
                            <div>
                              <button onClick={geradoPedido} className='botaoAzul'>Pagamento</button>
                                <Link to='/home'>
                                  <button className='continuar-compra'>Continua comprado</button>
                                </Link>
                            </div>
                            <label htmlFor="selecionar-enderenco-entrega"> Selecione enderenço de entrega </label>
                            <select
                               onChange={(e) => {
                                const selectedIndex = e.target.value - 1; 
                                const selectedEndereco = enderecoEntregaLogin[selectedIndex];
                                setEnderecoEntrega(selectedEndereco);
                                setCep(enderecoEntrega.cep.replace("-", ""))
                              }}                              
                              >
                                <option value="">Selecione uma opção</option>
                                {enderecoEntregaLogin.map((item, index) => 
                                
                                (
                                  <option key={index + 1} value={index + 1}>
                                    Entrega {index + 1}
                                  </option>
                                ))}
                              </select>



                          </div>
                        ) : (
                          <div className='sem-login'>
                            <div className='sub-div-pagamento'>
                              <Link to='/'>
                                <button className='botaoAzul'>Pagamento</button>
                              </Link>
                              <br />

                              <Link to='/home'>
                                <button className='continuar-compra'>Continua comprado</button>
                              </Link>

                            </div>

                            <div className='informe-cep-car'>
                              <input 
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                type="text" 
                                name="cep" 
                                id="cep"  
                                placeholder='Informe o CEP'
                              />

                              <button 
                                className='botaoRosa' 
                                onClick={() => getCEP(cep)}>
                                Calcular frete
                              </button>
                            </div>
                          </div>
                    )}
    
                      
                    </div>
                   
                  </div>

                  <div className='tipo-entrega'>
                    
                    <label htmlFor="tipoEntrega">Selecione a opção de entrega:</label>
                    
                    <select id="tipoEntrega" onChange={(e) => setTipoEntrega(e.target.value)} value={tipoEntrega} onClick={calcularFrete}>
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="entrega-rapida">Entrega Rápida</option>
                      <option value="entrega-correios">Entrega Correios</option>
                      <option value="entrega-transportadora">Entrega Transportadora</option>
                    </select>
                  </div>
                  
                  <div className='resultados-cep'>
                      {enderecoEntrega && enderecoEntrega.logradouro ? (
                        <div>
                          <p>{enderecoEntrega.logradouro}, {enderecoEntrega.bairro} - CEP: {cep}</p>
                          <p>{enderecoEntrega.localidade} - {enderecoEntrega.uf.toUpperCase()}</p>
                          <p>Complemento: {enderecoEntrega.complemento}</p>
                        </div>
                      ) : (
                        <div>
                          <p>Nenhum endereço disponível</p>
                        </div>
                      )}
                </div>
        </div>

      </div>
    </div>
  );
};

export default Carrinho;
