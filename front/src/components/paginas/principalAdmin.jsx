import React from 'react'
import { GET_USERS, PATCH_STATUS } from '../../Api';
import { UserContext } from '../../UserContext';
import { useState } from 'react'
import Tabela from '../componetesGenericos/tabela/tabela';
import Form from '../componetesGenericos/formulario/form';
import Modal from '../componetesGenericos/Modal/modal';
import './principalAdmin.css'
import '../componetesGenericos/tabela/tabela.css'

function PrincipalAdmin() {
    // Exemplo para os dados vindo do backend, remover quando o backend estiver conectado
    const user = React.useContext(UserContext);
    const colunas = ["Nome", "E-mail", "Status", "Grupo", "Alterar", "Hab/Des"];
    const [dataUser,setDataUser] = useState([]);
    const [filtro, setFiltro] = useState('')
    
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

  
    const [openModal, setOpenModal] = useState(false)

  return (
    <div className='estrutura-principal-admin'>

        <img src="./logo.png" alt="Logo do site"  className='logo'/>

        <input onChange={(event) => setFiltro(event.target.value)}
              onKeyDown={handleKeyDown}  
              className="input-pesquisa" 
              type="search" 
              name="pesquisar" 
              id="pesquisar" 
         />

        <div className='estruturaTabela'>
          <table>
              <caption> Cadastro Usuário </caption>
              
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
                          <td><button onClick={() => handleStatusClick(conteudo.id, conteudo.status)}>{conteudo.status}</button></td>
                          <td><button>Alterar</button></td>
                      </tr>
                
                  ))}
              </tbody>
          </table>
        </div>

        <button className='botaoCiano' onClick={() => setOpenModal(true)}>Adicionar</button>
    
        <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
            <Form></Form>
        </Modal>
        
    </div>

  )
}

export default PrincipalAdmin