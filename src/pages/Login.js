import React from 'react';
import {Card, Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';
import Button from "@material-ui/core/Button";

Login.propTypes = {};

const styles = makeStyles((theme) => {
    return ({
        container: {
            backgroundColor: theme.palette.color[4][theme.palette.type],
            textAlign: "center", height: "100%"
        },
        card: {
            padding: "4vw 6vw",
            backgroundColor: theme.palette.color[1][theme.palette.type],
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },
        cardHeader: {
            background: theme.palette.color[2][theme.palette.type],
            color: theme.palette.color["text1"][theme.palette.type],
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: "12px 8px",
        },
        h2: {
            fontSize: 24,
            marginBottom: 5
        },
        h3: {
            fontSize: 12,
            color: theme.palette.color[3][theme.palette.type]
        },
        logo: {
            textAlign: "right"
        },
        nameAppContainer: {
            textAlign: "left"
        },
        btnSubmit: {
            marginTop: 48,
            fontWeight: "bold"
        }
    })
});

function Login(props) {
    const classes = styles();
    return (
        < Grid
    container
    className = {classes.container}
    justify = {"center"} >
        < Grid
    xs = {1}
    sm = {3}
    md = {4}
    item / >
    < Grid
    justify = {"center"}
    xs = {10}
    sm = {6}
    md = {4}
    container
    item >
    < Grid
    xs = {2}
    item / >
    < Grid
    spacing = {2}
    xs = {8}
    alignItems = {"center"}
    container
    item >
    < Grid
    className = {classes.logo}
    xs = {4}
    item >
    < img
    width = {48}
    height = {48}
    alt = "logo-app"
    src = "./images/logo.png" / >
        < /Grid>
        < Grid
    className = {classes.nameAppContainer}
    xs = {8}
    item >
    < div > < Typography
    variant = {"caption"} > Excops < /Typography></
    div >
    < div > < Typography
    variant = {"caption"} > Exchange
    Center < /Typography></
    div >
    < /Grid>
    < /Grid>
    < Grid
    xs = {2}
    item / >
    < /Grid>
    < Grid
    xs = {1}
    sm = {3}
    md = {4}
    item / >
    < Grid
    container
    xs = {12}
    item >
    < Grid
    xs = {1}
    sm = {3}
    md = {4}
    item / >
    < Grid
    xs = {10}
    sm = {6}
    md = {4}
    item >
    < Grid
    className = {classes.cardHeader}
    xs = {12}
    item >
    < Typography
    variant = {"body2"} >
        < span > Not
    a
    member ?
<
    /span>
    < span > Sign
    up
    now
    ! < /span>
    < /Typography>
    < /Grid>
    < Card
    square
    className = {classes.card} >
        < Grid
    xs = {12}
    item >
    < Typography
    className = {classes.h2}
    variant = {"h2"} > Sign in < /Typography>
        < Typography
    className = {classes.h3}
    variant = {"h3"} > to
    access
    your
    account < /Typography>
    < /Grid>
    < Grid
    xs = {12}
    item >
    < TextField
    color = {"primary"}
    label = {"PhoneNumber"}
    value = {""}
    fullWidth
    required = {true}
    onChange = {undefined}
    margin = "normal"
        / >
        < /Grid>
        < Grid
    xs = {12}
    item >
    < TextField
    label = {"Password"}
    required = {true}
    value = {""}
    fullWidth
    onChange = {undefined}
    margin = "normal"
        / >
        < /Grid>
        < Grid
    xs = {12}
    item >
    < Button
    className = {classes.btnSubmit}
    fullWidth
    variant = {"contained"}
    color = {"primary"} > SignIn < /Button>
        < /Grid>
        < /Card>
        < /Grid>
        < Grid
    xs = {1}
    sm = {3}
    md = {4}
    item / >
    < /Grid>
    < Grid
    xs = {12}
    item >
    < Typography
    className = {classes.h3}
    variant = {"h3"} > Contact
    Us
    At
    Support
@Exchange
    If
    You
    Have
    Problems < /Typography>
    < /Grid>

    < /Grid>
)
    ;
}

export default Login;