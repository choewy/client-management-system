import axios from 'axios';

export const getCustomers = async () => {
    const { data: { ok, rows, message } } = await axios.get('/api/customers');
    return { ok, rows, message };
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
    const { data: { ok, row, message } } = await axios.post('/api/customers', formData, config);
    return { ok, row, message };
};

export const deleteCustomer = async (customer_id) => {
    const { data: { ok, message } } = await axios.delete(`/api/customers/${customer_id}`);
    return { ok, message };
};