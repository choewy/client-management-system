import Paper from "@mui/material/Paper";
import { alpha } from '@mui/material/styles';
import withStyles from "@mui/styles/withStyles";
import { useEffect, useState } from "react";
import { getCustomers } from "./actions/actions.customers";
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/commons/NavBar";
import SideBar from "./components/commons/SideBar";
import Customers from "./components/customers/Customers";
import { Route, Routes } from "react-router-dom";
import Components from "./components/Components";

const styles = (theme) => ({
  app: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchWrapper: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputBase: {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }
});

const components = Components();

const App = (props) => {
  const { classes } = props;
  const [customers, setCustomers] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getCustomerRows = async () => {
      const { ok, rows } = await getCustomers();
      if (ok) return setCustomers(rows);
      return alert("불러올 수 없습니다.");
    };
    return () => getCustomerRows();
  }, []);

  const navbarOpenHandler = () => {
    setOpen(true);
  };

  const navbarCloseHandler = () => {
    setOpen(false);
  };

  const navBarProps = {
    open,
    navbarOpenHandler,
  };

  const sideBarProps = {
    open,
    navbarCloseHandler
  };

  const componentProps = {
    customers, setCustomers
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavBar {...navBarProps} />
        <SideBar {...sideBarProps} />
      </Box>
      <Paper className={classes.app}>
        <Routes>
          {
            components.map((component, key) => {
              const { path, element } = component(componentProps);
              const routeProps = { path, element };
              return <Route {...routeProps} />;
            })
          }
        </Routes>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(App);