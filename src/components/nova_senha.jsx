import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function MainNewPass() {

    useEffect(() => {
        document.title = 'Nova Senha';
    }, []);

    const urlcontrol = async () => {
        const redirectvalido = !!localStorage.getItem('urlcontrolnewpass')
        if (redirectvalido === false) {
            return (window.location.href = '/login')
        }
    }

    urlcontrol()

    const [loading, setLoading] = useState(false);
    const [newPass, setNewPass] = useState('');

    const handleMudarSenha = async ({ newPass }) => {
        try {
            setLoading(true);
            toast("Alterando senha, aguarde...");
            await axios.post(`http://localhost:8000/novasenha/${newPass}`, { newPass });
            setLoading(false);
            toast.dismiss();
            alert('Senha alterada com sucesso!')
            localStorage.removeItem('urlcontrolnewpass')
            window.location.href = '/login';
        } catch (error) {
            setLoading(false);
            toast.dismiss();
            toast('Ocorreu um erro, tente novamente!')
        }
    }

    const handleNewPass = async (e) => {
        e.preventDefault();
        handleMudarSenha({ newPass })
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
        <div className="main_recuperar">
            <div className="recuperar">
                <form onSubmit={handleNewPass} className="formRecuperar">
                    <div className="card_recuperar">
                        <h1>Nova Senha</h1>
                        <img src="src\components\eye-close.png" id='eyeicon' onClick={togglePass} />
                        <div className="textfield">
                            <label htmlFor="usuario">Digite sua nova senha</label>
                            <input id='password' type="password" name="password1" placeholder="Digite sua nova senha" value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn_confirmar" disabled={loading}>{loading ? <>Confirmando...</> : <>Confirmar</>}</button>
                        <a href='/login' >Voltar para página de Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MainNewPass