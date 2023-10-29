import React from 'react'
import HeaderHome from '../../header/HeaderHome'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext';
import Cards from '../../componetesGenericos/cards/Cards';
import { GET_PRODUTOS, GET_PRODUTOS_SEM_FILTRO } from '../../../Api';
import './Home.css';



const Home = () => {
   
    const [filtro, setFiltro] = React.useState(0);
    const [inputBuscarValor, setInputBuscarValor] = React.useState("");
    const [dataProdutos, setDataProdutos] = React.useState([]);
    const { data } = React.useContext(UserContext);
    const navigate = useNavigate('');
    const cores = ['#e9c1d1', '#f5e391', '#bae9e7'];


    React.useEffect(() => {
      getProdutos();
    }, [filtro]);

    async function getProdutos() {
        const { url, options } = GET_PRODUTOS(filtro);
        const response = await fetch(url, options);

        if (response.ok) {
            const responseData = await response.json();
            const produtos = responseData.content; 
            setDataProdutos(produtos);
        } else {
            console.error('Erro ao obter dados dos produtos');
        }
    }


    async function getProdutosSemFiltro() {
        const { url, options } = GET_PRODUTOS_SEM_FILTRO(inputBuscarValor);
        const response = await fetch(url, options);

        if (response.ok) {
            const responseData = await response.json();
            const produtos = responseData.content; 
            setDataProdutos(produtos);
        } else {
            console.error('Erro ao obter dados dos produtos');
        }
    }

    
    const aumentarFiltro = () => {
        
        setFiltro(filtro + 1);
    
    };

    
    const diminuirFiltro = () => {
        
            setFiltro(filtro - 1);
       
    };
  return (
    <div >
        <HeaderHome />
        {data && data.grupo === 'CLIENTE' && (
            <button className="botao-alterar" onClick={() => navigate('/alterarCliente')}>Alterar</button>
        )}

        <h1 className='titulo-principal'>Produtos</h1>

        <div className='box-input-buscar'>
            <input onChange={(event) => setInputBuscarValor(event.target.value)} className='input-buscar' placeholder='Buscar...'/>
            <button onClick={getProdutosSemFiltro}>Buscar</button>
        </div>
        
        <div className='div-produtos'>
        {dataProdutos.length === 0 ? (
                <h1>Nenhum produto encontrado</h1>
            ) :(
        dataProdutos.map((conteudo, index) => {
          const imagemTrue = conteudo.imagens.find((imagem) => imagem.flag === false);
          const imgNome = imagemTrue ? imagemTrue.nome : '';
          const backgroundColor = cores[index % cores.length];
          return (
            <Cards cor={backgroundColor} key={conteudo.id} id={conteudo.id} titulo={conteudo.nome} imgNome={imgNome} />
          );
        })
        )}
        </div>

        <div className='buttons-de-paginacao'>
        {filtro != 0 ? <button className='botao-anterior' onClick={diminuirFiltro}>Anterior</button> : <button className='botao-anterior' disabled onClick={diminuirFiltro}>Anterior</button>}
        {dataProdutos.length === 10 ? <button className='botao-proximo' onClick={aumentarFiltro}>Próximo</button> : <button className='botao-proximo' disabled onClick={aumentarFiltro}>Próximo</button>}
        </div>
    </div>
  )
}

export default Home