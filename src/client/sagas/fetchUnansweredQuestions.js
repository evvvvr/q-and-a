import { createSagaToFetchItems } from './saga-util'
import ActionTypes from '../actions/ActionTypes'
import API from '../API/API'
import { recieveUnansweredQuestions } from '../actions/unansweredQuestions' 

const fetchUnansweredQuestions =  createSagaToFetchItems(
    ActionTypes.RequestUnansweredQuestions,
    API.fetchUnansweredQuestions,
    recieveUnansweredQuestions
);

export default fetchUnansweredQuestions;