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
