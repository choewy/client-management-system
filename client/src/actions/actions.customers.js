import axios from 'axios';

export const getCustomers = async () => {
    const { data: { success, rows, message } } = await axios.get('/api/customers');
    return { success, rows, message };
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
    const { data: { success, row, message } } = await axios.post('/api/customers', formData, config);
    return { success, row, message };
};

export const deleteCustomer = async (customer_id) => {
    const { data: { success, message } } = await axios.delete(`/api/customers/${customer_id}`);
    return { success, message };
};