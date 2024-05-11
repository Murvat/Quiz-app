import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const SelectedField = (props) => {
    const { label, options } = props;
    const [value, setValue] = useState('')
    const handleChange = () => {
    }

    return (
        <>
            <Box mt={3} width='100%'>
                <FormControl size='small' fullWidth>
                    <InputLabel>{label}</InputLabel>
                    <Select value={value} label={label} onChange={handleChange}>
                        {options.map(({ id, name }) => (
                            <MenuItem value={id} key={id}>{name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    )
};

export default SelectedField