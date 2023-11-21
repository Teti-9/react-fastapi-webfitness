import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
};

const handlePost = async ({ musculo, nome_exercicio, carga, repeticoes }) => {
    try {
        toast('Criando Exercício...');
        await axios.post('http://localhost:8000/exercicios', { musculo, nome_exercicio, carga, repeticoes }, config);
        toast.dismiss();
        toast('Exercício criado com sucesso, atualize a tabela.');
    } catch (error) {
        toast.dismiss();
        if (error.message === 'Request failed with status code 400')
            toast('Prencha o formulário corretamente!');
    }
}

export default handlePost