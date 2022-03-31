import axios from 'axios';

export const getCustomers = async () => {
    const { data: { success, rows } } = await axios.get('/api/customers');
    return { success, rows };
};

export const addCustomer = async (body) => {
    const formData = new FormData();
    Object.keys(body).forEach(key => {
        formData.append(key, body[key]);
    });
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const { data: { success, row } } = await axios.post('/api/customers', formData, config);
    return { success, row };
};