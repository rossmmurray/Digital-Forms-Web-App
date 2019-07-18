import axios from 'axios';
import {base_url} from "../connections";

export const getQuestionsFromAPI = () => {
    return axios.get(base_url + '/getQuestions')
        .then( response => {
            return response;
        });
};
