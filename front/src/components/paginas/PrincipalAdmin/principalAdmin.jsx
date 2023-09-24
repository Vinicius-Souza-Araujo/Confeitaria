import React from 'react'
import { GET_USERS, PATCH_STATUS } from '../../../Api';
import { UserContext } from '../../../UserContext';
import { useState } from 'react'
import Form from '../../componetesGenericos/Formulários/formulario/form';
import Modal from '../../componetesGenericos/Modal/modal';
import './principalAdmin.css'
import '../../componetesGenericos/tabela/tabela'
import Header from '../../header/Header';
import {FormAlterarUser} from '../../componetesGenericos/Formulários/FormAlterarUser/FormAlterarUser'
function PrincipalAdmin() {
    // Exemplo para os dados vindo do backend, remover quando o backend estiver conectado
    const user = React.useContext(UserContext);
    const [dataUser,setDataUser] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModalAlt, setOpenModalAlt] = useState(false);
    const [conteudo, setConteudo] = useState([]);
    
    React.useEffect(() => {  
      getUsers();
    }, []);
    
    async function getUsers(){
        const {url, options} = GET_USERS(user.data.token, filtro);
        const response = await fetch(url, options);
    
        if (response.ok) {
            const userData = await response.json();
            setDataUser(userData);
        } else {
            console.error('Erro ao obter dados dos usuários');
        }
        
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          getUsers();
      }
    };

    async function handleStatusClick (id, novoStatus) {
      if(novoStatus === 'ATIVADO') { novoStatus = 'DESATIVADO'}
      else if (novoStatus === 'DESATIVADO'){ novoStatus = 'ATIVADO'}
      const {url, options} = PATCH_STATUS({novoStatus}, user.data.token, id);
      const response = await fetch(url, options);
      getUsers();
  };

   
  return (
    <div className='estrutura-principal-admin'>
    <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}><Form></Form></Modal>
    <Modal isOpen={openModalAlt} setModalOpen={() => setOpenModalAlt(!openModalAlt)}>
        <FormAlterarUser 
                         nome={conteudo.nome} 
                         senha={conteudo.senha}
                         cpfUsuario={conteudo.cpf}
                         grupo={conteudo.grupo}
                         id={conteudo.id}
                         ></FormAlterarUser>
    </Modal>
       
        {!openModal && (
            <div>
                <Header />
                 <img src="./logo.png" alt="Logo do site"  className='logo'/>
                 <input onChange={(event) => setFiltro(event.target.value)}
                  onKeyDown={handleKeyDown}  
                  className="input-pesquisa" 
                  type="search" 
                  name="pesquisar" 
                  id="pesquisar" />

                <div className='titulo-back'>
                    <h3 className='titulo-PA'>Usuários cadastrados</h3>
                    <button className='botaoCiano botaoCianoPA' onClick={() => setOpenModal(true)}>Adicionar</button>
                </div>

                <div className='estrutura-tabela'>
                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>CPF</th>
                            <th>Grupo</th>
                            <th>Status</th>
                            <th>Alterar</th>
                        </tr>
                    </thead>

                <tbody>
                    {dataUser.map((conteudo) => (

                        <tr key={conteudo.id}>
                            <td>{conteudo.id}</td>
                            <td>{conteudo.nome}</td>
                            <td>{conteudo.email}</td>
                            <td>{conteudo.cpf}</td>
                            <td>{conteudo.grupo}</td>
                            <td><button className='botaoAzul' onClick={() => handleStatusClick(conteudo.id, conteudo.status)}>{conteudo.status}</button></td>
                            <td><button className='botaoRosa' onClick={() => {setOpenModalAlt(true) 
                                                                              setConteudo(conteudo) }}>
                                                                                Alterar</button></td>
                        </tr>

                    ))}
                </tbody>
                </table>

                </div>
                 
              </div>

        )}
       
    </div>

  )
}

export default PrincipalAdmin