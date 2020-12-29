import React, {useCallback, useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import ExCard from "../../../components/Common/ExCard";
import DocumentCard from "./common/DocumentCard";
import {GoVerified} from "react-icons/go";
import API from "../../../consts/API";

function Verification(props) {
    const [documents, setDocuments] = useState([]);

    const handleGetDocuments = useCallback(() => {
        API({method: "GET", url: "/api/user/documents/"}).then(res => {
            if (res.data && res.data.length >= 2) {
                // setDocuments(res.data.splice(res.data.length-2,res.data.length));
                setDocuments(res.data);
            } else if (res.data.length < 2) {
                if (res.data[0].title === "IdentityCard") {
                    setDocuments([res.data[0], {title: "AcceptTerms"}])
                } else if (res.data[0].title === "AcceptTerms") {
                    setDocuments([{title: "IdentityCard"}, res.data[0]])
                } else {
                    //default
                    setDocuments([{title: "IdentityCard"}, {title: "AcceptTerms"}])
                }
            }
        })
    }, []);

    useEffect(() => {
        handleGetDocuments();
    }, [handleGetDocuments]);
    return (
        <Grid spacing={2} container>
            <Grid xs={12} item>
                <ExCard Icon={GoVerified} title={"Verification"}>
                    <Grid spacing={1} container>
                        {documents.map((doc) => (
                                <Grid key={doc.id} xs={12} item>
                                    <DocumentCard reloadData={handleGetDocuments} doc={doc}/>
                                </Grid>
                            )
                        )}

                    </Grid>
                </ExCard>
            </Grid>
        </Grid>
    );
}

export default Verification;