import React from 'react'
import {GET_USERS, PATCH_STATUS, UPDATE_USER, DELETE_USER} from '../../Api';
import {UserContext} from '../../UserContext';
import {useState} from 'react'
import Form from '../componetesGenericos/formulario/form';
import Modal from '../componetesGenericos/Modal/modal';
import './principalAdmin.css'
import '../componetesGenericos/tabela/tabela.css'
import Header from '../header/Header';

function PrincipalAdmin() {
    // Exemplo para os dados vindo do backend, remover quando o backend estiver conectado
    const user = React.useContext(UserContext);

    const [dataUser, setDataUser] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalFormData, setModalFormData] = useState({
        id: '',
        nome: '',
        cpf: '',
        grupo: '',
        status: '',
    });

    React.useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
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

    async function handleStatusClick(id, novoStatus) {
        if (novoStatus === 'ATIVADO') {
            novoStatus = 'DESATIVADO'
        } else if (novoStatus === 'DESATIVADO') {
            novoStatus = 'ATIVADO'
        }
        const {url, options} = PATCH_STATUS({novoStatus}, user.data.token, id);
        const response = await fetch(url, options);
        getUsers();
    }

    // FUNÇÃO DELETAR USUÁRIO
    async function handleDeleteClick(id) {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este usuário?");
        if (confirmDelete) {
            // Faça a solicitação para excluir o usuário com base no ID
            const {url, options} = DELETE_USER(user.data.token, id);
            const response = await fetch(url, options);

            if (response.ok) {
                // Atualize os dados do usuário após a exclusão
                getUsers();
            } else {
                console.error('Erro ao excluir usuário');
            }
        }
    }

    async function handleUpdateClick(id) {
        // Encontre o usuário selecionado para atualização com base no ID
        const userToUpdate = dataUser.find((user) => user.id === id);
        setSelectedUser(userToUpdate);

        // Atualize o estado do modalFormData com os dados do usuário atualmente selecionado
        setModalFormData({
            id: userToUpdate.id,
            nome: userToUpdate.nome,
            cpf: userToUpdate.cpf,
            grupo: userToUpdate.grupo,
            status: userToUpdate.status,
        });

        setOpenModal(true);
    }

    async function handleUserUpdate(updatedUserData) {
        // Faça a solicitação para atualizar o usuário com base nos dados fornecidos
        const {id, nome, cpf, grupo, status} = updatedUserData;
        const {url, options} = UPDATE_USER(user.data.token, {id, nome, cpf, grupo, status});
        const response = await fetch(url, options);

        if (response.ok) {
            // Atualize os dados do usuário após a atualização
            getUsers();
            setOpenModal(false);
            setSelectedUser(null);
        } else {
            console.error('Erro ao atualizar usuário');
        }
    }

    const [openModal, setOpenModal] = useState(false);

    return (
        <div className='estrutura-principal-admin'>

            <Header/>

            <img src="./logo.png" alt="Logo do site" className='logo'/>

            <input onChange={(event) => setFiltro(event.target.value)}
                   onKeyDown={handleKeyDown}
                   className="input-pesquisa"
                   type="search"
                   name="pesquisar"
                   id="pesquisar"
            />

            <div className='estruturaTabela'>
                <table>
                    <caption> Cadastro Usuário</caption>

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
                            <td>
                                <button
                                    onClick={() => handleStatusClick(conteudo.id, conteudo.status)}>{conteudo.status}</button>
                            </td>
                            <td>
                                <button onClick={() => handleUpdateClick(conteudo.id)}>ALTERAR</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteClick(conteudo.id)}>EXCLUIR</button>
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            </div>

            <button className='botaoCiano' onClick={() => setOpenModal(true)}>Adicionar</button>

            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
                <Form>
                    userData={selectedUser}
                    onUpdate={handleUserUpdate}
                </Form>
            </Modal>

        </div>
    )
}

export default PrincipalAdmin