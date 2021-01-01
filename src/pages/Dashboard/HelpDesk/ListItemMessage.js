import React, {useCallback} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import {MdAttachFile, MdReplay} from "react-icons/md";

ListItemMessage.propTypes = {};
const styles = makeStyles((theme) => {
    return ({
        container: {
            marginBottom: 2,
            borderRadius: 10,
            padding: 6,
            backgroundColor: theme.palette.color[1][theme.palette.type],
            height: "100%",
            maxHeight: 200,
            marginTop: 12
        },
        containerSelected: {
            marginBottom: 2,
            borderRadius: 10,
            padding: 6,
            backgroundColor: theme.palette.color["selected"][theme.palette.type],
            height: "100%",
            maxHeight: 200,
            marginTop: 12
        },
        coverContainer: {},
        text: {
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
{
  "id": 1,
  "text": "I lost my money with this bad app, please help me! And return my money",
  "attachment": null,
  "created_at": "2020-12-31T10:57:55.277621Z",
  "user": 4,
  "ticket": 1
}
* */
function ListItemMessage(props) {
    const {message, ticket, handleSelectMessage, selected} = props;
    const {
        id,
        text,
        attachment,
        created_at,
        user
    } = message;
    const classes = styles();
    const handleClickMessage = useCallback(() => {
        handleSelectMessage(message);
    }, [message, handleSelectMessage]);
    return (
        <Grid direction={JSON.parse(localStorage.getItem("user")).id !== user && "row-reverse"} alignItems={"center"}
              container>
            <Grid className={selected ? classes.containerSelected : classes.container}
                  spacing={1}
                  alignItems={"center"}
                  xs={6}
                  item
                  container>
                <Grid xs={12} item>
                    <Typography className={classes.text} variant={"caption"}>
                        {text}
                    </Typography>
                </Grid>
                <Grid xs={5} item>
                    {attachment ? <IconButton component={"a"} size={"small"} href={attachment}
                                              target="_blank"><MdAttachFile/></IconButton> : ""}
                    {/*<IconButton size={"small"} onClick={handleClickMessage}>
                        <MdReplay/>
                    </IconButton>*/}

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

export default ListItemMessage;