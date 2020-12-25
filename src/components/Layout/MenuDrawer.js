import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {dashboardRouter} from "../../consts/router";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {Collapse} from "@material-ui/core";
import {useHistory} from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        backgroundColor: theme.palette.color[5][theme.palette.type],
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        backgroundColor: theme.palette.color[0][theme.palette.type],
        width: drawerWidth,
    }

}));
const useStyleSubItem = makeStyles((theme) => ({
    listItem: {
        color: theme.palette.color[3][theme.palette.type],
        paddingLeft: (ratio) => (theme.spacing(4) * ratio) * 0.5
    },
    listIconItem: {
        color: theme.palette.color[3][theme.palette.type],
        width: 18,
        height: 18
    }
}));

function ListItemBySubItem({route}) {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const classes = useStyleSubItem(route.id.toString().length);


    const handleClick = useCallback(() => {
        if (route.component) {
            history.push(route.path)
        } else {
            setOpen(prevState => !prevState);
        }
    }, [route]);
    return (<>
            <ListItem onClick={handleClick} className={classes.listItem}
                      button key={route.title}>
                <ListItemIcon>{<route.icon className={classes.listIconItem}/>}</ListItemIcon>
                <ListItemText primary={route.title}/>
                {route.children ? (open ? <ExpandLess/> : <ExpandMore/>) : null}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {route.children && route.children.map(routeChild => {
                        return (
                            <ListItemBySubItem route={routeChild}/>
                            // <ListItem onClick={handleClick} className={classes.listItem} button key={routeChild.title}>
                            //     <ListItemIcon>{<route.icon className={classes.listIconItem}/>}</ListItemIcon>
                            //     <ListItemText primary={routeChild.title}/>
                            //     {routeChild.children ? (open ? <ExpandLess/> : <ExpandMore/>) : null}
                            // </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </>
    )
}

function MenuDrawer(props) {
    const {windows} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                logo
            </div>
            <Divider/>
            <List>
                {dashboardRouter.map((route, index) => (
                    <ListItemBySubItem route={route}/>
                ))}
            </List>
        </div>
    );

    const container = windows !== undefined ? () => windows().document.body : undefined;

    return (
        <>
            {/*<CssBaseline />*/}
            <AppBar elevation={1} position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon color={"secondary"}/>
                    </IconButton>
                    <Typography color={"textSecondary"} variant="h6" noWrap>
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </>
    );
}

MenuDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    windows: PropTypes.func,
};

export default MenuDrawer;