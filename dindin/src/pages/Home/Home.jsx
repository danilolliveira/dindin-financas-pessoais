import { useEffect, useState } from 'react'
import ArrowIcon from '../../assets/arrow.svg'
import FilterImg from '../../assets/filter.svg'
import Header from '../../components/Header/Header'
import TransactionForm from '../../components/TransactionForm/TransactionForm'
import TalbleRow from '../../components/TableRow/TableRow'
import { getCategoriesFromApi, getStatmentFromApi, getTransationsFromApi } from '../../database/repository'
import { getItem } from '../../utils/storage'
import './Home.css'
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm'
import { getUserFromApi } from "../../database/repository";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransaction] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openTransactionForm, setOpenTransactionForm] = useState(false);
    const [transactionFormTitle, setTransactionFormTitle] = useState('');
    const [currentTransactionEditing, setCurrentTransactionEditing] = useState(undefined);
    const [statment, setStatment] = useState({ in: 0, out: 0 });
    const [openProfileForm, setOpenProfileForm] = useState(false);
    const [user, setUser] = useState('');
    const redirect = useNavigate();

    const token = getItem('token');

    const getUser = async () => {
        const response = await getUserFromApi(token);
        const { data } = response;
        if (!data) {
            return response
        }
        setUser(data);
        return response
    }

    const getTransactions = async () => {
        const response = await getTransationsFromApi(token);
        const { data } = response;
        if (!data) {
            return response;
        }
        setTransaction(data);
        return response
    }

    const getStatment = async () => {
        const response = await getStatmentFromApi(token);
        const { data } = response;
        if (!data) {
            return response;
        }
        setStatment({ in: data.entrada / 100, out: data.saida / 100 })
    }

    const getCategories = async () => {
        const response = await getCategoriesFromApi(token);
        const { data } = response;
        if (!data) {
            return response
        }
        setCategories(data);
        return response
    }


    const handleTransactionsChange = (action, newTransactions, transactionsId) => {
        const currentTransactions = [...transactions];
        if (action === 'delete') {
            const transactionsIndex = currentTransactions.findIndex(transactions => transactions.id === transactionsId);
            currentTransactions.splice(transactionsIndex, 1);
        } else if (action === 'add') {
            currentTransactions.push(newTransactions);
        } else if (action === 'edit') {
            const transactionsIndex = currentTransactions.findIndex(transactions => transactions.id === transactionsId);
            currentTransactions.splice(transactionsIndex, 1, newTransactions);
        }
        setTransaction(currentTransactions);
    }

    const handleTransactionFormOpening = () => {
        setTransactionFormTitle('Adicionar');
        setOpenTransactionForm(true);
    }

    const handleTransactionEdit = (transaction) => {
        setTransactionFormTitle('Editar');
        setCurrentTransactionEditing(transaction);
        setOpenTransactionForm(true);
        getStatment();
    }

    async function requests() {
        const { response: firstResponse } = await getUser();
        if (firstResponse && (firstResponse.status === 500 || firstResponse.status === 401)) {
            redirect('/');
            return
        }
        await getTransactions()
        await getStatment();
        await getCategories();
        setLoading(false)
        return
    }
    useEffect(() => {
        requests();
    }, [])

    return (
        <>
            {!loading && <>
                <Header setOpenProfileForm={setOpenProfileForm} />
                <main className="Home">
                    <div className='table-container'>
                        <button id='filter'> <img src={FilterImg} />Filtrar</button>
                        <table className='transactions-table'>
                            <thead>
                                <tr>
                                    <th>Data <img className='sort-date' src={ArrowIcon} alt='sort' /></th>
                                    <th>Dia da semana</th>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!transactions.length ? transactions.map(transaction => {
                                    return (
                                        <TalbleRow key={transaction.id}
                                            transaction={transaction}
                                            handleTransactionsChange={handleTransactionsChange}
                                            handleTransactionEdit={handleTransactionEdit}
                                            getStatment={getStatment}
                                        />
                                    )
                                }) :
                                    <tr>
                                        <td colSpan='7'>Adicione um novo registro!</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="summary">
                        <h1>Resumo</h1>
                        <div>
                            <div>
                                <p>Entradas</p>
                                <p className='in'>R${(statment.in).toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Saídas</p>
                                <p className='out'>R${(statment.out).toFixed(2)}</p>
                            </div>
                        </div>
                        <h2>Saldo R$ {(statment.in - statment.out).toFixed(2)}</h2>
                        <button className='add-to-summary' onClick={handleTransactionFormOpening}>Adicionar Registro</button>
                    </div>
                    {openTransactionForm &&
                        <TransactionForm categories={categories}
                            setOpenTransactionForm={setOpenTransactionForm}
                            getStatment={getStatment}
                            handleTransactionsChange={handleTransactionsChange}
                            title={transactionFormTitle}
                            currentTransactionEditing={currentTransactionEditing}
                            setCurrentTransactionEditing={setCurrentTransactionEditing}
                        />}
                    {openProfileForm &&
                        <EditProfileForm
                            setOpenProfileForm={setOpenProfileForm}
                            user={user}
                            setUser={setUser} />
                    }
                </main>
            </>}
        </>
    )
}