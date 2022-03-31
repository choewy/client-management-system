import Paper from "@mui/material/Paper";
import withStyles from "@mui/styles/withStyles";
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

  return (
    <Paper className={classes.app}>
      <Customers />
    </Paper>
  );
};

export default withStyles(styles)(App);