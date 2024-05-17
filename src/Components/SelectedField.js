import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import {
    handleCategoryChange,
    handleDifficultyChange,
    handleTypeChange
} from '../redux/actions'

const SelectedField = (props) => {
    // label-names of labels:Category,Difficulty,Type
    //options-return an array of options to choose[{..},{..}] 
    const { label, options } = props;//
    const dispatch = useDispatch();
    //value return an option i've chosen
    const [value, setValue] = useState('')//
    const handleChange = (e) => {
        setValue(e.target.value);


        switch (label) {
            case 'Category':
                dispatch(handleCategoryChange(e.target.value));
                break;
            case 'Difficulty':
                dispatch(handleDifficultyChange(e.target.value));
                break;
            case 'Type':
                dispatch(handleTypeChange(e.target.value));
                break;
            default:
                return;
        }
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