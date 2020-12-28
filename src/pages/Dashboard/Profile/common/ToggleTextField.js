import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import {FaCheck, FaEdit} from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import {useTheme} from '@material-ui/core/styles';
import {MdCancel} from "react-icons/md";
import clsx from "clsx";


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
        iconDone: {
            color: theme.palette.text.secondary,
            width: 12,
            height: 12
        },
        iconEdit: {
            width: 12,
            height: 12
        },
        iconCancel: {
            color: theme.palette.error[theme.palette.type],
            width: 12,
            height: 12
        },
        editModeStyle: {
            border: "solid 1px",
            minWidth: 100,
            padding: 2,
            borderColor: theme.palette.color["text1"][theme.palette.type],
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
        setEditMode(true)
    };
    const handleCancelEditMode = () => {
        setValueText(value)
        setEditMode(false);
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
                <Typography onBlur={handleBlurValue} contentEditable={editMode}
                            className={editMode ? clsx(classes.editModeStyle, classes.value) : classes.value}>{valueText}</Typography>
                {editMode ? <span>
                        <IconButton onClick={handleEditValueInternal} size={"small"}>
                        <FaCheck className={classes.iconDone}/>
                    </IconButton>
                        <IconButton onClick={handleCancelEditMode} size={"small"}>
                        <MdCancel className={classes.iconCancel}/>
                    </IconButton></span> :
                    <IconButton onClick={handleEditMode} size={"small"}>
                        <FaEdit className={classes.iconEdit}/>
                    </IconButton>
                }
            </div>
        </div>
    );
}

export default ToggleTextField;