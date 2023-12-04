import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import '../styles/recuperar_senha.css'

function MainRecoverPass() {

    useEffect(() => {
        document.title = 'Recuperar Senha';
    }, []);

    const userisLogged = () => {
        const user = !!localStorage.getItem('token');
        if (user && user === true) {
            return (window.location.href = '/perfil')
        }
    };

    userisLogged()

    const [loading, setLoading] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [emailRecuperar, setEmailRecuperar] = useState('');
    const [codigo, setCodigo] = useState('');

    const handleEmail = async ({ emailRecuperar }) => {
        try {
            setLoadingEmail(true);
            toast("Enviando email, aguarde...");
            await axios.post(`http://localhost:8000/recuperar/${emailRecuperar}`, { emailRecuperar });
            toast.dismiss();
            toast('Email enviado!')
            document.getElementById("email").value = "";
        } catch (error) {
            setLoadingEmail(false);
            toast.dismiss();
            if (error.message === 'Request failed with status code 400')
                toast("Email não existe!");
            else if (error.message === 'Request failed with status code 404')
                toast('Preencha o campo email corretamente!');
        }
    }

    const handleVerificar = async ({ codigo }) => {
        try {
            setLoading(true);
            toast("Verificando código, aguarde...");
            await axios.post(`http://localhost:8000/recuperarconfirm/${codigo}`, { codigo });
            setLoading(false);
            toast.dismiss();
            alert('Código verificado com sucesso!')
            localStorage.setItem('urlcontrolnewpass', true)
            window.location.href = '/novasenha';
        } catch (error) {
            setLoading(false);
            toast.dismiss();
            if (error.message === 'Request failed with status code 405')
                toast("Esse token já foi consumido!");
            else if (error.message === 'Request failed with status code 401')
                toast("Token expirado!");
            else if (error.message === 'Request failed with status code 404')
                toast('Preencha o campo código corretamente!');
        }
    }

    const handleRecuperar = async (e) => {
        e.preventDefault();
        handleEmail({ emailRecuperar })
    }

    const handleVerificacao = async (e) => {
        e.preventDefault();
        handleVerificar({ codigo })
    }

    return (
        <div className="main_recuperar">
            <div className="recuperar">
                <form className="formRecuperar">
                    <div className="card_recuperar">
                        <h1>Recuperação</h1>
                        <div className="textfield">
                            <label htmlFor="usuario" className='label_recup'>Enviar email de recuperação</label>
                            <input id='email' type="text" name="email" placeholder="Digite o email que deseja recuperar" value={emailRecuperar} onChange={(e) => setEmailRecuperar(e.target.value)} />
                        </div>
                        <button type="submit" className="btn_confirmar" onClick={handleRecuperar} disabled={loadingEmail}>{loadingEmail ? <>Enviado...</> : <>Enviar Email</>}</button>
                        <div className="textfield">
                            <label htmlFor="usuario">Código de Recuperação</label>
                            <input type="text" name="codigo" placeholder="Digite o código recebido" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                        </div>
                        <button type="submit" className="btn_confirmar" onClick={handleVerificacao} disabled={loading}>{loading ? <>Confirmando...</> : <>Confirmar</>}</button>
                        <a href='/login' >Voltar para página de Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MainRecoverPass