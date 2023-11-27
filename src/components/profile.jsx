import { useState, useEffect } from 'react'
import React from "react";
import logout from './handleLogout'
import handlePost from './handleCriar'
import handleDelete from './handleDel'
import handlePut from './handleEdit'
import BasicTable from './BasicTable'
import axios from 'axios'
import { DateTime } from 'luxon'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/profile.css'
import '../styles/formpopUp.css'

function ProfileCards() {

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    localStorage.removeItem('urlcontrol')
    localStorage.removeItem('urlcontrolnewpass')

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [musculoProfile, setMusculoProfile] = useState('');
    const [exercicioDel, setExercicioDel] = useState(new Int16Array);
    const [exercicioEdit, setExercicioEdit] = useState(new Int16Array);
    const [musculo, setMusculo] = useState('');
    const [nome_exercicio, setNome_exercicio] = useState('');
    const [carga, setCarga] = useState('');
    const [repeticoes, setRepeticoes] = useState('');
    const [musculoTitle, setMusculoTitle] = useState('');

    useEffect(() => {
        document.title = 'Profile Page';
        setMusculoTitle('Músculo não definido.')
    }, []);

    const fetchTableData = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await axios.get(`http://localhost:8000/me/${musculoProfile}`, config).then((getResponse) => {
                setData(getResponse.data)

                if (musculoProfile === 'Braco')
                    setMusculoTitle('Braço')
                else if (musculoProfile !== 'Braco')
                    setMusculoTitle(musculoProfile)

                document.getElementById("myFormView").style.display = "none";
            })
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.message === 'Request failed with status code 401') {
                localStorage.removeItem('token')
                toast("Sessão expirada, realize login novamente!")
            }
        }
    }

    const columns = ([
        {
            header: 'ID',
            accessorKey: 'id',
        },

        {
            header: 'Exercício',
            accessorKey: 'nome_exercicio',
        },

        {
            header: 'Carga',
            accessorKey: 'carga',
        },

        {
            header: 'Repetições',
            accessorKey: 'repeticoes',
        },

        {
            header: 'Data',
            accessorKey: 'data',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)

        },
    ])

    const openForm = () => {
        document.getElementById("myForm").style.display = "block";
        document.getElementById("myFormEdit").style.display = "none";
        document.getElementById("myFormDel").style.display = "none";
        document.getElementById("myFormView").style.display = "none";
    }
    const openFormEdit = () => {
        document.getElementById("myFormEdit").style.display = "block";
        document.getElementById("myForm").style.display = "none";
        document.getElementById("myFormDel").style.display = "none";
        document.getElementById("myFormView").style.display = "none";
    }
    const openFormDel = () => {
        document.getElementById("myFormDel").style.display = "block";
        document.getElementById("myForm").style.display = "none";
        document.getElementById("myFormEdit").style.display = "none";
        document.getElementById("myFormView").style.display = "none";
    }
    const openFormView = () => {
        document.getElementById("myFormView").style.display = "block";
        document.getElementById("myForm").style.display = "none";
        document.getElementById("myFormEdit").style.display = "none";
        document.getElementById("myFormDel").style.display = "none";
    }

    const closeForm = () => {
        document.getElementById("myForm").style.display = "none";
        document.getElementById("myFormDel").style.display = "none";
        document.getElementById("myFormEdit").style.display = "none";
        document.getElementById("myFormView").style.display = "none";
    }

    const handleCriar = async (e) => {
        e.preventDefault();
        handlePost({ musculo, nome_exercicio, carga, repeticoes })

        document.getElementById("myForm").style.display = "none";
        setMusculo('Selecione')
        setNome_exercicio('')
        setCarga('')
        setRepeticoes('')

    }

    const handleEdit = async (e) => {
        e.preventDefault();
        handlePut({ exercicioEdit, musculo, nome_exercicio, carga, repeticoes })

        document.getElementById("myFormEdit").style.display = "none";
        setMusculo('Selecione')
        setExercicioEdit(new Int16Array)
        setNome_exercicio('')
        setCarga('')
        setRepeticoes('')
    }

    const handleDel = async (e) => {
        e.preventDefault();
        handleDelete({ exercicioDel })

        document.getElementById("myFormDel").style.display = "none";
        setExercicioDel(new Int16Array)
    }

    return (
        <div className='content'>
            <div className='card'>
                <div className='topCard'>
                    <h2 className='title'>Sua coleção de exercícios</h2>
                    <span className='secondText'>Mantenha um progresso e acompanhe sua evolução.</span>
                </div>
                <div className='mediaCard'></div>
                <div className='bottomCard'>
                    <p className='bottomText'>Crie uma coleção, edite, remova ou visualize <br />e trace uma meta de progresssão.</p>
                    <div className='actionsCard'>
                        <button className='actions' onClick={openForm}>Criar</button>
                        <button className='actions' onClick={openFormEdit}>Editar</button>
                        <button className='actions' onClick={openFormDel}>Remover</button>
                        <button className='actions' onClick={openFormView}>Atualizar Tabela</button>
                        <button className='actionsD' onClick={event => logout(event)}>Deslogar</button>
                    </div>
                </div>
            </div>
            <BasicTable data={data} columns={columns} title_tabela={musculoTitle} />

            <div className="form-popup" id="myForm">
                <form onSubmit={handleCriar} className="form-container">
                    <h1>Criar Exercício</h1>
                    <label htmlFor='musculo'>Músculo<br></br></label>
                    <select className='musculo-select' id='musculo-select-id' value={musculo} onChange={(e) => setMusculo(e.target.value)} required>
                        <option>Selecione</option>
                        <option value="Peito" >Peito</option>
                        <option value="Costas">Costas</option>
                        <option value="Perna">Perna</option>
                        <option value="Ombro">Ombro</option>
                        <option value="Braco">Braço</option>
                        <option value="Abs">Abs</option>
                    </select>
                    <label htmlFor="exercicio"><br></br>Nome do Exercício</label>
                    <input type="text" placeholder="Digite o nome do exercício" name="exercicio" value={nome_exercicio} onChange={(e) => setNome_exercicio(e.target.value)} required />
                    <label htmlFor="carga">Carga</label>
                    <input type="number" placeholder="Carga utilizada" name="carga" value={carga} onChange={(e) => setCarga(e.target.value)} required />
                    <label htmlFor="repeticoes">Repetições</label>
                    <input type="number" placeholder="Número de repetições" name="repeticoes" value={repeticoes} onChange={(e) => setRepeticoes(e.target.value)} required />
                    <button type="submit" className="btn">Criar</button>
                    <button type="button" className="btn" onClick={closeForm}>Fechar</button>
                </form>
            </div>

            <div className="form-popup" id="myFormEdit">
                <form onSubmit={handleEdit} className="form-container">
                    <h1>Editar Exercício</h1>
                    <label htmlFor='musculo'>Músculo<br></br></label>
                    <select className='musculo-select' id='musculo-select-id' value={musculo} onChange={(e) => setMusculo(e.target.value)} required>
                        <option>Selecione</option>
                        <option value="Peito" >Peito</option>
                        <option value="Costas">Costas</option>
                        <option value="Perna">Perna</option>
                        <option value="Ombro">Ombro</option>
                        <option value="Braco">Braço</option>
                        <option value="Abs">Abs</option>
                    </select>
                    <label htmlFor="exercicio"><br></br>ID do Exercício a ser editado</label>
                    <input type="text" placeholder="Cheque a tabela por ids" name="exercicio" value={exercicioEdit} onChange={(e) => setExercicioEdit(e.target.value)} required />
                    <label htmlFor="exercicio"><br></br>Nome do Exercício</label>
                    <input type="text" placeholder="Digite o novo ou mesmo nome" name="exercicio" value={nome_exercicio} onChange={(e) => setNome_exercicio(e.target.value)} required />
                    <label htmlFor="carga">Carga</label>
                    <input type="number" placeholder="Nova ou mesma carga utilizada" name="carga" value={carga} onChange={(e) => setCarga(e.target.value)} required />
                    <label htmlFor="repeticoes">Repetições</label>
                    <input type="number" placeholder="Novo ou mesmo número de reps" name="repeticoes" value={repeticoes} onChange={(e) => setRepeticoes(e.target.value)} required />
                    <button type="submit" className="btn">Editar</button>
                    <button type="button" className="btn" onClick={closeForm}>Fechar</button>
                </form>
            </div>

            <div className="form-popup" id="myFormDel">
                <form onSubmit={handleDel} className="form-container">
                    <h1>Deletar Exercício</h1>
                    <label htmlFor="exercicio"><br></br>ID do Exercício a ser deletado</label>
                    <input type="text" placeholder="Cheque a tabela por ids" name="exercicio" value={exercicioDel} onChange={(e) => setExercicioDel(e.target.value)} required />
                    <button type="submit" className="btn">Deletar</button>
                    <button type="button" className="btn" onClick={closeForm}>Fechar</button>
                </form>
            </div>

            <div className="form-popup" id="myFormView">
                <form onSubmit={fetchTableData} className="form-container">
                    <h1>Atualizar tabela</h1>
                    <label htmlFor='musculo'>Músculo<br></br></label>
                    <select className='musculo-select' id='musculo-select-id' value={musculoProfile} onChange={(e) => setMusculoProfile(e.target.value)} required>
                        <option>Selecione</option>
                        <option value="Peito" >Peito</option>
                        <option value="Costas">Costas</option>
                        <option value="Perna">Perna</option>
                        <option value="Ombro">Ombro</option>
                        <option value="Braco">Braço</option>
                        <option value="Abs">Abs</option>
                    </select>
                    <button type="submit" className="btn" disabled={loading}>{loading ? <>Atualizando..</> : <>Atualizar</>}</button>
                    <button type="button" className="btn" onClick={closeForm}>Fechar</button>
                </form>
            </div>

        </div >
    );
}

export default ProfileCards