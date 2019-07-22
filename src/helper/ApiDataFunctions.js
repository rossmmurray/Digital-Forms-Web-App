import axios from 'axios';
import {base_url} from "../connections";

export const getQuestionsFromAPI = async () => {
    const response = await axios.get(base_url + '/getQuestions');
    return response;
};

export const getQuestions = async () => {
    const questionsApiData = await getQuestionsFromAPI();
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
}
