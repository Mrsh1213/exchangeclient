import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import {FaCheck, FaEdit} from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import {useTheme} from '@material-ui/core/styles';


ToggleTextField.propTypes = {};
const styles = makeStyles((theme) => {
    return ({
        value: {
            color: theme.palette.color["text1"][theme.palette.type],
            fontSize: 14
        },
        label: {
            fontSize: 12,
            fontWeight: 500,
            color: theme.palette.color[3][theme.palette.type],
        },
        icon: {
            width: 12,
            height: 12,
            marginLeft: 5
        }
    })
});

function ToggleTextField(props) {
    const {name, value, label, handleEditValue} = props;
    const [editMode, setEditMode] = useState(false);
    const [valueText, setValueText] = useState(value);
    const theme = useTheme();
    const classes = styles({editMode: editMode});

    useEffect(() => {
        setValueText(value);
    }, [value])
    const handleEditMode = () => {
        setEditMode(prevState => !prevState)
    };
    const handleBlurValue = (e) => {
        setValueText(e.target.innerText)
    };
    const handleEditValueInternal = useCallback(() => {
        handleEditValue(valueText, name);
        setEditMode(false);
    }, [handleEditValue, valueText, name]);
    return (
        <div>
            <Typography className={classes.label}>{label}</Typography>
            <div style={{display: "flex", alignItems: "center"}}>
                <Typography onBlur={handleBlurValue} style={editMode ? {
                    border: "solid 1px",
                    padding: 2,
                    borderColor: theme.palette.color["text1"][theme.palette.type],
                } : undefined} contentEditable={editMode} className={classes.value}>{valueText}</Typography>
                {editMode ? <IconButton onClick={handleEditValueInternal} size={"small"}>
                        <FaCheck className={classes.icon}/>
                    </IconButton> :
                    <IconButton onClick={handleEditMode} size={"small"}>
                        <FaEdit className={classes.icon}/>
                    </IconButton>
                }
            </div>
        </div>
    );
}

export default ToggleTextField;