import React, {useCallback, useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import ExCard from "../../../components/Common/ExCard";
import {MdPerson} from "react-icons/md";
import {IoDocumentText} from "react-icons/io5";
import ToggleTextField from "./common/ToggleTextField";
import API from "../../../consts/API";
import DocumentCard from "./common/DocumentCard";

Setting.propTypes = {};

function Setting(props) {

    const [documents, setDocuments] = useState([]);
    const [personInfo, setPersonInfo] = useState({
        id: 0,
        phone_number: "",
        email: "",
        date_joined: "",
        communication_lang: "",
        first_name: "",
        last_name: ""
    })
    const handleGetPersonInfo = useCallback(() => {
        API({method: "GET", url: "/api/user/"}).then(res => {
            setPersonInfo(res.data);
        })
    }, []);
    const handleGetDocuments = useCallback(() => {
        API({method: "GET", url: "/api/user/documents/"}).then(res => {
            setDocuments(res.data);
        })
    }, []);

    useEffect(() => {
        handleGetPersonInfo();
        handleGetDocuments();
    }, [handleGetPersonInfo]);

    const handleEditValue = useCallback((value, name) => {
        API({
            method: "PATCH",
            data: {phone_number: personInfo.phone_number, [name]: value},
            url: "/api/user/"
        }).then(res => {
            setPersonInfo(res.data);
        }).catch(err => {
            console.log(err.response.data);
        })
    }, [personInfo]);

    return (
        <Grid spacing={2} container>
            <Grid xs={12} item>
                <ExCard Icon={MdPerson} title={"Personal Info"}>
                    <Grid spacing={1} container>
                        <Grid xs={6} sm={3} item>
                            <ToggleTextField handleEditValue={handleEditValue} name="first_name" label={"First Name"}
                                             value={personInfo.first_name}/>
                        </Grid>
                        <Grid xs={6} sm={3} item>
                            <ToggleTextField handleEditValue={handleEditValue} name="last_name" label={"Last Name"}
                                             value={personInfo.last_name}/>
                        </Grid>
                        <Grid xs={6} sm={3} item>
                            <ToggleTextField handleEditValue={handleEditValue} name="country" label={"Country"}
                                             value={personInfo.country}/>
                        </Grid>
                        <Grid xs={6} sm={3} item>
                            <ToggleTextField handleEditValue={handleEditValue} name="password" label={"Password"}
                                             value={"••••••••"}/>
                        </Grid>
                        <Grid xs={6} sm={3} item>
                            <ToggleTextField handleEditValue={handleEditValue} name="phone_number" label={"PhoneNumber"}
                                             value={personInfo.phone_number}/>
                        </Grid>
                        <Grid xs={12} sm={9} item>
                            <ToggleTextField handleEditValue={handleEditValue} name="email" label={"Email"}
                                             value={personInfo.email}/>
                        </Grid>
                    </Grid>
                </ExCard>
            </Grid>
            <Grid xs={12} item>
                <ExCard Icon={IoDocumentText} title={"Verified Documents"}>
                    <Grid spacing={1} container>
                        {documents.map((doc) => (
                                <Grid key={doc.id} xs={12} item>
                                    <DocumentCard doc={doc}/>
                                </Grid>
                            )
                        )}

                    </Grid>
                </ExCard>
            </Grid>
        </Grid>
    );
}

export default Setting;