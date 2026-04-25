import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Maps from "./pages/maps.jsx";
import Catalogo from "./pages/catalogo.jsx";
import Login from './pages/login.jsx';
import Register from './pages/Register.jsx';
import CadastroPlanta from './pages/cadastroPlantas.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/maps" element={<Maps />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/cadastrar-planta" element={<CadastroPlanta/>} />
        </Routes>
      </Router>
    </AuthProvider>
         
  </StrictMode>,
)
