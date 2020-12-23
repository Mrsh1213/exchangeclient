import React from 'react';
import './assets/css/app.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from "@material-ui/styles";
import {create} from 'jss';
import theme from "./consts/theme";
import {jssPreset, StylesProvider} from '@material-ui/core/styles'
import rtl from 'jss-rtl';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import DashboardRoute from "./components/Layout/DashboardRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restore from "./pages/Restore";
import Results from "./pages/Results";
import {getLang, getThemeType} from "./redux/selectors/app";
import {changeLanguage} from "./redux/actions/app";
import Button from "@material-ui/core/Button";

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const App = () => {
    const lang = useSelector(state => getLang(state));
    const themeType = useSelector(state => getThemeType(state));
    const dispatch = useDispatch();

    return (
        < ThemeProvider
    theme = {theme(themeType, lang)} >
        {/* <Button variant={"outlined"} color={"primary"} onClick={() => {
                dispatch(changeLanguage({lang: lang === "en" ? "fa" : "en"}));
            }}>Change language {lang}</Button>*/
        }
    {
        lang === "fa" ?
    <
        StylesProvider
        jss = {jss} >
            < div
        id = "subRoot"
        dir = {"rtl"} >
            < Router >
            < Route
        exact
        path = "/"
        component = {Home}
        />
        < Route
        path = "/results"
        component = {Results}
        />
        < Route
        path = "/movie/:movieId"
        component = {MovieDetail}
        />
        < Route
        path = "/login"
        component = {Login}
        />
        < Route
        path = "/register"
        component = {Register}
        />
        < Route
        path = "/restore"
        component = {Restore}
        />
        < Route
        path = "/dashboard"
        component = {DashboardRoute}
        />
        < /Router>
        < /div>
        < /StylesProvider> :
        < Router >
        < Route
        exact
        path = "/"
        component = {Home}
        />
        < Route
        path = "/results"
        component = {Results}
        />
        < Route
        path = "/movie/:movieId"
        component = {MovieDetail}
        />
        < Route
        path = "/login"
        component = {Login}
        />
        < Route
        path = "/register"
        component = {Register}
        />
        < Route
        path = "/restore"
        component = {Restore}
        />
        < Route
        path = "/dashboard"
        component = {DashboardRoute}
        />
        < /Router>}
        < /ThemeProvider>
    )
}


App.propTypes = {};

export default App;
