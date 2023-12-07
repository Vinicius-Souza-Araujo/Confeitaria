import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import {UserStorage} from './UserContext';
import {ProtectedRouteAdm, ProtectedRouteEstoquista, ProtectedRouteCliente} from './Helper/ProtectedRouteAdm';
import PrincipalAdmin from './components/paginas/PrincipalAdmin/principalAdmin';
import { Backoffice } from './components/paginas/BackofficeAdmin/Backoffice';
import Home from './components/paginas/Home/Home';
import Login from '../src/components/paginas/Login/login';
import { ProdutosAdmin } from './components/paginas/ProdutosAdmin/ProdutosAdmin';
import { BackofficeEstoquista } from './components/paginas/Estoquista/BackofficeEstoquista';
import { ProdutoEstoquista } from './components/paginas/Estoquista/ProdutoEstoquista';
import { Visualizar } from './components/componetesGenericos/Visualizacao/Visualizar';
import { VisualizarProd } from './components/componetesGenericos/Visualizacao/VisualizarProd';
import  FormCadastrarCliente from './components/componetesGenericos/Formulários/FormCadastrarCliente/FormCadastrarCliente';
import FormAlterarClient from './components/componetesGenericos/Formulários/FormAlterarCliente/FormAlterarClient';
import { Endereco } from './components/componetesGenericos/Endereco/Endereco';
import { ResumoPedido } from './components/paginas/Carrinho/ResumoPedido';
import Carrinho from './components/paginas/Carrinho/Carrinho';
import { CartProvider } from './components/componetesGenericos/ItemCarrinho/CartContext';
import { PedidosEstoquista } from './components/paginas/Estoquista/PedidosEstoquista.Jsx';
import { AlterarStatusPedido } from './components/paginas/Estoquista/AlterarStatusPedido';
import { Confirmacao } from './components/paginas/Carrinho/Confirmacao';
import { DetalhesPedidos } from './components/paginas/Estoquista/DetalhesPedidos';
import './App.css';
import { Pagamento } from './components/componetesGenericos/pagamento/pagamento';
import GerenciamentoPedidos from './components/componetesGenericos/Formulários/FormPedidos/GerenciamentoPedidos';

function App() {
 
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <CartProvider>
            <Routes>
              <Route path='/*' element={<Login />}/>
              <Route path='/administrador' element={<ProtectedRouteAdm><Backoffice/></ProtectedRouteAdm>}/>
              <Route path='/UsuariosAdmin' element={<ProtectedRouteAdm><PrincipalAdmin/></ProtectedRouteAdm>}/>
              <Route path='/ProdutosAdmin' element={<ProtectedRouteAdm><ProdutosAdmin/></ProtectedRouteAdm>}/>
              <Route path='/estoquista' element={<ProtectedRouteEstoquista><BackofficeEstoquista></BackofficeEstoquista></ProtectedRouteEstoquista>}/>
              <Route path='/pedidosEstoquista' element={<ProtectedRouteEstoquista><PedidosEstoquista /></ProtectedRouteEstoquista>}/>
              <Route path='/ProdutoEstoque' element={<ProtectedRouteEstoquista><ProdutoEstoquista></ProdutoEstoquista></ProtectedRouteEstoquista>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path="/visualizar/:id" element={<Visualizar />} />
              <Route path="/visualizarProd/:id" element={<VisualizarProd />} />
              <Route path="/cadastrarCliente" element={<FormCadastrarCliente></FormCadastrarCliente>}/>
              <Route path="/pagamento/:idPedido" element={<ProtectedRouteCliente><Pagamento /></ProtectedRouteCliente>}/> 
              <Route path='/alterarCliente' element={<FormAlterarClient></FormAlterarClient>}/>
              <Route path='/alterarCliente' element={<ProtectedRouteCliente><FormAlterarClient></FormAlterarClient></ProtectedRouteCliente>}/>
              <Route path='/alterarEnderenco' element={<ProtectedRouteCliente><Endereco></Endereco></ProtectedRouteCliente>}/>
              <Route path='/pedidos' element={<ProtectedRouteCliente><GerenciamentoPedidos></GerenciamentoPedidos></ProtectedRouteCliente>}/>
              <Route path='/alterarCliente' element={<ProtectedRouteCliente><FormAlterarClient></FormAlterarClient></ProtectedRouteCliente>}/>
              <Route path='/alterarEnderenco' element={<ProtectedRouteCliente><Endereco></Endereco></ProtectedRouteCliente>}/>
              <Route path='/alterarStatusPedido' element={<ProtectedRouteEstoquista><AlterarStatusPedido></AlterarStatusPedido></ProtectedRouteEstoquista>}/>
              <Route path='/confirmacaoPedido' element={<ProtectedRouteCliente><Confirmacao/></ProtectedRouteCliente>}/>
              <Route path='/detalhesPedidos' element={<ProtectedRouteEstoquista><DetalhesPedidos /></ProtectedRouteEstoquista>}/>
              <Route path='/carrinho' element={<Carrinho />}/>
              <Route path='/resumoPedido' element={<ResumoPedido/>}/>
            </Routes>
          </CartProvider>
        </UserStorage>
      </BrowserRouter>
  </div>
  )
}
export default App;
