import axios from 'axios';

export const getCustomers = async () => {
    const { data: { success, rows } } = await axios.get('/api/customers');
    return { success, rows };
};