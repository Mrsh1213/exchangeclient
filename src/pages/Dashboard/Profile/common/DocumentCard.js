import React, {useCallback, useState} from 'react';
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import moment from "moment";
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {FaClock, FaCloudUploadAlt, FaEye} from "react-icons/fa";
import {MdCancel} from "react-icons/md";
import {GoVerified} from "react-icons/go";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import {urlServer} from "../../../../consts/constans";
import Dialog from "@material-ui/core/Dialog";
import API from "../../../../consts/API";
import {useSnackbar} from "notistack";

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

function DocumentCard(props) {
    const [dialogShowDocument, setDialogShowDocument] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const classes = styles();
    const {reloadData, doc} = props;
    const {id, status, title, created_at, document, reason} = doc;
    const file = document ? document.split("/") : null;

    function Status({status, reason}) {
        switch (status) {
            case "ACCEPT":
                return (<GoVerified style={{color: "green", fontSize: 16}}/>);
            case "PENDING":
                return (<FaClock style={{color: "blue", fontSize: 16}}/>);
            case "DECLINE":
                return (
                    <span>
                        <Tooltip placement={"top"} title={reason} aria-label="reason"><IconButton
                            size={"small"}><MdCancel
                            style={{color: "red"}}/></IconButton></Tooltip>
                           <input
                               onChange={handleReUpload}
                               accept="*/*"
                               style={{display: 'none'}}
                               id={title}
                               name={title}
                               multiple
                               type="file"
                           />
                           <label htmlFor={title}>
                               <IconButton component={"span"} size="small">
                                   <FaCloudUploadAlt className={classes.icon}/>
                               </IconButton>
                           </label>
                    </span>

                );
            default:
                return ("Not Support")
        }
    }

    const showDocument = useCallback(() => {
        setDialogShowDocument(prevState => !prevState)
    }, []);

    const handleUpload = useCallback((e) => {
        let form_data = new FormData();
        form_data.append('title', title);
        form_data.append('document', e.target.files[0]);

        API({method: "POST", data: form_data, url: "/api/user/documents/"}).then(res => {
            if (res.status === 201) {
                reloadData();
                enqueueSnackbar("Your doc was successfully send", {
                    variant: "success", anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    }
                });
            }
        });
    }, [title, reloadData]);

    const handleReUpload = useCallback((e) => {
        let form_data = new FormData();
        form_data.append('title', title);
        form_data.append('document', e.target.files[0]);
        API({method: "PUT", data: form_data, url: `/api/user/documents/${id}/`}).then(res => {
            if (res.status === 200) {
                reloadData();
                enqueueSnackbar("Your doc was successfully Resend", {
                    variant: "success", anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    }
                });
            }
        });
    }, [title, reloadData, id]);

    return (
        <>
            {file && <Dialog maxWidth={"sm"} onClose={showDocument} open={dialogShowDocument}>
                <img width={"300x"} height={"300px"} alt={"doc"}
                     src={urlServer + `/media/protected/documents/${file[file.length - 1]}/?token=${localStorage.getItem("token")}`}/>
            </Dialog>}
            <Card className={classes.card}>
                <Grid container>
                    <Grid justify={"center"} alignItems={"center"} container xs={12} item>
                        <Grid xs={4} item><Typography className={classes.valueField}>{title}</Typography></Grid>
                        {created_at && <Grid xs={3} item><Typography
                            className={classes.valueField}>{moment(new Date(created_at)).format("YYYY/MM/DD HH:mm")}</Typography>
                        </Grid>}
                        <Grid xs={3} style={{textAlign: "center"}} item><Typography
                            className={classes.valueField}>
                            {status ? <Status reason={reason}
                                              status={status}/> :
                                <>
                                    <input
                                        onChange={handleUpload}
                                        accept="*/*"
                                        style={{display: 'none'}}
                                        id={title}
                                        name={title}
                                        multiple
                                        type="file"
                                    />
                                    <label htmlFor={title}>
                                        <IconButton component={"span"} size="small">
                                            <FaCloudUploadAlt className={classes.icon}/>
                                        </IconButton>
                                    </label>
                                </>
                            }
                        </Typography></Grid>

                        {file && <Grid xs={2} style={{textAlign: "center"}} item><IconButton onClick={showDocument}
                                                                                             size="small"><FaEye
                            className={classes.icon}/></IconButton></Grid>}
                    </Grid>
                    <Grid justify={"center"} container xs={12} item>
                        <Grid xs={4} item><Typography className={classes.titleField}>Document Type</Typography></Grid>
                        {created_at &&
                        <Grid xs={3} item><Typography className={classes.titleField}>Date of create</Typography></Grid>}
                        <Grid xs={3} style={{textAlign: "center"}} item>
                            <Typography
                                className={classes.titleField}>
                                {status ? status : "Upload"}
                            </Typography>
                        </Grid>
                        {file && <Grid xs={2} item/>}
                    </Grid>

                </Grid>
            </Card>
        </>
    );
}

export default DocumentCard;