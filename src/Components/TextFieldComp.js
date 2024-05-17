import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { handleAmountChange } from "../redux/actions";
const TextFieldComp = () => {
    const dispatch = useDispatch();


    const handleChange = (e) => {
        dispatch(handleAmountChange(e.target.value))
    }
    return (
        <>
            <Box mt={3} width='100%'>
                <FormControl fullWidth size='small'>
                    <TextField
                        label='Amount of Questions'
                        onChange={handleChange}
                        variant='outlined'
                        size='Small'
                        type="number"
                    >

                    </TextField>
                </FormControl>

            </Box >
        </>
    )
};

export default TextFieldComp;