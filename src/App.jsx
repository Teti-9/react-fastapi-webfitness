import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import MainLogin from './components/login'
import MainRegistro from './components/registro'
import MainVerificacao from './components/verificacao'
import ProfileCards from './components/profile'
import MainRecoverPass from './components/recuperar_senha';
import MainNewPass from './components/nova_senha';

function App() {

  const isAuthenticated = !!localStorage.getItem('token');

  const PrivateRoutePerfil = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<MainLogin />} />
        <Route path="/registro" element={<MainRegistro />} />
        <Route path="/verificacao" element={<MainVerificacao />} />
        <Route path="/recuperar" element={<MainRecoverPass />} />
        <Route path="/novasenha" element={<MainNewPass />} />
        <Route
          path="/perfil"
          element={
            <PrivateRoutePerfil>
              <ProfileCards />
            </PrivateRoutePerfil>
          }
        />
      </Routes>
      <ToastContainer autoClose={10000} theme="dark" hideProgressBar />
    </BrowserRouter>
  )
}

export default App