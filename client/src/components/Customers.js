import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import withStyles from "@mui/styles/withStyles";
import CustomerDelete from "./CustomerDelete";

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
    },
    imageNull: {
        width: 60,
        height: 60,
        backgroundColor: '#ddd',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: '#888'
    },
});

const tableColumns = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "등록일자"]

const Customers = (props) => {
    const { classes, customers, setCustomers } = props;

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
                        {
                            tableColumns.map((column, key) => {
                                return <TableCell key={key}>{column}</TableCell>;
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        customers.map((customer, key) => {
                            const { customer_id, image, name, birthday, gender, job, createdAt } = customer;
                            const customerDeleteProps = {
                                customer_id,
                                customers,
                                setCustomers
                            };
                            return (
                                <TableRow key={key}>
                                    <TableCell>{key + 1}</TableCell>
                                    <TableCell>
                                        {
                                            image
                                                ? <img className={classes.image} alt="profile" src={image} />
                                                : <div className={classes.imageNull}>NULL</div>
                                        }
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
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default withStyles(styles)(Customers);