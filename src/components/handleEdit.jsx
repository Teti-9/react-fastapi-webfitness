import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
};

const handlePut = async ({ exercicioEdit, musculo, nome_exercicio, carga, repeticoes }) => {
    try {
        toast('Editando Exercício...');
        await axios.put(`http://localhost:8000/exercicios/${exercicioEdit}`, { musculo, nome_exercicio, carga, repeticoes }, config);
        toast.dismiss();
        toast('Exercício editado com sucesso, atualize a tabela!');
    } catch (error) {
        toast.dismiss();
        if (error.message === 'Request failed with status code 400')
            toast('Não existe um exercício com este id!');
        else if (error.message === 'Request failed with status code 404')
            toast('Prencha o formulário corretamente!');
    }
}

export default handlePut