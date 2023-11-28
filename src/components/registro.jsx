import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/registro.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainRegistro() {

    useEffect(() => {
        document.title = 'Register Page';
    }, []);

    const userisLogged = () => {
        const user = !!localStorage.getItem('token');
        if (user && user === true) {
            return (window.location.href = '/perfil')
        }
    };

    userisLogged()

    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const signUp = async ({ nome, email, senha }) => {
        try {
            setLoading(true);
            toast("Criando conta, aguarde...");
            await axios.post('http://localhost:8000/signup', { nome, email, senha });
            setLoading(false);
            toast.dismiss();
            alert('Conta criada com sucesso!')
            localStorage.setItem('urlcontrol', true)
            window.location.href = '/verificacao';
        } catch (error) {
            setLoading(false);
            toast.dismiss();
            if (error.message === 'Request failed with status code 400')
                toast("Email já cadastrado!");
            else if (error.message === 'Request failed with status code 408')
                toast("Timeout, pode ter ocorrido um erro com o servidor.");
            else if (error.message === 'Request failed with status code 422') {
                toast("Dois erros ocorreram, considere um dos dois:");
                toast("(Digite um email válido) (A senha deve conter no mínimo 5 e no máximo 14 caracteres)")
            }
            else if (error.message === 'Request failed with status code 500')
                toast("Timeout, pode ter ocorrido um erro com o servidor.");
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        signUp({ nome, email, senha })
    }

    function togglePass() {
        let password = document.getElementById("password");
        let eyeicon = document.getElementById("eyeicon");

        if (password.type == "password") {
            password.type = "text";
            eyeicon.src = 'src\\components\\eye-open.png';
        } else {
            password.type = "password";
            eyeicon.src = 'src\\components\\eye-close.png';
        }
    }

    return (
        <div className="main_registro">
            <div className="registro">
                <form onSubmit={handleRegister} className="formRegistro">
                    <div className="card_registro">
                        <h1>Registro</h1>
                        <img src="src\components\eye-close.png" id='eyeicon' onClick={togglePass} />
                        <div className="textfield">
                            <label htmlFor="name">Nome</label>
                            <input type="text" name="name" placeholder="Digite seu nome de usuário" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                        <div className="textfield">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="textfield">
                            <label htmlFor="password">Senha</label>
                            <input id='password' type="password" name="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn_registro" disabled={loading}>{loading ? <>Criando...</> : <>Criar</>}</button>
                        <a href="/login">Já possui uma conta?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MainRegistro