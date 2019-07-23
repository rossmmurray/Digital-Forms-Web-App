import axios from 'axios';
import {base_url} from "../connections";

export const getQuestions = async () => {
    // const response = await 
    const questionsApiData = await axios.get(base_url + '/getQuestions');
    return questionsApiData.data.data;
};

export const saveQuestion = async (questionText) => {
    // should return saved question if successful
    const response = await axios.post(base_url + '/putQuestion', {
        questionText: questionText
    })
    if (response.data.success) {
        return response.data.questionAdded;
    } else {
        throw 'Did not save';
    }
};

export const deleteQuestion = async (questionId) => {
    // should return true if worked, false if not
    const response = await axios.delete(base_url + '/question', {
        data: {id: questionId}
    });
    const resData = response.data
    return resData;
};

export const deleteAllQuestions = async () => {
    const response = await axios.delete(base_url + '/questions');
};