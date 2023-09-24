import React from 'react'
import { useState } from 'react';
import { UserContext } from '../../../UserContext';
import { GET_PRODUTOS_ESTOQUE } from '../../../Api';
import Header from '../../header/Header';
import Modal from '../../componetesGenericos/Modal/modal';
import {FormAlterarEstoque} from '../../componetesGenericos/Formulários/FormAlterarEstoque/FormAlterarEstoque'
import '../ProdutosAdmin/ProdutosAdmin.css'


export const ProdutoEstoquista = () => {
    const user = React.useContext(UserContext);
    const [dataProduto,setProduto] = useState([]);
    const [paginacao, setPaginacao] = useState(0);
    const [itemBusca, setItemBusca] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [conteudo, setConteudo] = useState([]);
    const [limitePagina, setLimitePaginas] = useState('')
   
    React.useEffect(() => {  
        getProdutos();
      }, []);

    // BUSCA DOS PRODUTOS ----------------------------------------------------------------
    async function getProdutos(){
        const {url, options} = GET_PRODUTOS_ESTOQUE(paginacao);
        const response = await fetch(url, options);
        console.log(response.status)
        
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
                <FormAlterarEstoque 
                quantidade={conteudo.quantidade} 
                id={conteudo.id}></FormAlterarEstoque>                
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
                                        <td><button className='botaoCiano'>{conteudo.status}</button></td>
                                        <td>{conteudo.avaliacao}</td>
                                        <td>{conteudo.quantidade}</td>
                                        <td><button className='botaoAzulPA'>Abrir</button></td>
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
