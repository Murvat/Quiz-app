import { CHANGE_AMOUNT, CHANGE_CATEGORY, CHANGE_DIFFICULTY, CHANGE_SCORE, CHANGE_TYPE } from "./actionsTypes";

const InitialState = {
    question_category: '',
    questions_difficulty: '',
    question_type: '',
    amount_of_question: 50,
    score: 0
}

const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case CHANGE_CATEGORY:
            return {
                ...state,
                question_category: action.payload,

            }
        case CHANGE_DIFFICULTY:
            return {
                ...state,
                questions_difficulty: action.payload,

            }
        case CHANGE_AMOUNT:
            return {
                ...state,
                question_amount: action.payload,

            }
        case CHANGE_SCORE:
            return {
                ...state,
                question_score: action.payload,

            }
        case CHANGE_TYPE:
            return {
                ...state,
                question_type: action.payload,

            };
        default:
            return state;
    };
};

export default reducer;