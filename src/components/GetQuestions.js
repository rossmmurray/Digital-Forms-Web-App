import React, {Component} from 'react';
import axios from 'axios';
import {base_url} from "../connections";

class GetQuestions extends Component {

    static getQuestionsFromAPI = () => {
        return axios.get(base_url + '/getQuestions')
            .then( response => {
                return response;
            });
    };

    render() {
        return (
            <div>

            </div>
        )
    }

}

export default GetQuestions;

