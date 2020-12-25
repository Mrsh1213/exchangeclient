import React, {useCallback, useState} from 'react';
import {Card, Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';
import Button from "@material-ui/core/Button";
import {Link, useHistory} from "react-router-dom";
import {baseUrl} from "../consts/constans";
import axios from "axios";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {useSnackbar} from "notistack";

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
            textTransform: "none",
            marginTop: 48,
            fontWeight: "bold"
        },
        link: {
            color: "#fff",
            fontWeight: "bold"
        }
    })
});

function Login(props) {
    const classes = styles();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    const handlePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [setPassword]);

    const handleClickShowPassword = useCallback((e) => {
        setShowPassword(prevState => !prevState)
    }, [setShowPassword]);

    const handlePhoneNumber = useCallback((e) => {
        setPhoneNumber(e.target.value)
    }, [setPhoneNumber]);

    const handleSubmit = useCallback(() => {
        if (phoneNumber && password) {
            axios({
                method: "Post",
                url: `${baseUrl}/auth/login/`,
                data: {
                    "phone_number": phoneNumber,
                    "password": password
                },

            }).then(res => {
                if (res.status === 200) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    localStorage.setItem("token", res.data.token);
                    history.push("/dashboard")
                }
            }).catch(err => {
                enqueueSnackbar(err.response.data.non_field_errors[0], {
                    variant: "error", anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    }
                });
            })
        } else {
            enqueueSnackbar("Please enter fields", {
                variant: "warning", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        }
    }, [phoneNumber, password]);

    return (
        <Grid container className={classes.container} justify={"center"}>
            <Grid xs={1} sm={3} md={4} item/>
            <Grid justify={"center"} xs={10} sm={6} md={4} container item>
                <Grid xs={2} item/>
                <Grid spacing={2} xs={8} alignItems={"center"} container item>
                    <Grid className={classes.logo} xs={4} item>
                        <img width={48} height={48} alt="logo-app" src="/images/logo.png"/>
                    </Grid>
                    <Grid className={classes.nameAppContainer} xs={8} item>
                        <div><Typography color={"textSecondary"}
                                         variant={"caption"}>Excops</Typography></div>
                        <div><Typography color={"textPrimary"} variant={"caption"}>Exchange
                            Center</Typography></div>
                    </Grid>
                </Grid>
                <Grid xs={2} item/>
            </Grid>
            <Grid xs={1} sm={3} md={4} item/>
            <Grid container xs={12} item>
                <Grid xs={1} sm={3} md={4} item/>
                <Grid xs={10} sm={6} md={4} item>
                    <Grid className={classes.cardHeader} xs={12} item>
                        <Typography variant={"body2"}>
                            <span>Not a member? </span>
                            <Link className={classes.link} to={"/register"}>Sign up now!</Link>
                        </Typography>
                    </Grid>
                    <Card square className={classes.card}>
                        <Grid xs={12} item>
                            <Typography color={"textPrimary"} className={classes.h2} variant={"h2"}>Sign in</Typography>
                            <Typography className={classes.h3} variant={"h3"}>to access your account</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                color={"primary"}
                                label={"PhoneNumber"}
                                value={phoneNumber}
                                fullWidth
                                required={true}
                                onChange={handlePhoneNumber}
                                margin="normal"
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                label={"Password"}
                                required={true}
                                value={password}
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    classes: {input: classes.inputBaseFullWidth},
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            size={"small"}
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {!showPassword ? <Visibility fontSize={"small"}/> :
                                                <VisibilityOff fontSize={"small"}/>}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                                onChange={handlePassword}
                                margin="normal"
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <Button onClick={handleSubmit} className={classes.btnSubmit} fullWidth variant={"contained"}
                                    color={"secondary"}>SignIn</Button>
                        </Grid>
                    </Card>
                </Grid>
                <Grid xs={1} sm={3} md={4} item/>
            </Grid>
            <Grid xs={12} item>
                <Typography className={classes.h3} variant={"h3"}>Contact Us At Support@Exchange If You Have
                    Problems</Typography>
            </Grid>

        </Grid>
    );
}

export default Login;