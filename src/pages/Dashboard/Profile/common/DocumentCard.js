import React, {useCallback} from 'react';
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import moment from "moment";
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {FaEye, FaClock} from "react-icons/fa";
import {MdVerifiedUser, MdCancel} from "react-icons/md";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import {baseUrl, urlServer} from "../../../../consts/constans";
import API from "../../../../consts/API";
import {arrayBufferToBase64, base64Encode} from "../../../../consts/Helper";

DocumentCard.propTypes = {
    doc: PropTypes.object
};
const styles = makeStyles((theme) => {
    return ({
        card: {
            padding: "12px 8px",
            backgroundColor: theme.palette.color[0][theme.palette.type],
            fontSize: 12
        },
        valueField: {
            color: theme.palette.color["text1"][theme.palette.type],
            fontSize: 14,
        },
        titleField: {
            fontSize: 12,
            fontWeight: 500,
            color: theme.palette.color[3][theme.palette.type],
        },
        icon: {
            color: theme.palette.text.secondary,
            width: 20,
            height: 20,
        }
    })
});

/*
id
title
document
status [ ACCEPT, DECLINE, PENDING ]
reason
created_at
user
*/

function DocumentCard(props) {
    const classes = styles();
    const {status, title, created_at, document, reason} = props.doc;

    function Status({status, reason}) {
        switch (status) {
            case "ACCEPT":
                return (<MdVerifiedUser style={{color: "green"}}/>);
            case "PENDING":
                return (<FaClock style={{color: "blue"}}/>);
            case "DECLINE":
                return (
                    <Tooltip placement={"top"} title={reason} aria-label="reason"><IconButton size={"small"}><MdCancel
                        style={{color: "red"}}/></IconButton></Tooltip>);
            default:
                return ("Not Support")
        }
    }

    const showDocument = useCallback(() => {
        //
        let doc = document.split("/");
        console.log(doc);
        API({url: `/media/protected/documents/${doc[doc.length - 1]}`, method: "GET"}).then(res => {
            let reader = new FileReader();
            reader.onload = function (event) {
                let data = event.target.result;
                console.log(arrayBufferToBase64(data));
            };
            console.log(base64Encode(res.data));
            reader.readAsArrayBuffer(new Blob(res.data));
        })
    }, [document]);

    return (
        <Card className={classes.card}>
            <Grid container>
                <Grid justify={"center"} alignItems={"center"} container xs={12} item>
                    <Grid xs={4} item><Typography className={classes.valueField}>{title}</Typography></Grid>
                    <Grid xs={3} item><Typography
                        className={classes.valueField}>{moment(new Date(created_at)).format("YYYY/MM/DD HH:mm")}</Typography></Grid>
                    <Grid xs={3} style={{textAlign: "center"}} item><Typography
                        className={classes.valueFieldvalueField}><Status reason={reason} status={status}/></Typography></Grid>
                    <Grid xs={2} style={{textAlign: "center"}} item><IconButton onClick={showDocument}
                                                                                size="small"><FaEye
                        className={classes.icon}/></IconButton></Grid>
                </Grid>
                <Grid justify={"center"} container xs={12} item>
                    <Grid xs={4} item><Typography className={classes.titleField}>Document Type</Typography></Grid>
                    <Grid xs={3} item><Typography className={classes.titleField}>Date of create</Typography></Grid>
                    <Grid xs={3} style={{textAlign: "center"}} item><Typography
                        className={classes.titleField}>{status}</Typography></Grid>
                    <Grid xs={2} item/>
                </Grid>

            </Grid>
        </Card>
    );
}

export default DocumentCard;