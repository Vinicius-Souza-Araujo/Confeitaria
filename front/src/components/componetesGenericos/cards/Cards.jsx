import React from 'react';
import './Cards.css';

const Cards = (props) => {
    const url_img = "http://localhost:8080/api/imagens/acessar/";
    const estiloDoBackground = {
      backgroundColor: props.cor, 
    };

    const estiloColor = {
      color: props.cor, 
    };
  return (
    <div className='box-card'>
      <h1  className='title-card'>{props.titulo}</h1>
      <div style={estiloDoBackground} className='div-card'>
        
        <img className='img-card' src={url_img + props.imgNome} />
        
        <button className='button-card'>Saiba Mais!</button>
    </div>
    </div>
    
  )
}

export default Cards