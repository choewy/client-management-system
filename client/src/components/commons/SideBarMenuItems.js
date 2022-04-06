import withStyles from "@mui/styles/withStyles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import Components from "../Components";

const styles = (theme) => ({
    menuLink: {
        textDecoration: 'none',
        color: 'inherit'
    }
});

const components = Components();

const SideBarMenuItems = (props) => {
    const { classes, navbarCloseHandler } = props;
    return (
        <List>
            {components.map((component, key) => {
                const { to, label, icon } = component();
                const linkProps = {
                    key, to,
                    className: classes.menuLink,
                    onClick: navbarCloseHandler
                };
                return (
                    <Link {...linkProps}>
                        <ListItem button>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                )
            })}
        </List>
    );
};

export default withStyles(styles)(SideBarMenuItems);