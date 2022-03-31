import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import withStyles from "@mui/styles/withStyles";

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

const Customers = (props) => {
    const { classes, customers } = props;

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
                            const { customer_id, image, name, birthday, gender, job } = customer;
                            return (
                                <TableRow key={key}>
                                    <TableCell>{customer_id}</TableCell>
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