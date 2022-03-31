import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import withStyles from "@mui/styles/withStyles";
import { useEffect, useState } from "react";
import { getCustomers } from "../actions/actions.customers";

const styles = (theme) => ({
    table: {
        minWidth: 1080
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1
    }
});

const Customers = (props) => {
    const { classes } = props;
    const [customers, setCustomers] = useState();

    useEffect(() => {
        const getCustomerRows = async () => {
            const { success, rows } = await getCustomers();
            if (success) return setCustomers(rows);
            return alert("불러올 수 없습니다.");
        };
        return () => getCustomerRows();
    }, []);

    if (!customers) {
        return (
            <Backdrop className={classes.backdrop} open={customers ? false : true}>
                <CircularProgress />
            </Backdrop>
        );
    };

    return (
        <div>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>이미지</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>생년월일</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>직업</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        customers.map((customer, key) => {
                            return (
                                <TableRow key={key}>
                                    <TableCell>{customer.id}</TableCell>
                                    <TableCell><img alt="profile" src={customer.image} /></TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.birthday}</TableCell>
                                    <TableCell>{customer.gender}</TableCell>
                                    <TableCell>{customer.job}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default withStyles(styles)(Customers);