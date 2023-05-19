import axios from '../services/api'


export const getUserFromApi = async (token) => {
    const url = '/usuario';
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export const getTransationsFromApi = async (token) => {
    const url = '/transacao';
    try {
        const response = await axios.get(url,
            { headers: { 'Authorization': `Bearer ${token}` } });
        return response
    } catch (error) {
        return error
    }
}

export const getCategoriesFromApi = async (token) => {
    const url = '/categoria';
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export const postTransactionOnApi = async (token, data) => {
    const url = '/transacao';
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export const putTransactionOnApi = async (token, id, data) => {
    const url = `/transacao/${id}`;
    try {
        const response = await axios.put(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export const getStatmentFromApi = async (token) => {
    const url = '/transacao/extrato';
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export const deleteTransactionFromApi = async (token, id) => {
    const url = `/transacao/${id}`;
    try {
        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export const putUserOnApi = async (token, data) => {
    const url = '/usuario';
    try {
        const response = await axios.put(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}
