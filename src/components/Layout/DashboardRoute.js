import React from 'react';
import {dashboardRouter} from '../../consts/router';
import {Route} from 'react-router-dom';


DashboardRoute.propTypes = {};

function DashboardRoute(props) {
    return (
        dashboardRouter.map(route => {
            if (route.component) {
                return (<Route exact={route.exact} path={route.path} component={route.component}/>)
            } else if (route.children) {
                return (
                    <Route exact={route.exact} path={route.path}>
                        {route.children.map(routeChild => {
                            return <Route exact={routeChild.exact} path={routeChild.path}
                                          component={routeChild.component}/>
                        })
                        }
                    </Route>)
            }
        })
    );
}

export default DashboardRoute;