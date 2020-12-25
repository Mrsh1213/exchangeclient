import React, {useCallback, useEffect, useState} from 'react';
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
import {Collapse, Grid} from "@material-ui/core";
import {useHistory} from "react-router";
import {MdExitToApp, MdNotificationsNone} from "react-icons/all";
import ChangeLanguage from "../Common/ChangeLanguage";

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
    toolbar: {padding: 6, ...theme.mixins.toolbar},
    drawerPaper: {
        backgroundColor: theme.palette.color[0][theme.palette.type],
        width: drawerWidth,
    },
    iconAppBar: {
        fontSize: 24,
        width: 24,
        height: 24
    }

}));
const useStyleSubItem = makeStyles((theme) => {
    return ({
        listItem: theme.direction === "rtl" ? {
            color: (props) => props.selected ? theme.palette.color["text1"][theme.palette.type] : theme.palette.color[3][theme.palette.type],
            // backgroundColor:(props) => (!props.selected?theme.palette.color[0][theme.palette.type]:theme.palette.color[3][theme.palette.type]),
            paddingRight: (props) => (theme.spacing(4) * props.ratio) * 0.5
        } : {
            color: (props) => props.selected ? theme.palette.color["text1"][theme.palette.type] : theme.palette.color[3][theme.palette.type],
            // backgroundColor:(props) => (!props.selected?theme.palette.color[0][theme.palette.type]:theme.palette.color[3][theme.palette.type]),
            paddingLeft: (props) => (theme.spacing(4) * props.ratio) * 0.5
        },
        listIconItem: {
            color: (props) => props.selected ? theme.palette.color["text1"][theme.palette.type] : theme.palette.color[3][theme.palette.type],
            width: 18,
            height: 18
        }
    })
});

function ListItemBySubItem({route, handleSelectedMenu}) {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const classes = useStyleSubItem({
        ratio: route.id.toString().length,
        selected: history.location.pathname === route.path
    });

    useEffect(() => {
        if (history.location.pathname === route.path) {
            handleSelectedMenu(route);
        }
    }, [route])
    const handleClick = useCallback(() => {
        if (route.component) {
            history.push(route.path);
            handleSelectedMenu(route);
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
            {route.children ?
                <Collapse in={open} timeout="auto">
                    <List component="div" disablePadding>
                        {route.children && route.children.map(routeChild => {
                            return (
                                <ListItemBySubItem handleSelectedMenu={handleSelectedMenu} key={routeChild.id}
                                                   route={routeChild}/>
                                // <ListItem onClick={handleClick} className={classes.listItem} button key={routeChild.title}>
                                //     <ListItemIcon>{<route.icon className={classes.listIconItem}/>}</ListItemIcon>
                                //     <ListItemText primary={routeChild.title}/>
                                //     {routeChild.children ? (open ? <ExpandLess/> : <ExpandMore/>) : null}
                                // </ListItem>
                            );
                        })}
                    </List>
                </Collapse> : null
            }
        </>
    )
}

function MenuDrawer(props) {
    const {windows} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedMenu, setSelectedMenu] = React.useState({title: "dashboard", id: 1});
    const history = useHistory();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleExit = () => {
        localStorage.clear();
        history.push("/login");
    };
    const handleSelectedMenu = useCallback((menu) => {
        setSelectedMenu(menu);
    }, []);

    const drawer = (
        <div>
            <Grid className={classes.toolbar} alignItems={"center"} container>
                <Grid className={classes.logo} xs={4} item>
                    <img width={48} height={48} alt="logo-app-dashboard" src="/images/logo.png"/>
                </Grid>
                <Grid className={classes.nameAppContainer} xs={8} item>
                    <div><Typography color={"textSecondary"}
                                     variant={"caption"}>Excops</Typography></div>
                    <div><Typography color={"textPrimary"} variant={"caption"}>Exchange
                        Center</Typography></div>
                </Grid>
            </Grid>
            <Divider/>
            <List>
                {dashboardRouter.map((route, index) => (
                    <ListItemBySubItem handleSelectedMenu={handleSelectedMenu} key={route.id} route={route}/>
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
                    <Grid alignItems={"center"} container>
                        <Grid alignItems={"center"} xs={6} md={8} container item>
                            <Hidden smUp>
                                <Grid xs={2} item>
                                    <IconButton
                                        size={"small"}
                                        color="inherit"
                                        aria-label="open drawer"
                                        edge="start"
                                        onClick={handleDrawerToggle}
                                        className={classes.menuButton}
                                    >
                                        <MenuIcon color={"secondary"}/>
                                    </IconButton>
                                </Grid>
                            </Hidden>
                            <Grid xs={9} md={12} item>
                                <Typography color={"textSecondary"} variant="h5" noWrap>
                                    {selectedMenu.title}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid justify={"flex-end"} container xs={6} md={4} item>
                            <ChangeLanguage/>
                            <IconButton color={"secondary"} size={"small"}>
                                <MdNotificationsNone className={classes.iconAppBar}/>
                            </IconButton>
                            <IconButton onClick={handleExit} color={"secondary"} size={"small"}>
                                <MdExitToApp
                                    style={theme.direction === "rtl" ? {transform: "rotate(180deg)"} : undefined}
                                    className={classes.iconAppBar}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
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