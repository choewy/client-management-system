import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import withStyles from "@mui/styles/withStyles";
import CustomerDelete from "./CustomerDelete";
import CustomerAdd from "./CustomerAdd";

const styles = (theme) => ({
    table: {
        minWidth: 1080
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1
    },
    image: {
        width: 60,
        height: 60
    }
});

const tableColumns = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "등록일자", ""]

const Customers = (props) => {
    const { classes, customers, setCustomers } = props;

    if (!customers) {
        return (
            <Backdrop className={classes.backdrop} open={customers ? false : true}>
                <CircularProgress />
            </Backdrop>
        );
    };

    const renderTableHeadCells = () => {
        return (
            <TableRow>
                {tableColumns.map((column, key) =>
                    <TableCell key={key}>{column}</TableCell>)}
            </TableRow>
        );
    };

    const renderTableBodyCells = () => {
        return customers.map((customer, key) => {
            const { customer_id, image, name, birthday, gender, job, createdAt } = customer;
            const customerDeleteProps = {
                customer_id,
                customers,
                setCustomers
            };
            const imageProps = {
                className: classes.image,
                src: image ? image : 'img/default_profile.png'
            };
            return (
                <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>
                        <img alt="profile" {...imageProps} />
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{birthday}</TableCell>
                    <TableCell>{gender}</TableCell>
                    <TableCell>{job}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                        <CustomerDelete {...customerDeleteProps} />
                    </TableCell>
                </TableRow>
            );
        });
    };

    const customerAddProps = {
        customers, setCustomers
    };

    return (
        <div>
            <CustomerAdd {...customerAddProps} />
            <Table className={classes.table}>
                <TableHead>
                    {renderTableHeadCells()}
                </TableHead>
                <TableBody>
                    {renderTableBodyCells()}
                </TableBody>
            </Table>
        </div>
    );
};

export default withStyles(styles)(Customers);