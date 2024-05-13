import { Box, Button, CircularProgress, Typography } from "@mui/material"
import useAxios from "../hooks/useAxios"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { handleScoreChange } from "../redux/actions";



const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}
const Questions = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const {
        question_category,
        questions_difficulty,
        question_type,
        amount_of_question,
        score
    } = useSelector((state) => state)


    let apiUrl = `/api.php?amount=${amount_of_question}`;
    if (question_category) {
        apiUrl = apiUrl.concat(`&category=${question_category}`)
    }
    if (questions_difficulty) {
        apiUrl = apiUrl.concat(`&difficulty=${questions_difficulty}`)
    }
    if (question_type) {
        apiUrl = apiUrl.concat(`&type=${question_type}`)
    }
    const { response, loading } = useAxios({ url: apiUrl })

    const [questionIndex, setQuestionIndex] = useState(0);
    const [option, setOption] = useState([]);

    useEffect(() => {
        if (response?.results.length) {
            const question = response.results[questionIndex];
            console.log(question)
            let answers = [...question.incorrect_answers]
            answers.splice(
                getRandomInt(question.incorrect_answers.length),
                0,
                question.correct_answer
            );
            setOption(answers)
        }

    }, [response, questionIndex])
    if (loading) {
        return (
            <Box mt={20}>
                <CircularProgress />
            </Box>
        )
    }

    const handeClickAnswer = (e) => {
        const question = response.results[questionIndex];
        console.log(e.target.textContent)
        console.log(question.correct_answer)
        if (e.target.textContent === question.correct_answer) {
            dispatch(handleScoreChange(score + 1))
        }
        if (questionIndex + 1 < response.results.length) {
            setQuestionIndex(questionIndex + 1)
        } else {
            navigate('/score')
        }
    }
    return (
        <>
            <Box>
                <Typography variant='h4'>
                    Questions {questionIndex + 1}
                </Typography>
                <Typography mt={5}>
                    {response.results[questionIndex].question}
                </Typography>

                {option.map((data, id) => (
                    <Box mt={2} key={id}>
                        <Button onClick={handeClickAnswer}
                            variant='contained' >{data}</Button>
                    </Box>
                ))}
                <Box mt={5}>
                    <Button>Scrore: {score}/{response.results.length}</Button>
                </Box>
            </Box>
        </>
    )
}

export default Questions