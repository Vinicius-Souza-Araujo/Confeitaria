import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css'

import PrincipalAdmin from "./components/paginas/PrincipalAdmin"
import Login from './components/paginas/Login'

function App() {
 
  return (
    <div>
      
      <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Login />}/>
            <Route path='/administrador' element={<PrincipalAdmin />}/>
          </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App;
