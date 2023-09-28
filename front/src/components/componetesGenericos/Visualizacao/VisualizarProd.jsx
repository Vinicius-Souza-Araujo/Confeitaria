import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_PRODUTOS_ID } from '../../../Api';
import { UserContext } from '../../../UserContext';
import { Rating, Box } from '@mui/material';
import { Carrossel } from '../Carrossel/Carrossel';
import { useNavigate } from 'react-router-dom';
import './Visualizar.css'

export const VisualizarProd = () => {
  const { id } = useParams();
  const [dataProduto, setProduto] = useState([]);
  const [imagens, setImagens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {  
    getProdutos();
  }, []);

  async function getProdutos(){
    const { url, options } = GET_PRODUTOS_ID(id);
    const response = await fetch(url, options);
    
    if (response.ok) {
      const dataProduto = await response.json();
      setProduto(dataProduto.content);
      setImagens(dataProduto.content[0].imagens);
    } else {
      console.error('Erro ao procurar dados do produto');
    }
  };

  const handleReturn = () => {
    navigate("/ProdutosAdmin");
  };

  return (
    <div className='container-visualizar'>
        {dataProduto.map((conteudo) => (
          <div className='container' key={conteudo.id}>
              <div className='sub-container'>
                  <Carrossel img={imagens}></Carrossel>
              </div>
              
              <div className='sub-container'>
                <button onClick={handleReturn}>X</button>
                  <h1>{conteudo.nome}</h1>
                  <Rating name="read-only" value={conteudo.avaliacao} readOnly />
                  <p>
                  {(conteudo.valor || 0).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                  </p>
                  <button>Comprar</button>
              </div>
             
          </div>          
        ))}
    </div>
  )
}
