import withStyles from "@mui/styles/withStyles";
import { deleteCustomer } from "../actions/actions.customers";

const styles = (theme) => ({});

const CustomerDelete = (props) => {
    const { customer_id, customers, setCustomers } = props;

    const customerDeleteHandler = async () => {
        const { success, message } = await deleteCustomer(customer_id);
        if (!success) return alert(message);
        setCustomers(customers.filter(customer => customer.customer_id !== customer_id));
    };

    return (
        <button onClick={customerDeleteHandler}>삭제</button>
    );
};

export default withStyles(styles)(CustomerDelete);