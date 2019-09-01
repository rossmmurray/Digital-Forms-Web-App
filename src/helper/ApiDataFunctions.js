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

export const getUsers = async () => {
    // try {
        const users = await axios.get(base_url + '/users', getRequestConfig())
        if (users.data.success === false) throw new Error(users.data.error)
        return users.data.data
    // } catch (error) {
    //     console.error(error)
    //     throw new Error(error)
    // }
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

export const getFormsFromAPI = async () => {
    const forms = await axios.get(base_url + '/forms', getRequestConfig());
    return forms.data.data
}

export const getAnswersFromAPI = async () => {
    const answers = await axios.get(base_url + '/answers', getRequestConfig());
    return answers.data.data
}

export const postFormToAPI = async (form) => {
    const response = await axios.post(base_url + '/form', form)
    return response
}

export const postAnswerToAPI = async (answer) => {
    const response = await axios.post(base_url + '/answer', answer)
    return response
}

export const deleteFormToAPI = async formQuery => {
    // strangley, the body goes into a data param for axios.delete
    const response = await axios.delete(base_url + '/form', {data: formQuery})
    return response.data.data.deletedCount
}

export const deleteQuestion = async (questionId) => {
    // strangley, the body goes into a data param for axios.delete
    const response = await axios.delete(base_url + '/question', {
        data: { id: questionId }
    });
    return response.data;
};

export const updateFormToAPI = async (form) => {
    const response = await axios.put(base_url + '/form', form);
    return response.data
}

export const updateQuestionRequestToApi = async (questionId, question) => {
    try {
        const response = await axios.put(base_url + '/updateQuestion/' + questionId, question);
        return response.data;
    } catch (err) {
        console.error(err)
        throw new Error(err);
    }
};

export const updateUser = async (updatedUser) => {
    try {
        const response = await axios.put(base_url + '/updateUser', updatedUser);
        return response.data;
    } catch (err) {
        console.error(err)
        throw new Error(err);
    } 
}

export const deleteAllQuestions = async () => {
    axios.delete(base_url + '/questions');
};