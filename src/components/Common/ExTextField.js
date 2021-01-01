import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

ExTextField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    variant: PropTypes.string,
    items: PropTypes.array
};

function ExTextField(props) {
    const {items, ...rest} = props;
    return (
        <TextField
            select={Boolean(items)}
            {...rest}
        >
            {items ? items.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            )) : ""}
        </TextField>
    );
}

export default ExTextField;