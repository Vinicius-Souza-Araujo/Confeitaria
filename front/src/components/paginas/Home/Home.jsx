import React from 'react'
import { GET_PRODUTOS_ATIVADOS } from '../../../Api';
import { useState, useEffect } from 'react';
import { UserContext } from '../../../UserContext';
import './Home.css'


export const Home = () => {

  const [dataProduto,setProduto] = useState([]);
  const user = React.useContext(UserContext);

  React.useEffect(() => {  
    getProdutos();
  }, []);
  
  async function getProdutos(){

    const {url, options} = GET_PRODUTOS_ATIVADOS();
    const response = await fetch(url, options);
    
    if (response.ok) {
        const dataProduto = await response.json();
        setProduto(dataProduto.content);
    } else {
        console.error('Erro ao procurar dados do produto');
    }
    
}
  return (
    <div className='estrutura-produtos'>
         {dataProduto.map((conteudo) => (
            <div key={conteudo.id} >

              <div className='card'>
                <p className='tituloCARD'>{conteudo.nome}</p>
                <p>{(conteudo.valor || 0).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL',})}</p>
                <p>QTD: {conteudo.quantidade}</p>
              </div>
      
            </div>
         ))}
    </div>
  )
}
