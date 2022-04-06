import { useState } from "react";
import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import CustomerAddDialog from "./CustomerAddDialog";

const styles = () => ({});

const CustomerAdd = (props) => {
    const { customers, setCustomers } = props;
    const [open, setOpen] = useState(false);

    const dialogOpen = () => setOpen(true);
    const dialogClose = () => setOpen(false);

    const buttonProps = {
        variant: "contained",
        color: "primary",
        onClick: dialogOpen
    };

    const dialogProps = {
        open,
        customers,
        setCustomers,
        dialogClose
    };

    return (<>
        <Button {...buttonProps}>고객 등록</Button>
        <CustomerAddDialog {...dialogProps} />
    </>);
};

export default withStyles(styles)(CustomerAdd);