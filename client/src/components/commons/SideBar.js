import withStyles from "@mui/styles/withStyles";
import IconButton from '@mui/material/IconButton';
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import ListItem from "@mui/material/ListItem";
import SideBarMainItems from "./SideBarMainItems";
import SideBarMenuItems from "./SideBarMenuItems";

const styles = (theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
});

const drawerWidth = 240;

const SideBar = (props) => {
    const { classes, open, navbarCloseHandler } = props;

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}>
            <div className={classes.drawerHeader}>
                <ListItem >
                    최원영(choewy)
                </ListItem>
                <IconButton onClick={navbarCloseHandler}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <SideBarMainItems />
            <Divider />
            <SideBarMenuItems navbarCloseHandler={navbarCloseHandler} />
        </Drawer>
    );
};

export default withStyles(styles)(SideBar);