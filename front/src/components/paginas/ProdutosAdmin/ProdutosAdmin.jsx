import React from 'react'
import { useState } from 'react';
import { UserContext } from '../../../UserContext';
import { useNavigate } from 'react-router-dom';
import { GET_PRODUTOS, PUT_PRODUTOS, GET_PRODUTOS_SEM_FILTRO } from '../../../Api';
import Header from '../../header/Header';
import Modal from '../../componetesGenericos/Modal/modal';
import { FormProduc } from '../../componetesGenericos/Formulários/FormAlterarProd/formProduc';
import { FormCadastarProd } from '../../componetesGenericos/Formulários/FormCadastrarProd/FormCadastarProd';
import './ProdutosAdmin.css'

export const ProdutosAdmin = () => {
    const user = React.useContext(UserContext);
    const [dataProduto,setProduto] = useState([]);
    const [paginacao, setPaginacao] = useState(0);
    const [itemBusca, setItemBusca] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModalCad, setOpenModalCad] = useState(false);
    const [conteudo, setConteudo] = useState([]);
    const [limitePagina, setLimitePaginas] = useState('');
    const navigate = useNavigate();
   
    React.useEffect(() => {  
        getProdutos();
      }, []);

    // BUSCA DOS PRODUTOS ----------------------------------------------------------------
    async function getProdutos(){
        const {url, options} = GET_PRODUTOS(paginacao);
        const response = await fetch(url, options);
        
        if (response.ok) {
            const dataProduto = await response.json();
            setLimitePaginas(Number(dataProduto.totalPages) - 1);
            setProduto(dataProduto.content);
        } else {
            console.error('Erro ao procurar dados do produto');
        }
        
    }


    async function getProdutos_sem_filtro(){
        const {url, options} = GET_PRODUTOS_SEM_FILTRO(user.data.token, itemBusca);
        const response = await fetch(url, options);
        
        if (response.ok) {
            const dataProduto = await response.json();
            setProduto(dataProduto.content);
        } else {
            console.error('Erro ao procurar dados do produto');
        }
        
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            getProdutos_sem_filtro();
        }
      };
    // -------------------------------------------------------------------------------------

    // ALTERAR DADOS - STATUS
    async function handleAlterarStatus(novoStatus, conteudo){
       
        conteudo.status = novoStatus;
        if(novoStatus === 'ATIVADO') { novoStatus = 'DESATIVADO'}
        else if (novoStatus === 'DESATIVADO'){ novoStatus = 'ATIVADO'}
        const {url, options} = PUT_PRODUTOS({
            id: conteudo.id,
            nome: conteudo.nome,
            status: novoStatus,
            quantidade: conteudo.quantidade,
            avaliacao: conteudo.avaliacao,
            valor: conteudo.valor   
        }, user.data.token);
        const response = await fetch(url, options);
        console.log('entrooo')
        getProdutos();
    }

    // PAGINACAO ------------------------------------------------------------
    async function handleProximo() {
        if (dataProduto.length !== 0 && paginacao !== limitePagina) {
          setPaginacao(Number(paginacao) + 1);
        }
        getProdutos();
      }
      
      async function handleAnterior() {
        const anterior = Number(paginacao) - 1;
        if (anterior < 0) {
          setPaginacao(0);
        } else {
          setPaginacao(anterior);
        }
        getProdutos();
      }
    // ------------------------------------------------------------------------------

    return (
        <div className='backgroud-pa'>
            <Modal className='teste'isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
                <FormProduc 
                nome={conteudo.nome} 
                quantidade={conteudo.quantidade} 
                status={conteudo.status}
                valor={conteudo.valor} 
                avaliacao={conteudo.avaliacao}
                imagens={conteudo.imagens}
                id={conteudo.id}></FormProduc>                
            </Modal>

            <Modal isOpen={openModalCad} setModalOpen={() => setOpenModalCad(!openModalCad)}>
                    <FormCadastarProd></FormCadastarProd>
            </Modal>
            
            {!openModal && (
                <div >
                    
                    <Header />
                    
                    <div htmlFor="">
                        {/* <img src="\src\assets\lupa.svg" alt=""/> */}
                        <input 
                        onChange={(event) => setItemBusca(event.target.value)}
                        onKeyDown={handleKeyDown}  
                        className="input-pesquisa"
                        placeholder='Buscar' 
                        type="search" 
                        name="pesquisar" 
                        id="pesquisar"  />

                    </div>
                    
                    <button className='botaoRosaPA' onClick={() => {setOpenModalCad(true)}}>Adicionar</button>

                    <div className='estrutura-tab-PA'>
                        <table>
                            <thead>  
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                    <th>Avaliação</th>
                                    <th>Quantidade</th>
                                    <th>Visualizar</th>
                                    <th>Alterar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataProduto.map((conteudo) => (
                                    <tr key={conteudo.id}>                                        
                                        <td>{conteudo.id}</td>
                                        <td>{conteudo.nome}</td>
                                        <td>{(conteudo.valor || 0).toLocaleString('pt-BR', {
                                                                    style: 'currency',
                                                                    currency: 'BRL',
                                        })}</td>
                                        <td><button onClick={() => handleAlterarStatus(conteudo.status, conteudo)} className='botaoCiano'>{conteudo.status}</button></td>
                                        <td>{conteudo.avaliacao}</td>
                                        <td>{conteudo.quantidade}</td>
                                        <td><button onClick={() => navigate(`/visualizarProd/${conteudo.id}`)} className='botaoAzulPA'>Abrir</button></td>
                                        <td ><button className='botaoRosaPA' onClick={() => {
                                            setConteudo(conteudo) 
                                            setOpenModal(true)
                                            }}>Alterar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div className='botoes-PA'>
                            <button className="botaoAzulPA" onClick={() => handleAnterior()}>Anterior</button>
                            <button className="botaoAzulPA" onClick={() => handleProximo()}>Próximo</button>
                        </div>
                       
                    </div>
                </div>
            )}
        </div>
                
    )
}
