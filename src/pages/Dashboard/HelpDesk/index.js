import React, {useCallback, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import ListItemTicket from "./ListItemTicket";
import API from "../../../consts/API";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemMessage from "./ListItemMessage";
import Button from "@material-ui/core/Button";
import ExTextField from "../../../components/Common/ExTextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {MdAttachFile,MdArrowBack} from "react-icons/md";
import {Hidden} from "@material-ui/core";
import HiddenCss from "@material-ui/core/Hidden/HiddenCss";

Index.propTypes = {};
const styles = makeStyles((theme) => {
    return ({
        container: {
            height: "calc(100% - 64px)",
        },
        containerTickets: {
            position: "relative",
            height: "101.2%",
            overflow: "auto",
            padding: 20,
            paddingBottom: 20,
            backgroundColor: theme.palette.color[0][theme.palette.type],
        },
        containerMessages: {
            position: "relative",
            height: "100%",
            overflow: "auto",
            padding: "20px 20px 50px 20px",
            backgroundColor: theme.palette.color[5][theme.palette.type],
        },
        itemTicket: {
            height: "max-content"
        },
        addTicket: {
            left: "auto",
            // width: "25%",
            bottom: 8,
            position: "fixed",
        },
        addReply: {

            width: "100%",
            right: 0,
            bottom: 0,
            position: "absolute",
        },
        btnAdd: {
            marginRight: 10
        }
    })
});

const typeReq = [{label: "Technical issue", value: "Technical issue"}, {
    label: "How to",
    value: "How to"
}, {label: "Sales question", value: "Sales question"}]

function Index(props) {
    const [tickets, setTickets] = useState([]);
    const [messages, setMessages] = useState([]);
    const [typeRequest, setTypeRequest] = useState("Technical issue");
    const [subject, setSubject] = useState("");
    const [describe, setDescribe] = useState("");
    const [textReply, setTextReply] = useState("");
    const [checkedClosedTicket, setCheckedClosedTicket] = useState(true);
    const [showFormAdd, setShowFormAdd] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState({id: ""});
    const [selectedMessage, setSelectedMessage] = useState({id: ""});
    const classes = styles();


    const getTickets = useCallback((checkedClosedTicket) => {
        API({method: "GET", url: `/api/tickets/${!checkedClosedTicket ? "?complete=false" : ""}`}).then(res => {
            setTickets(res.data);
        })
    }, []);

    const getMessages = useCallback((ticketId) => {
        if (ticketId !== "") {
            API({method: "GET", url: `/api/messages/?ticket=${ticketId}`}).then(res => {
                setMessages(res.data);
            })
        }
    }, []);
    const handleSelectTicket = useCallback((ticket) => {
        setSelectedMessage({id: ""})
        setSelectedTicket(ticket);
    }, []);
    const handleSelectedMessage = useCallback((message) => {
        setSelectedMessage(message);
    }, []);

    const handleChangeClosedTicket = (event) => {
        setCheckedClosedTicket(event.target.checked);
    };
    const handleAddFormAddTicket = useCallback(() => {
        if (showFormAdd) {
            API({
                method: "POST", data: {
                    describe: describe,
                    ticket_type: typeRequest,
                    subject: subject
                }, url: `/api/tickets/`
            }).then(res => {
                if (res.status === 201) {
                    handleCloseFormAddTicket();
                    getTickets(checkedClosedTicket);
                }
            })
        } else {
            setShowFormAdd(true);
        }
    }, [checkedClosedTicket, describe, typeRequest, subject]);

    useEffect(() => {
        getTickets(checkedClosedTicket);
    }, [getTickets, checkedClosedTicket]);

    useEffect(() => {
        getMessages(selectedTicket.id);
    }, [getMessages, selectedTicket]);

    function handleCloseFormAddTicket() {
        setShowFormAdd(false);
        setDescribe("");
        setSubject("");
        setTypeRequest("Technical issue");
    }

    function handleTypeRequest(e) {
        setTypeRequest(e.target.value);
    }

    function handleSubject(e) {
        setSubject(e.target.value);
    }

    function handleDescribe(e) {
        setDescribe(e.target.value);
    }

    function handleTextReply(e) {
        setTextReply(e.target.value);
    }

    function handleAttachFile(e) {
        console.log(e.target.value);
    }

    function handleAttachSendMessage(e) {
        console.log(e.target.value);
    }

    const handleSendMessage = useCallback(() => {
        if (selectedTicket.id !== "" && textReply)
            API({
                method: "POST", data: {
                    text: textReply,
                    ticket: selectedTicket.id
                }, url: `/api/messages/`
            }).then(res => {
                if (res.status === 201) {
                    setTextReply("");
                    getMessages(selectedTicket.id);
                }
            })
    }, [selectedTicket, textReply, getMessages]);

    return (
        <Grid className={classes.container} container>
            <Hidden implementation={"js"} only={["sm","md","lg","xl"]}> {selectedTicket.id?<Grid xs={12} item><IconButton onClick={()=>{setSelectedTicket({id: ""})}}><MdArrowBack/></IconButton></Grid>:null}
            {!(selectedTicket.id)?<Grid container alignContent={"flex-start"} className={classes.containerTickets} sm={12} xs={12} md={5}
                  lg={4} item>
                {showFormAdd ?
                    <Grid spacing={2} container alignContent={"flex-start"} xs={12} item>
                        <Grid xs={12} item>
                            <ExTextField fullWidth label={"Type of request"} items={typeReq}
                                         onChange={handleTypeRequest}
                                         value={typeRequest} select/>
                        </Grid>
                        <Grid xs={12} item>
                            <ExTextField variant={"standard"} fullWidth label={"Subject"} onChange={handleSubject}
                                         value={subject}/>
                        </Grid>
                        <Grid xs={12} item>
                            <ExTextField multiline rows={6} variant={"standard"} fullWidth
                                         label={"Describe your issue / question"} onChange={handleDescribe}
                                         value={describe}/>
                        </Grid>
                        <Grid xs={12} item>
                            <Button onClick={handleAttachFile} variant={"outlined"}
                                    color={"secondary"}>Attache File</Button>
                        </Grid>
                    </Grid>
                    : <>    <Grid id={"checkClosedTicket"} xs={12} item>

                        <FormControlLabel
                            control={<Checkbox size={"small"} checked={checkedClosedTicket}
                                               onChange={handleChangeClosedTicket}/>}
                            label={<Typography color={"secondary"} align={"center"} variant={"subtitle1"}>Show closed
                                ticket?</Typography>}
                        />
                    </Grid>
                        {tickets.length > 0 ? (tickets.map(ticket => {
                                return (
                                    <Grid key={ticket.id} className={classes.itemTicket} xs={12} item>
                                        <ListItemTicket selected={selectedTicket.id === ticket.id}
                                                        handleSelectTicket={handleSelectTicket} ticket={ticket}/>
                                    </Grid>
                                );
                            })) :
                            <Grid className={classes.itemTicket} xs={12} item>
                                <Typography color={"secondary"} align={"center"} variant={"subtitle1"}>
                                    No tickets available
                                </Typography>
                            </Grid>
                        }
                    </>}
                <Grid className={classes.addTicket} xs={12} item>
                    <Button onClick={handleAddFormAddTicket} className={classes.btnAdd} variant={"contained"}
                            color={"secondary"}>{showFormAdd ? "Add ticket" : "Create ticket"}</Button>
                    {showFormAdd &&
                    <Button onClick={handleCloseFormAddTicket} variant={"outlined"} color={"secondary"}>cancel</Button>}
                </Grid>
            </Grid>:
                <Grid className={classes.containerMessages} sm={12} xs={12} md={7} lg={8} item>
                    {messages.length > 0 ? (messages.map(message => {
                            return (
                                <Grid key={message.id} className={classes.itemTicket} xs={12} item>
                                    <ListItemMessage selected={selectedMessage.id === message.id}
                                                     handleSelectMessage={handleSelectedMessage} message={message}/>
                                </Grid>
                            );
                        })) :
                        <Grid className={classes.itemTicket} xs={12} item>
                            <Typography color={"secondary"} align={"center"} variant={"subtitle1"}>
                                {selectedTicket.id === "" ? "Please select a ticket" : "No Message available"}
                            </Typography>
                        </Grid>
                    }
                    {selectedTicket.id ? <Grid className={classes.addReply} xs={12} item>
                        <ExTextField variant={"filled"} fullWidth label={"Your reply"} onChange={handleTextReply}
                                     value={textReply} InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    variant={"text"}
                                    size={"small"}
                                    color={"secondary"}
                                    aria-label="attach file message"
                                    onClick={handleAttachSendMessage}
                                    edge="end"
                                >
                                    <MdAttachFile/>
                                </IconButton>
                                <div></div>
                                <Button
                                    variant={"outlined"}
                                    disabled={!(textReply.length > 0)}
                                    color={textReply.length > 0 ? "secondary" : "primary"}
                                    aria-label="send message"
                                    onClick={handleSendMessage}
                                    edge="end"
                                >
                                    Send
                                </Button>
                            </InputAdornment>
                        }}/>
                    </Grid> : ""}
                </Grid>
            }
            </Hidden>
            <Hidden implementation={"js"} only={["xs"]}>
                <Grid container alignContent={"flex-start"} className={classes.containerTickets} sm={12} xs={12} md={5}
                      lg={4} item>
                    {showFormAdd ?
                        <Grid spacing={2} container alignContent={"flex-start"} xs={12} item>
                            <Grid xs={12} item>
                                <ExTextField fullWidth label={"Type of request"} items={typeReq}
                                             onChange={handleTypeRequest}
                                             value={typeRequest} select/>
                            </Grid>
                            <Grid xs={12} item>
                                <ExTextField variant={"standard"} fullWidth label={"Subject"} onChange={handleSubject}
                                             value={subject}/>
                            </Grid>
                            <Grid xs={12} item>
                                <ExTextField multiline rows={6} variant={"standard"} fullWidth
                                             label={"Describe your issue / question"} onChange={handleDescribe}
                                             value={describe}/>
                            </Grid>
                            <Grid xs={12} item>
                                <Button onClick={handleAttachFile} variant={"outlined"}
                                        color={"secondary"}>Attache File</Button>
                            </Grid>
                        </Grid>
                        : <>    <Grid id={"checkClosedTicket"} xs={12} item>

                            <FormControlLabel
                                control={<Checkbox size={"small"} checked={checkedClosedTicket}
                                                   onChange={handleChangeClosedTicket}/>}
                                label={<Typography color={"secondary"} align={"center"} variant={"subtitle1"}>Show closed
                                    ticket?</Typography>}
                            />
                        </Grid>
                            {tickets.length > 0 ? (tickets.map(ticket => {
                                    return (
                                        <Grid key={ticket.id} className={classes.itemTicket} xs={12} item>
                                            <ListItemTicket selected={selectedTicket.id === ticket.id}
                                                            handleSelectTicket={handleSelectTicket} ticket={ticket}/>
                                        </Grid>
                                    );
                                })) :
                                <Grid className={classes.itemTicket} xs={12} item>
                                    <Typography color={"secondary"} align={"center"} variant={"subtitle1"}>
                                        No tickets available
                                    </Typography>
                                </Grid>
                            }
                        </>}
                    <Grid className={classes.addTicket} xs={12} item>
                        <Button onClick={handleAddFormAddTicket} className={classes.btnAdd} variant={"contained"}
                                color={"secondary"}>{showFormAdd ? "Add ticket" : "Create ticket"}</Button>
                        {showFormAdd &&
                        <Button onClick={handleCloseFormAddTicket} variant={"outlined"} color={"secondary"}>cancel</Button>}
                    </Grid>
                </Grid>
                <Grid className={classes.containerMessages} sm={12} xs={12} md={7} lg={8} item>
                    <Grid container xs={12} item>
                    {messages.length > 0 ? (messages.map(message => {
                            return (
                                <Grid key={message.id} className={classes.itemTicket} xs={12} item>
                                    <ListItemMessage selected={selectedMessage.id === message.id}
                                                     handleSelectMessage={handleSelectedMessage} message={message}/>
                                </Grid>
                            );
                        })) :
                        <Grid className={classes.itemTicket} xs={12} item>
                            <Typography color={"secondary"} align={"center"} variant={"subtitle1"}>
                                {selectedTicket.id === "" ? "Please select a ticket" : "No Message available"}
                            </Typography>
                        </Grid>
                    }
                    </Grid>

                    {selectedTicket.id ? <Grid className={classes.addReply} xs={12} item>
                        <ExTextField variant={"filled"} fullWidth label={"Your reply"} onChange={handleTextReply}
                                     value={textReply} InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    variant={"text"}
                                    size={"small"}
                                    color={"secondary"}
                                    aria-label="attach file message"
                                    onClick={handleAttachSendMessage}
                                    edge="end"
                                >
                                    <MdAttachFile/>
                                </IconButton>
                                <div></div>
                                <Button
                                    variant={"outlined"}
                                    disabled={!(textReply.length > 0)}
                                    color={textReply.length > 0 ? "secondary" : "primary"}
                                    aria-label="send message"
                                    onClick={handleSendMessage}
                                    edge="end"
                                >
                                    Send
                                </Button>
                            </InputAdornment>
                        }}/>
                    </Grid> : ""}
                </Grid>
            </Hidden>
        </Grid>
    );
}

export default Index;