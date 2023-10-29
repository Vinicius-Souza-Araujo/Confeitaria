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
import './App.css';

function App() {
 
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path='/*' element={<Login />}/>
            <Route path='/administrador' element={<ProtectedRouteAdm><Backoffice/></ProtectedRouteAdm>}/>
            <Route path='/UsuariosAdmin' element={<ProtectedRouteAdm><PrincipalAdmin/></ProtectedRouteAdm>}/>
            <Route path='/ProdutosAdmin' element={<ProtectedRouteAdm><ProdutosAdmin/></ProtectedRouteAdm>}/>
            <Route path='/estoquista' element={<ProtectedRouteEstoquista><BackofficeEstoquista></BackofficeEstoquista></ProtectedRouteEstoquista>}/>
            <Route path='/ProdutoEstoque' element={<ProtectedRouteEstoquista><ProdutoEstoquista></ProdutoEstoquista></ProtectedRouteEstoquista>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path="/visualizar/:id" element={<Visualizar />} />
            <Route path="/visualizarProd/:id" element={<VisualizarProd />} />
            <Route path="/cadastrarCliente" element={<FormCadastrarCliente></FormCadastrarCliente>}/>
            <Route path='/alterarCliente' element={<FormAlterarClient></FormAlterarClient>}/>
          </Routes>
        </UserStorage>
      </BrowserRouter> 
    </div>
  )
}
export default App;
