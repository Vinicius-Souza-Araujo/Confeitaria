import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import {UserStorage} from './UserContext';
import {ProtectedRouteAdm} from './Helper/ProtectedRouteAdm';
import PrincipalAdmin from './components/paginas/principalAdmin';
import Login from './components/paginas/Login';

function App() {
 
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path='/*' element={<Login />}/>
            <Route path='/administrador' element={<ProtectedRouteAdm><PrincipalAdmin/></ProtectedRouteAdm>}/>
          </Routes>
        </UserStorage>
      </BrowserRouter> 
    </div>
  )
}

export default App;
