import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrossel.css'
import { Image } from 'react-bootstrap';

export const Carrossel = (props) => {
    const imagens = props.img ?? [];
    const url_img = "http://localhost:8080/api/imagens/acessar/";

    return (
    <div className="slide-container">
      <Carousel className='estrutura'>
      {imagens.map((imagem, index) => (
        <Carousel.Item key={index} style={{
          backgroundImage: `url(${url_img + imagem.nome})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          }}>
          <div className='estrutura-carrosel'></div>
        </Carousel.Item>
        ))}
      </Carousel>
    </div>
    );
    
};

