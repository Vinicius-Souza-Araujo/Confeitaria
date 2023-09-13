import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import {UserStorage} from './UserContext';
import {ProtectedRouteAdm} from './Helper/ProtectedRouteAdm';
import PrincipalAdmin from './components/paginas/PrincipalAdmin/principalAdmin';
import { ProdutosAdmin } from './components/paginas/ProdutosAdmin/ProdutosAdmin';
import { Backoffice } from './components/paginas/BackofficeAdmin/Backoffice';
import Login from '../src/components/paginas/Login/login'

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
          </Routes>
        </UserStorage>
      </BrowserRouter> 
    </div>
  )
}

export default App;
