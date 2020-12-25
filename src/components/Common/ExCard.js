import React from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';
import Divider from "@material-ui/core/Divider";

ExCard.propTypes = {
    Icon: PropTypes.any,
    title: PropTypes.string,
};
const styles = makeStyles((theme) => {
    return ({
        cardHeaderIcon: {
            fontSize: 24,
            color: theme.palette.text.secondary,
            marginRight: 6
        },
        cardHeaderTitle: {
            display: "flex",
            alignItems: "center",
            color: theme.palette.color["text1"][theme.palette.type],
            fontSize: 16,
            fontWeight: "bold"
            // padding: "12px 8px",
        },
    })
});

function ExCard(props) {
    const {title, Icon, children} = props;
    const classes = styles();
    return (
        <Card>
            <CardHeader
                title={<div className={classes.cardHeaderTitle}><Icon className={classes.cardHeaderIcon}/> {title}
                </div>}/>
            <Divider variant={"middle"}/>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

export default ExCard;