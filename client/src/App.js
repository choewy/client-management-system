import Paper from "@mui/material/Paper";
import withStyles from "@mui/styles/withStyles";
import Customer from "./components/Customer";

const clientProps = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/any",
    name: "최원영",
    birthday: "950302",
    gender: "남자",
    job: "선원"
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/any",
    name: "테스트",
    birthday: "950302",
    gender: "남자",
    job: "선원"
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/any",
    name: "홍길동",
    birthday: "950302",
    gender: "남자",
    job: "선원"
  }
];

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
      <Customer customers={clientProps} />
    </Paper>
  );
};

export default withStyles(styles)(App);