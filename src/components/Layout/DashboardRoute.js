import React, {useEffect} from 'react';
import {Route, useHistory, withRouter} from 'react-router-dom';
import MenuDrawer from "./MenuDrawer";
import {dashboardRouter} from "../../consts/router";
import {makeStyles} from "@material-ui/core/styles";


DashboardRoute.propTypes = {};
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: "100%",
        },
        toolbar: {
            ...theme.mixins.toolbar
        },
        content: {
            height: "auto",
            overflowY: "auto",
            backgroundColor: theme.palette.color[5][theme.palette.type],
            flexGrow: 1,
            padding: 12,
        },
    }))
;

function DashboardRoute(props) {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("user") && !localStorage.getItem("token")) {
            localStorage.clear();
            history.push("/login");
        }
    }, [props, history])

    return (
        <div className={classes.root}>
            <MenuDrawer/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {
                    dashboardRouter.map(route => {
                        if (route.component) {
                            return (<Route key={route.id} exact={route.exact} path={route.path}
                                           component={route.component}/>)
                        } else if (route.children) {
                            return (
                                <Route key={route.id} exact={route.exact} path={route.path}>
                                    {route.children.map(routeChild => {
                                        return <Route key={routeChild.id} exact={routeChild.exact}
                                                      path={routeChild.path}
                                                      component={routeChild.component}/>
                                    })
                                    }
                                </Route>)
                        }
                    })
                }
            </main>
        </div>
    );
}

export default withRouter(DashboardRoute);