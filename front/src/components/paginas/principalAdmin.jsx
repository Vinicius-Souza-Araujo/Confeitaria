import React from 'react'
import { GET_USERS, PATCH_STATUS } from '../../Api';
import { UserContext } from '../../UserContext';
import { useState } from 'react'
import Form from '../componetesGenericos/formulario/form';
import FormUpdate from '../componetesGenericos/formulario/formUpdate';
import Modal from '../componetesGenericos/Modal/modal';
import './principalAdmin.css'
import '../componetesGenericos/tabela/tabela.css'
import Header from '../header/Header';

function PrincipalAdmin() {
    // Exemplo para os dados vindo do backend, remover quando o backend estiver conectado
    const user = React.useContext(UserContext);

    const [dataUser, setDataUser] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [id, setId] = useState('');
    const [nome, setNome ] = useState('');
    const [cpf, setCpf ] = useState('');
    const [grupo, setGrupo] = useState('');

    React.useEffect(() => {
        getUsers();
    }, []);

    function pegarDadosUpdate(id, nome, cpf, grupo) {

        setId(id);
        setNome(nome);
        setCpf(cpf);
        setGrupo(grupo);
        setOpenModalUpdate(true);
    }

    async function getUsers() {
        const { url, options } = GET_USERS(user.data.token, filtro);
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
        const { url, options } = PATCH_STATUS({ novoStatus }, user.data.token, id);
        const response = await fetch(url, options);
        getUsers();
    }

    return (
        <div className='estrutura-principal-admin'>

            <Header />

            <img src="./logo.png" alt="Logo do site" className='logo' />

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
                                    <button onClick={() => pegarDadosUpdate(conteudo.id, conteudo.nome, conteudo.cpf, conteudo.grupo)}>ALTERAR</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

            <button className='botaoCiano' onClick={() => setOpenModal(true)}>Adicionar</button>

            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
                <Form/>
            </Modal>
            
            <Modal isOpen={openModalUpdate} setModalOpen={() => setOpenModalUpdate(!openModalUpdate)}>
                <FormUpdate id={id} nome={nome} cpf={cpf} grupo={grupo}/>
            </Modal>
        </div>
    )
}

export default PrincipalAdmin