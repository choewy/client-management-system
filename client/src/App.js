import Paper from "@mui/material/Paper";
import withStyles from "@mui/styles/withStyles";
import { useEffect, useState } from "react";
import { getCustomers } from "./actions/actions.customers";
import CustomerAdd from "./components/CustomerAdd";
import Customers from "./components/Customers";

const styles = (theme) => ({
  app: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
});

const App = (props) => {
  const { classes } = props;
  const [customers, setCustomers] = useState();

  const customerAddProps = {
    customers, setCustomers
  };

  const customersProps = {
    customers, setCustomers
  };

  useEffect(() => {
    const getCustomerRows = async () => {
      const { success, rows } = await getCustomers();
      if (success) return setCustomers(rows);
      return alert("불러올 수 없습니다.");
    };
    return () => getCustomerRows();
  }, []);

  return (
    <div>
      <CustomerAdd {...customerAddProps} />
      <Paper className={classes.app}>
        <Customers {...customersProps} />
      </Paper>
    </div>
  );
};

export default withStyles(styles)(App);