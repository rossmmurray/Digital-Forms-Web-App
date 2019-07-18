import axios from 'axios';
import {base_url} from "../connections";

export const getQuestionsFromAPI = () => {
    return axios.get(base_url + '/getQuestions')
        .then( response => {
            return response;
        });
};

export const getQuestions = async () => {
    const questionsApiData = await getQuestionsFromAPI();
    return questionsApiData.data.data;
};
