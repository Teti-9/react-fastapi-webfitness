import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/verificacao.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainVerificacao() {

    useEffect(() => {
        document.title = 'Verification Page';
    }, []);

    const urlcontrol = async () => {
        const redirectvalido = !!localStorage.getItem('urlcontrol')
        if (redirectvalido === false) {
            return (window.location.href = '/login')
        }
    }

    urlcontrol()

    const [loading, setLoading] = useState(false);
    const [codigo, setCodigo] = useState('');

    const handleVerificar = async ({ codigo }) => {
        try {
            setLoading(true);
            toast("Verificando código, aguarde...");
            await axios.post(`http://localhost:8000/verificacao/${codigo}`, { codigo });
            setLoading(false);
            toast.dismiss();
            alert('Conta verificada com sucesso!')
            localStorage.removeItem('urlcontrol')
            window.location.href = '/login';
        } catch (error) {
            setLoading(false);
            toast.dismiss();
            if (error.message === 'Request failed with status code 400')
                toast("Código Incorreto!");

            else if (error.message === 'Request failed with status code 409')
                toast("Usuário já verificado!");
        }
    }

    const handleVerificacao = async (e) => {
        e.preventDefault();
        handleVerificar({ codigo })
    }

    return (
        <div className="main_verificacao">
            <div className="verificacao">
                <form onSubmit={handleVerificacao} className="formVerificacao">
                    <div className="card_verificacao">
                        <h1>Verificação</h1>
                        <div className="textfield">
                            <label htmlFor="usuario">Código de Verificação</label>
                            <input type="text" name="codigo" placeholder="Digite o código recebido" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn_confirmar" disabled={loading}>{loading ? <>Confirmando...</> : <>Confirmar</>}</button>
                        <a href='/login'>Continuar sem verificação</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MainVerificacao