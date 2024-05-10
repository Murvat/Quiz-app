import { Box, Button, Typography } from "@mui/material";
import SelectedField from "../Components/SelectedField";
import TextFieldComp from "../Components/TextFieldComp";
const Settings = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <SelectedField label='Category' />
                <SelectedField label='Difficulty' />
                <SelectedField label='Type' />
                <TextFieldComp />
                <Box mt={3} width='100%'>
                    <Button type='submit' fullWidth variant='contained'>
                        Get Started
                    </Button>

                </Box>
            </form>
        </>
    )
}

export default Settings