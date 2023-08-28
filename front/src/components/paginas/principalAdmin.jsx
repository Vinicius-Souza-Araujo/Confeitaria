import React from 'react'
import { useState } from 'react'
import Tabela from '../componetesGenericos/tabela/tabela';
import Form from '../componetesGenericos/formulario/form';
import Modal from '../componetesGenericos/Modal/modal';
import './principalAdmin.css'

function PrincipalAdmin() {
    // Exemplo para os dados vindo do backend, remover quando o backend estiver conectado
    const colunas = ["Nome", "E-mail", "Status", "Grupo", "Alterar", "Hab/Des"];
    const conteudos = [
        ["Rayane Novaes dos Santos", "exemplo@gmail.com", "Ativo", "Admin", "Alterar", "Desabilitar"],
        ["Rayane Novaes dos Santos", "exemplo@gmail.com", "Inativo","Cliente" ,"Alterar", "Ativar"]];

    // Não apagar as variaveis abaixo
    const [openModal, setOpenModal] = useState(false)

  return (
    <div className='estrutura-principal-admin'>

        <img src="./logo.png" alt="Logo do site"  className='logo'/>

        <input className="input-pesquisa" type="search" name="pesquisar" id="pesquisar" />

        <Tabela nomeTabela="Usuários cadastrados" colunas={colunas} conteudos={conteudos}></Tabela>
        <button className='botaoCiano' onClick={() => setOpenModal(true)}>Adicionar</button>
    
        <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
            <Form></Form>
        </Modal>
        
    </div>

  )
}

export default PrincipalAdmin