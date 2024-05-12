import { Box, Button, Typography } from "@mui/material"
import useAxios from "../hooks/useAxios"

const Questions = () => {
    let apiUrl = `/api.php?amount=10`;

    const { response, loading } = useAxios({ url: apiUrl })
    console.log(response)
    return (
        <>
            <Box>
                <Typography variant='h4'>
                    Questions 1
                </Typography>
                <Typography mt={5}>
                    This is the questions?
                </Typography>
                <Box mt={2}  >
                    <Button variant='contained'>Answer1</Button>
                </Box>
                <Box mt={2}>
                    <Button variant='contained' >Answer2</Button>
                </Box>
                <Box mt={5}>
                    <Button>Scrore 2/6</Button>
                </Box>
            </Box>
        </>
    )
}

export default Questions