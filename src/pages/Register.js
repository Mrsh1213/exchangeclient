import React, {useCallback, useState} from 'react';
import {Card, Grid, TextField, Typography} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {baseUrl} from "../consts/constans";
import {makeStyles} from "@material-ui/styles";
import {Link, useHistory} from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {useSnackbar} from "notistack";

Register.propTypes = {};

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
        h4: {
            fontSize: 10,
            color: theme.palette.color[3][theme.palette.type],
            textAlign: "left"
        },
        logo: {
            textAlign: "right"
        },
        nameAppContainer: {
            textAlign: "left"
        },
        btnSubmit: {
            textTransform: "none",
            marginTop: 24,
            fontWeight: "bold"
        },
        link: {
            color: theme.palette.color.text1[theme.palette.type],
            fontWeight: "bold"
        },
        linkTerms: {
            color: theme.palette.text.secondary,
            fontWeight: "bold"
        },
        containerTerms: {
            textAlign: "left"
        }
    })
});

function Register(props) {
    const classes = styles();
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [checkedTerms, setCheckedTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const {enqueueSnackbar} = useSnackbar();
    const history = useHistory();

    const handleEmail = useCallback((e) => {
        setEmail(e.target.value)
    }, [setEmail]);

    const handlePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [setPassword]);

    const handleChangeTerms = (event) => {
        setCheckedTerms(event.target.checked);
    };
    const handleClickShowPassword = useCallback((e) => {
        setShowPassword(prevState => !prevState)
    }, [setShowPassword]);

    const handlePhoneNumber = useCallback((e) => {
        setPhoneNumber(e.target.value)
    }, [setPhoneNumber]);

    const handleSubmit = useCallback(() => {
        if (phoneNumber && password && email && checkedTerms) {
            axios({
                method: "Post",
                url: `${baseUrl}/auth/register/`,
                data: {
                    "phone_number": phoneNumber,
                    "email": email,
                    "password": password
                }
            }).then(res => {
                if (res.status === 201) {
                    setErrors({});
                    /*
                    * communication_lang: "EN"
country: null
date_joined: "2020-12-25T13:35:28.769372Z"
email: "mrsh1213@gmail.com"
first_name: null
id: 6
last_name: null
phone_number: "09132038694"
token: "231"
                    * */
                    localStorage.setItem("user", JSON.stringify(res.data));
                    localStorage.setItem("token", res.data.token);
                    history.push("/dashboard")
                }
            }).catch(err => {
                setErrors(err.response.data)
            })
        } else {
            enqueueSnackbar("Please enter fields", {
                variant: "warning", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        }
    }, [email, phoneNumber, password, checkedTerms]);
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
                        <Typography variant={"body1"}>
                            <span>Already a member? </span>
                            <Link className={classes.link} to={"/login"}>Sign in now!</Link>
                        </Typography>
                    </Grid>
                    <Card square className={classes.card}>
                        <Grid xs={12} item>
                            <Typography color={"textPrimary"} className={classes.h2} variant={"h2"}>Sign Up</Typography>
                            <Typography className={classes.h3} variant={"h3"}>to open your account</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                error={errors.email}
                                helperText={errors.email && errors.email.join(", ")}
                                color={"primary"}
                                label={"Email"}
                                value={email}
                                fullWidth
                                required={true}
                                onChange={handleEmail}
                                margin="normal"
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                error={errors.phone_number}
                                helperText={errors.phone_number && errors.phone_number.join(", ")}
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
                                error={errors.password}
                                helperText={errors.password && errors.password.join(", ")}
                                label={"Password"}
                                required={true}
                                value={password}
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                InputProps={{
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
                            <Typography className={classes.h4} variant={"h4"}>Password, Min 6 Symbols, At Least 1
                                Lowercase Letter,
                                At Least 1 Upper-Case, At Least 1 None-Leater</Typography>
                        </Grid>
                        <Grid className={classes.containerTerms} xs={12} item>
                            <FormControlLabel
                                control={<Checkbox size={"small"} checked={checkedTerms} onChange={handleChangeTerms}/>}
                                label={<span>I agree with <Link className={classes.linkTerms} to={"/terms"}>Terms</Link></span>}
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <Button onClick={handleSubmit} className={classes.btnSubmit} fullWidth variant={"contained"}
                                    color={"secondary"}>SignUp</Button>
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

export default Register;