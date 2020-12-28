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
import ExTimer from "../components/Common/ExTimer";

Restore.propTypes = {};

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

function Restore(props) {
    const classes = styles();
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [enterCode, setEnterCode] = useState(false);
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    const handleSecretCode = useCallback((e) => {
        setCode(e.target.value)
    }, [setCode]);

    const handleNewPassword = useCallback((e) => {
        setNewPassword(e.target.value)
    }, [setNewPassword]);

    const handleClickShowPassword = useCallback((e) => {
        setShowPassword(prevState => !prevState)
    }, [setShowPassword]);

    const handlePhoneNumber = useCallback((e) => {
        if (errors.phone_number) {
            setErrors({});
        }
        setPhoneNumber(e.target.value)
    }, [setPhoneNumber]);

    const handleSendNumberPhone = useCallback(() => {
        if (phoneNumber) {
            axios({
                method: "Post",
                url: `${baseUrl}/auth/request-reset-password/`,
                data: {
                    "phone_number": phoneNumber
                }
            }).then(res => {
                if (res.status === 201) {
                    setErrors({});
                    setEnterCode(true)
                }
            }).catch(err => {
                setErrors({phone_number: [err.response.data.data]})
            })
        } else {
            enqueueSnackbar("Please enter fields", {
                variant: "warning", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        }
    }, [phoneNumber]);
    const handleSendCodeAndNewPassword = useCallback(() => {
        if (code && newPassword) {
            axios({
                method: "Post",
                url: `${baseUrl}/auth/reset-password/`,
                data: {
                    "new_password": newPassword,
                    "code": code,
                }
            }).then(res => {
                if (res.status === 200) {
                    setErrors({});
                    history.push("/login")
                }
            }).catch(err => {
                setErrors({code: [err.response.data.data]})
            })
        } else {
            enqueueSnackbar("Please enter fields", {
                variant: "warning", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });
        }
    }, [newPassword, code]);


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
                            Forgot your password?
                        </Typography>
                    </Grid>
                    <Card square className={classes.card}>
                        <Grid xs={12} item>
                            <Typography color={"textPrimary"} className={classes.h2} variant={"h2"}>Password
                                Restore</Typography>
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

                        {enterCode && <>
                            <Grid xs={12} item>
                                <TextField
                                    error={errors.code}
                                    helperText={errors.code && errors.code.join(", ")}
                                    color={"primary"}
                                    label={"Code"}
                                    value={code}
                                    fullWidth
                                    required={true}
                                    onChange={handleSecretCode}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <ExTimer handleEndTime={() => {
                                    setEnterCode(false)
                                }} initSeconds={90}/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    error={errors.new_password}
                                    helperText={errors.new_password && errors.new_password.join(", ")}
                                    label={"New Password"}
                                    required={true}
                                    value={newPassword}
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
                                    onChange={handleNewPassword}
                                    margin="normal"
                                />
                            </Grid>
                        </>}
                        <Grid xs={12} item>
                            <Button onClick={enterCode ? handleSendCodeAndNewPassword : handleSendNumberPhone}
                                    className={classes.btnSubmit} fullWidth variant={"contained"}
                                    color={"secondary"}>Send</Button>
                        </Grid>
                        <Grid xs={12} item> </Grid>
                        <Grid xs={12} item> </Grid>
                        <Grid xs={12} item>
                            <Typography component={Link} to={"/login"} color={"textSecondary"} variant={"caption"}>Back
                                to login</Typography>
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

export default Restore;