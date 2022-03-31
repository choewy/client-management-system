import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import { deleteCustomer } from "../actions/actions.customers";

const styles = (theme) => ({});

const CustomerDelete = (props) => {
    const { customer_id, customers, setCustomers } = props;
    const [open, setOpen] = useState(false);

    const dialogOpenHandler = () => {
        setOpen(true);
    };

    const dialogCloseHandler = () => {
        setOpen(false);
    };

    const customerDeleteHandler = async () => {
        const { success, message } = await deleteCustomer(customer_id);
        if (!success) return alert(message);
        setCustomers(customers.filter(customer => customer.customer_id !== customer_id));
    };

    return (<>
        <Button variant="contained" color="error" onClick={dialogOpenHandler}>삭제</Button>
        <Dialog open={open} onClose={dialogCloseHandler}>
            <DialogTitle>
                고객 정보를 삭제하시겠습니까?
            </DialogTitle>
            <DialogContent>
                <Typography>
                    해당 고객 정보가 삭제됩니다.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={customerDeleteHandler}>삭제</Button>
                <Button variant="outlined" color="primary" onClick={dialogCloseHandler}>취소</Button>
            </DialogActions>
        </Dialog>
    </>);
};

export default withStyles(styles)(CustomerDelete);