import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import '../styles/login.css'

function MainLogin() {

    useEffect(() => {
        document.title = 'Login Page';
    }, []);

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleToken = async ({ email, senha }) => {

        try {
            setLoading(true);
            toast("Logando, aguarde...");
            const response = await axios.post('http://localhost:8000/login', { email, senha });
            const { token_de_acesso } = response.data;
            setLoading(false);
            localStorage.setItem('token', token_de_acesso);
            toast.dismiss();
            alert('Bem vindo!')
            window.location.href = '/perfil';
        } catch (error) {
            setLoading(false);
            toast.dismiss();
            if (error.message === 'Request failed with status code 400')
                toast("Email incorreto!");

            else if (error.message === 'Request failed with status code 404')
                toast("Senha incorreta!");
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        handleToken({ email, senha })
    }

    const userisLogged = () => {
        const user = !!localStorage.getItem('token');
        if (user && user === true) {
            return (window.location.href = '/perfil')
        }
    };

    userisLogged()

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
        <div className="main_login">
            <div className="login">
                <form onSubmit={handleLogin} className="formLogin" id='formLogin'>
                    <h1>• Organize seus treinos ✎<br />
                        • Controle seu progresso ✔</h1>
                    <div className="card_login">
                        <h1>LOGIN</h1>
                        <img src="src\components\eye-close.png" id='eyeicon' onClick={togglePass} />
                        <div className="textfield">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="textfield">
                            <label htmlFor="password">Senha</label>
                            <input id='password' type="password" name="password" placeholder='Digite sua senha' value={senha} onChange={(e) => setSenha(e.target.value)} required />
                        </div>
                        <button type='submit' className='btn_login' id='btn_login' disabled={loading}>{loading ? <>Logando...</> : <>Login</>}</button>
                        <a href='/recuperar'>Não consegue fazer login?</a>
                        <a href='/registro'>Criar Conta</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MainLogin