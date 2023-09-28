import React from 'react';
import { Visualizar } from '../Visualizacao/Visualizar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Cards.css';

const Cards = (props) => {
    const navigate = useNavigate();

    const url_img = "http://localhost:8080/api/imagens/acessar/";
    const origem = "/home"
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
        <button onClick={() => (navigate(`/visualizar/${props.id}`))} className='button-card'>Saiba Mais!</button>
    </div>
    </div>
    
  )
}

export default Cards