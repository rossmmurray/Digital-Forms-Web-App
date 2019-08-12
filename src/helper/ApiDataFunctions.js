import axios from 'axios';
import { base_url } from "../connections";
import { getTokenFromLocalStorage } from './AuthFunctions';


const getRequestConfig = () => {
    const requestConfig = {
        headers: {
            "x-auth-token": getTokenFromLocalStorage()
        }
    }
    return requestConfig;
}

export const getQuestions = async () => {
    let questionsApiData = {};
    try {
        questionsApiData = await axios.get(base_url + '/getQuestions', getRequestConfig());
        return questionsApiData.data.data;
    } catch (error) {
        console.error(error)
        return [];
    }
};

export const saveQuestionRequestToApi = async (question) => {
    // should return saved question if successful
    const response = await axios.post(base_url + '/putQuestion', question)
    if (response.data.success) {
        return response.data.questionAdded;
    } else {
        throw response.data.error.message;
    }
};

export const deleteQuestion = async (questionId) => {
    // strangley, the body goes into a data param for axios.delete
    const response = await axios.delete(base_url + '/question', {
        data: { id: questionId }
    });
    const resData = response.data
    return resData;
};

export const updateQuestionRequestToApi = async (questionId, question) => {
    try {
        const response = await axios.put(base_url + '/updateQuestion/' + questionId, question);
        return response.data;
    } catch (err) {
        console.error(err)
        throw new Error(err);
    }
};

export const deleteAllQuestions = async () => {
    axios.delete(base_url + '/questions');
};