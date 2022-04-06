import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import { deleteCustomer } from "../../actions/actions.customers";

const styles = () => ({});

const CustomerDeleteDialog = (props) => {
    const { open, customer_id, customers, setCustomers, dialogClose } = props;

    const dialogProps = {
        open,
        onClose: dialogClose
    };

    const customerDeleteHandler = async () => {
        const { ok, message } = await deleteCustomer(customer_id);
        if (!ok) return alert(message);
        setCustomers(
            customers.filter((customer) =>
                customer.customer_id !== customer_id)
        );
    };

    const deleteButtonProps = {
        variant: "contained",
        color: "primary",
        onClick: customerDeleteHandler
    };

    const cancelButtonProps = {
        variant: "contained",
        color: "primary",
        onClick: dialogClose
    };

    return (
        <Dialog {...dialogProps}>
            <DialogTitle>
                고객 정보를 삭제하시겠습니까?
            </DialogTitle>
            <DialogContent>
                <Typography>
                    해당 고객 정보가 삭제됩니다.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button {...deleteButtonProps}>삭제</Button>
                <Button {...cancelButtonProps}>취소</Button>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(CustomerDeleteDialog);