import React, {useCallback} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import moment from "moment";
import ListItem from "@material-ui/core/ListItem";

ListItemTicket.propTypes = {};
const styles = makeStyles((theme) => {
    return ({
        container: {
            borderRadius: 10,
            padding: 6,
            backgroundColor: theme.palette.color[1][theme.palette.type],
            height: "100%",
            maxHeight: 145,
            marginTop: 12
        },
        containerSelected: {
            borderRadius: 10,
            padding: 6,
            backgroundColor: theme.palette.color["selected"][theme.palette.type],
            height: "100%",
            maxHeight: 145,
            marginTop: 12
        },
        coverContainer: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            width: "auto",
            marginBottom: 2
        },
        content: {
            color: theme.palette.color[3][theme.palette.type],
        },
        createDate: {
            color: theme.palette.color[3][theme.palette.type],
            textAlign: "right"
        },
        subject: {
            fontWeight: 500,
            lineHeight: 1.5,
            wordBreak: "break-word",
            textAlign: "left"
        }
    })
});

/*
id,
ticket_type*,
subject*,
complete,
created_at
* */
function ListItemTicket(props) {
    const {ticket, handleSelectTicket, selected} = props;
    const {
        id,
        ticket_type,
        subject,
        complete,
        created_at,
        describe
    } = ticket;
    const classes = styles();
    const handleClickTicket = useCallback(() => {
        handleSelectTicket(ticket);
    }, [ticket, handleSelectTicket]);
    return (
        <Grid alignItems={"center"} container className={selected ? classes.containerSelected : classes.container}>
            <Grid title={subject} component={ListItem} className={classes.coverContainer} button
                  onClick={handleClickTicket}
                  spacing={1} alignItems={"center"}
                  xs={12}
                  item
                  container>
                <Grid xs={2} item>
                    <Typography align={"center"} color={"textSecondary"} variant={"subtitle2"}>
                        ID: {id}
                    </Typography>
                </Grid>
                <Grid xs={1} item>
                    <Typography color={"textPrimary"} variant={"subtitle2"}>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                    </Typography>
                </Grid>
                <Grid xs={9} item>
                    <Typography className={classes.subject} color={"textPrimary"} variant={"subtitle2"}>
                        {subject.length > 25 ? subject.substr(subject, 25) + " ..." : subject}
                    </Typography>
                </Grid>
                <Grid xs={12} item>
                    <Typography className={classes.content} variant={"caption"}>
                        {describe.length > 50 ? describe.substr(describe, 50) + " ..." : describe}
                    </Typography>
                </Grid>
            </Grid>
            <Grid alignItems={"center"} container>
                <Grid xs={5} item>
                    <Button style={{textTransform: "none"}} size={"small"} color={complete ? "primary" : "secondary"}
                            variant={"outlined"}>{complete ? "Closed" : "Opened"}
                    </Button>
                </Grid>
                <Grid xs={2} item/>
                <Grid xs={5} className={classes.createDate} item>
                    <Typography align={"right"} variant={"caption"}>
                        {moment(new Date(created_at)).format("YYYY/MM/DD HH:mm")}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ListItemTicket;