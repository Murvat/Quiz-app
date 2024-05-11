import { Box, Button, CircularProgress, Typography } from "@mui/material";
import SelectedField from "../Components/SelectedField";
import TextFieldComp from "../Components/TextFieldComp";
import useAxios from "../hooks/useAxios";
const Settings = () => {

    const { response, error, loading } = useAxios({ url: 'api_category.php' })

    if (loading) {
        return (
            <Box mt={20}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" mt={20} color='red'>
                Some Went Wrong
            </Typography>
        )
    }
    const difficultyOptions = [
        { id: 'easy', name: 'Easy' },
        { id: 'medium', name: 'Medium' },
        { id: 'hard', name: 'Hard' },
    ]

    const typeOptions = [
        { id: 'multiple', name: 'Multiple Choise' },
        { id: 'boolean', name: 'True/False' },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <SelectedField
                    options={response.trivia_categories}
                    label='Category' />
                <SelectedField
                    options={difficultyOptions}
                    label='Difficulty' />
                <SelectedField
                    options={typeOptions}
                    label='Type' />
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