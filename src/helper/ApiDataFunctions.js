import axios from 'axios';
import { base_url } from "../connections";

export const getQuestions = async () => {
    // const response = await 
    const questionsApiData = await axios.get(base_url + '/getQuestions');
    return questionsApiData.data.data;
};

export const saveQuestionRequestToApi = async (question) => {
    // should return saved question if successful
    const questionText = question.questionText
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

export const updateQuestion = async (questionId, question) => {
    try {
        const response = await axios.put(base_url + '/updateQuestion/' + questionId, question);
        return response.data;
    } catch(err) {
        console.log(err)
        throw new Error(err);
    }
};

export const deleteAllQuestions = async () => {
    axios.delete(base_url + '/questions');
};