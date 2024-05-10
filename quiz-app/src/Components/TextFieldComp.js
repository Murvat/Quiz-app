import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
const TextFieldComp = () => {
    const handleChange = () => {

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