import { useState } from "react";
import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import CustomerDeleteDialog from "./CustomerDeleteDialog";

const styles = () => ({});

const CustomerDelete = (props) => {
    const { customer_id, customers, setCustomers } = props;
    const [open, setOpen] = useState(false);

    const dialogOpen = () => setOpen(true);
    const dialogClose = () => setOpen(false);

    const buttonProps = {
        variant: 'contained',
        color: 'error',
        onClick: dialogOpen
    };

    const dialogProps = {
        open,
        customer_id,
        customers,
        setCustomers,
        dialogClose
    };

    return (<>
        <Button {...buttonProps}>삭제</Button>
        <CustomerDeleteDialog {...dialogProps} />
    </>);
};

export default withStyles(styles)(CustomerDelete);