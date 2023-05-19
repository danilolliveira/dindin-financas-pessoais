import { useState } from "react";
import CloseBt from '../../assets/close-bt.svg';
import { putUserOnApi } from "../../database/repository";
import { getItem } from "../../utils/storage";

export default function EditProfileForm({ user, setUser, setOpenProfileForm }) {
    const [form, setForm] = useState({
        nome: user.nome, email: user.email, senha: '', confirmacaoSenha: ''
    });
    const [error, setError] = useState([false, '']);
    const token = getItem('token');


    const handleInputChange = (e) => {
        setError(false);
        const input = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [input]: value });
    }

    const handleSubmition = async (e) => {
        e.preventDefault();
        const { nome, email, senha, confirmacaoSenha } = form;
        if (!nome || !email || !senha || !confirmacaoSenha) {
            setError([true, 'Preencha todos os campos!']);
            return
        }
        const newUserData = {
            nome, email, senha, confirmacaoSenha
        }
        const response = await putUserOnApi(token, newUserData);
        if (!response) return
        setUser({ ...user, ...newUserData });
        setOpenProfileForm(false);
    }


    return (
        <div className='TransactionForm'>
            <form action='PUT' onSubmit={handleSubmition}>
                <div>
                    <h1>Editar Perfil</h1>
                    <img src={CloseBt} onClick={() => { setOpenProfileForm(false) }} />
                </div>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome" onChange={handleInputChange}
                        value={form.nome}
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" onChange={handleInputChange}
                        value={form.email}
                    />
                </div>
                <div>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" id="senha" onChange={handleInputChange}
                        value={form.senha}
                    />
                    <label htmlFor="confirmacaoSenha">Confirmação de senha</label>
                    <input type="password" name="confirmacaoSenha" id="confirmacaoSenha" onChange={handleInputChange}
                        value={form.confirmacaoSenha}
                    />
                </div>
                {error[0] && <p className='error'>{error[1]}</p>}
                <button type='submit'>Confirmar</button>
            </form>
        </div>
    )
}