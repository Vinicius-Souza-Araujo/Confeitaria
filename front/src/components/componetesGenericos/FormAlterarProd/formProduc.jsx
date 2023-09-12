import React from 'react'
import { useState } from 'react'
import Alerta from './Alerta';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export const FormProduc = (props) => {
    const [openModalForm, setOpenModalForm] = useState(false);
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState(props.quantidade);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div> 
            
            <form>
                <input type="text" name="nome" id="nome" placeholder='Nome' onChange={(event) => setNome(event.target.value)} value={nome}/>
                <input type="number" name="quantidade" id="quantidade" placeholder='Quantidade'/>

                <select name="status" id="status">
                    <option value="" disabled> Selecione uma opção</option>
                    <option value=""> Desativado </option>
                    <option value=""> Ativado </option>
                </select>
          
            </form>

            <button variant="primary" onClick={handleShow} >Enviar</button>
    
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
           
        
    </div>
  )
}
