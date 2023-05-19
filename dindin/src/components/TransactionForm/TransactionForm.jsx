import { useEffect, useState } from 'react';
import './TransactionForm.css';
import CloseBt from '../../assets/close-bt.svg'
import { postTransactionOnApi, putTransactionOnApi } from '../../database/repository';
import { getItem } from '../../utils/storage';
import { formatDate } from '../../utils/helper';

export default function TransactionForm({ categories, setOpenTransactionForm, getStatment, handleTransactionsChange, title, currentTransactionEditing, setCurrentTransactionEditing }) {
    const [transactionType, setTransactionType] = useState('saida');
    const [form, setForm] = useState({
        valor: '0', categoria_id: 0, data: '', descricao: ''
    });
    const [error, setError] = useState([false, '']);
    const [editingTransactionId, setEditingTransactionId] = useState(undefined);
    const token = getItem('token');

    const handleCategoryChange = (chosenTransactionType) => {
        setTransactionType(chosenTransactionType === 'entrada' ? 'entrada' : 'saida');
    }

    const handleInputChange = (e) => {
        setError(false);
        const input = e.target.name;
        let value;
        if (input === 'valor') {
            const slicedValuer = e.target.value.slice(2)
            if (isNaN(slicedValuer)) {
                value = form.valor
            } else {
                value = (slicedValuer);
            }
        } else if (input === 'categoria_id') {
            value = e.target.value;
            const categoria_nome = e.target.querySelector(`option[value="${value}"]`);
            setForm({ ...form, [input]: value, categoria_nome: categoria_nome.className })
            return
        } else {
            value = e.target.value;
        }
        setForm({ ...form, [input]: value })
    }

    const handleSubmition = async (e) => {
        e.preventDefault();
        const { valor, categoria_id, data, descricao } = form;
        if (!valor || valor == 0 || !categoria_id || !data || !descricao) {
            setError([true, 'Preencha todos os campos!']);
            return
        }
        const formatedValue = valor * 100;
        const splitedDate = data.split('-');
        const formatedDate = new Date(splitedDate[0], (splitedDate[1] - 1), splitedDate[2], 20);
        const newTransaction = {
            tipo: transactionType,
            descricao,
            valor: formatedValue,
            data: formatedDate,
            categoria_id
        }
        if (title === 'Adicionar') {
            const { data } = await postTransactionOnApi(token, newTransaction);
            if (!data) return
            const { id } = data;
            handleTransactionsChange('add', { ...newTransaction, categoria_nome: form.categoria_nome, id });
        } else if (title === "Editar") {
            const editedTransactionData = { ...newTransaction, id: editingTransactionId }
            await putTransactionOnApi(token, editingTransactionId, editedTransactionData);
            handleTransactionsChange('edit', { ...editedTransactionData, categoria_nome: form.categoria_nome }, editingTransactionId);
        }
        setOpenTransactionForm(false);

        getStatment();
    }

    useEffect(() => {
        if (currentTransactionEditing) {
            const date = formatDate(currentTransactionEditing.data, formatDate(currentTransactionEditing.data, "yyyy-MM-dd"));
            const valor = currentTransactionEditing.valor / 100;
            setForm({ ...currentTransactionEditing, data: date, valor });
            setTransactionType(currentTransactionEditing.tipo);
            setEditingTransactionId(currentTransactionEditing.id);
            setCurrentTransactionEditing(undefined);
        }
    }, [])

    return (
        <div className='TransactionForm'>
            <form action={title === 'Adicionar' ? 'POST' : 'PUT'} onSubmit={handleSubmition}>
                <div>
                    <h1>{title} registro </h1>
                    <img src={CloseBt} onClick={() => { setOpenTransactionForm(false) }} />
                </div>
                <div className='buttons'>
                    <button type='button' onClick={() => handleCategoryChange('entrada')}
                        className={transactionType === 'entrada' ? 'entrada' : ''}
                    >Entrada</button>
                    <button type='button' onClick={() => handleCategoryChange('saida')}
                        className={transactionType === 'saida' ? 'saida' : ''}
                    >Saída</button>
                </div>
                <div>
                    <label htmlFor="valor">Valor</label>
                    <input type="text" name="valor" id="valor" onChange={handleInputChange}
                        value={`R$${(+form.valor).toFixed(2)}`}
                    />
                </div>
                <div>
                    <label htmlFor="categorias">Categorias</label>
                    <select name="categoria_id" id="categorias" onChange={handleInputChange} value={form.categoria_id}>
                        <option value={null} defaultValue >Selecione uma categoria</option>
                        {!!categories && categories.map(category => (
                            <option key={category.id} value={category.id} className={category.descricao}>{category.descricao}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="data">Data</label>
                    <input type="date" name="data" id="data" value={form.data} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" name="descricao" id="descricao" value={form.descricao} onChange={handleInputChange} />
                </div>
                {error[0] && <p className='error'>{error[1]}</p>}
                <button type='submit'>Confirmar</button>
            </form>
        </div>
    )
}