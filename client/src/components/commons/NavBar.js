import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import withStyles from "@mui/styles/withStyles";

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

const navBarTitle = '고객 관리 시스템';

const NavBar = (props) => {
    const { /*classes,*/ open, navbarOpenHandler } = props;

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    onClick={navbarOpenHandler}>
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                    {navBarTitle}
                </Typography>
                {/* <div className={classes.search}>
          <div className={classes.searchWrapper}>
            <SearchIcon />
          </div>
          <InputBase
            className={classes.searchInputBase}
            placeholder="아직 구현하지 않았습니다."
            inputProps={{ 'aria-label': 'search' }}
            sx={{ color: '#fff' }} />
        </div> */}
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(NavBar);