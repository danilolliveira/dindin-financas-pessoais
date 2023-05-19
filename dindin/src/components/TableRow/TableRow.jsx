import { useState } from 'react'
import PenIcon from '../../assets/pen.svg'
import TrashIcon from '../../assets/trash.svg'
import EffectIcon from '../../assets/modalEffect.svg'
import './TableRow.css'

import { formatDate, getDayOfWeek } from '../../utils/helper'
import { getItem } from '../../utils/storage'
import { deleteTransactionFromApi } from '../../database/repository'

export default function TalbleRow({ transaction, handleTransactionsChange, handleTransactionEdit, getStatment }) {
    const [del, setDel] = useState(false);

    const { id, tipo, descricao, valor, data, categoria_nome } = transaction;
    const token = getItem('token');

    const formatedDate = formatDate(data);
    const dayOfTheWeek = getDayOfWeek(data);
    const formatedValue = `R$${(valor / 100).toFixed(2)}`;

    const handleDelPopup = () => {
        setDel(!del);
    }

    const handleDeletation = async () => {
        try {
            await deleteTransactionFromApi(token, id);
            handleTransactionsChange('delete', null, id);
            setDel(false);
            getStatment();
        } catch (error) {
            return
        }
    }

    return (
        <tr className='TableRow'>
            <td>{formatedDate}</td>
            <td>{dayOfTheWeek}</td>
            <td>{descricao}</td>
            <td>{categoria_nome}</td>
            <td className={tipo}>{formatedValue}</td>
            <td><img className='edit-icon' src={PenIcon} alt="edit" onClick={() => handleTransactionEdit(transaction)} /></td>
            <td><img className='delete-icon' src={TrashIcon} alt="delete" onClick={handleDelPopup} /></td>
            {del &&
                <td>
                    <div className='modal del'>
                        <img src={EffectIcon} />
                        <p>Apagar item?</p>
                        <div>
                            <button className='yes' onClick={handleDeletation}>Sim</button>
                            <button className='no' onClick={handleDelPopup}>Nao</button>
                        </div>
                    </div>
                </td>}
        </tr>)
}