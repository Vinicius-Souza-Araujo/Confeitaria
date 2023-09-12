import React from 'react'
import { useState } from 'react';
import { UserContext } from '../../../UserContext';
import { GET_PRODUTOS, PUT_PRODUTOS, GET_PRODUTOS_SEM_FILTRO } from '../../../Api';
import Header from '../../header/Header';
import Modal from '../../componetesGenericos/Modal/modal';
import { FormProduc } from '../../componetesGenericos/FormAlterarProd/formProduc';
import './ProdutosAdmin.css'

export const ProdutosAdmin = () => {
    const user = React.useContext(UserContext);
    const [dataProduto,setProduto] = useState([]);
    const [paginacao, setPaginacao] = useState(0);
    const [itemBusca, setItemBusca] = useState('');
    const [openModal, setOpenModal] = useState(false);
   
    React.useEffect(() => {  
        getProdutos();
      }, []);

    // BUSCA DOS PRODUTOS ----------------------------------------------------------------
    async function getProdutos(){
        const {url, options} = GET_PRODUTOS(user.data.token, paginacao);
        const response = await fetch(url, options);
        
        if (response.ok) {
            const dataProduto = await response.json();
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
        console.log('ITEM BUSCA'+itemBusca)
        if (event.key === 'Enter') {
            getProdutos_sem_filtro();
        }
      };
    // -------------------------------------------------------------------------------------
    
    // ALTERAR DADOS - STATUS
    async function handleAlterarStatus(novoStatus, conteudo){
       
        conteudo.status = novoStatus;
        console.log('JSON: '+ conteudo.id)
        if(novoStatus === 'ATIVADO') { novoStatus = 'DESATIVADO'}
        else if (novoStatus === 'DESATIVADO'){ novoStatus = 'ATIVADO'}
        const {url, options} = PUT_PRODUTOS(dataProduto, user.data.token);
        const response = await fetch(url, options);
        console.log(response)
        getProdutos();
    }

    // PAGINACAO ------------------------------------------------------------
    async function handleProximo(){
       if(dataProduto.length != 0){
            console.log('|| PAGI NEXT:' + paginacao);
            setPaginacao(Number(paginacao) + Number(1));
            getProdutos();
        }
    }

    async function handleAnterior(){
        if(Number(paginacao) >= 0){
            console.log( '|| PAGI ANTERIOR:' + paginacao);
            setPaginacao(Number(paginacao) - Number(1));
            getProdutos();
        } else if (paginacao < 0){
            setPaginacao(0);
        }
        
    }
    // ------------------------------------------------------------------------------

    return (
        <div className='backgroud-pa'>
            <Modal className='teste'isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
                <FormProduc></FormProduc>                
            </Modal>
            
            {!openModal && (
                <div >
                    <Header />
                    <input 
                        onChange={(event) => setItemBusca(event.target.value)}
                        onKeyDown={handleKeyDown}  
                        className="input-pesquisa" 
                        type="search" 
                        name="pesquisar" 
                        id="pesquisar"  />

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
                                        <td><button className='botaoAzulPA'>Abrir</button></td>
                                        <td ><button className='botaoRosaPA' onClick={() => setOpenModal(true)}>Alterar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button className="botaoAzulPA" onClick={() => handleAnterior()}>Anterior</button>
                        <button className="botaoAzulPA" onClick={() => handleProximo()}>Próximo</button>
                    </div>
                </div>
            )}
        </div>
                
    )
}
