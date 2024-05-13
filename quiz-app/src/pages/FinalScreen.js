import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAmountChange, handleScoreChange } from "../redux/actions";

const FinalScreen = () => {
    const dispatch = useDispatch();
    const { score } = useSelector(state => state)
    const navigate = useNavigate();

    const handleBackTSettings = () => {
        dispatch(handleScoreChange(0));
        dispatch(handleAmountChange(50));
        navigate('/')
    }
    return (

        <Box mt={30}>
            <Typography varian='h3' fontWeight='bold' mb={3}>
                Final Score {score}
            </Typography>
            <Button onClick={handleBackTSettings} variant='outlined'>
                back to settings!
            </Button>
        </Box>
    )
}

export default FinalScreen;