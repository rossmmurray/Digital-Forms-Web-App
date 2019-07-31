import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveQuestionRequestToApi, updateQuestionRequestToApi } from '../helper/ApiDataFunctions'
import Button from '@material-ui/core/Button';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';
import { AnswerOptions } from './AnswerOptions'


function NewQuestion(props) {
    const [questionText, setQuestionText] = useState(props.question ? props.question.questionText : '')
    const [answerType, setAnswerType] = useState(props.question ? props.question.answerType : '')
    const updateFlag = props.question ? true : false;
    const answerTypeOptions = [
        { value: 'free', displayText: 'Free Text' },
        { value: 'boolean', displayText: 'True/False' },
        { value: 'option', displayText: 'Options' },
        { value: 'date', displayText: 'Date' },
        { value: 'number', displayText: 'Number' },
    ]

    // todo: rename these functions
    const saveQuestionToDB = async (question) => {
        let successResponse = '';
        let errorMessage = '';
        try {
            if (updateFlag) {
                successResponse = await saveExistingQuestionToDB(question);
            } else {
                successResponse = await saveNewQuestionToDB(question);
            }
            NotificationManager.success(successResponse)
            if (typeof props.parentRefresh == 'function') {
                props.parentRefresh()
            }
        } catch (error) {
            errorMessage = error.message ? error.message : error;
            console.error(error)
            NotificationManager.warning(errorMessage)
        }
    };

    const saveExistingQuestionToDB = async (question) => {
        // we have the id here but not when saving exisitng question
        const response = await updateQuestionRequestToApi(props.question._id, question).catch(error => {
            console.error(error)
            throw error;
        });
        if (response.success) {
            props.parentRefresh();
            props.parentStopEdit();
            const successMessage = "Updated question: " + response.question.questionText;
            return successMessage;
        } else {
            const failureMessage = "Error: " + response.error.message;
            return failureMessage;
        }
    }

    const saveNewQuestionToDB = async (question) => {
        try {
            const savedQuestion = await saveQuestionRequestToApi(question);
            let successMessage = 'Saved new question: ' + savedQuestion.questionText;
            // NotificationManager.success(successMessage)
            return successMessage;
        } catch (err) {
            if (err.data) {
                console.error(err.data.error.messge)
                // NotificationManager.warning('Error: ' + err.data.error.message);
                throw new Error(err.data.error.message) 
            } else {
                console.error(err)
                // NotificationManager.warning('Error: ' + err);
                throw new Error(err)
            }
        }
    };

    return (
        <div>
            <MHTextField
                label="Question Text"
                onChange={(e) => setQuestionText(e.target.value)}
                value={questionText}
            />
            <MHSelectField
                onChange={(e) => setAnswerType(e.target.value)}
                label="Answer Type"
                value={answerType}
                options={answerTypeOptions}
            />
            <br />
            <AnswerOptions />

            <Button variant="contained" onClick={() => saveQuestionToDB({ questionText: questionText, answerType: answerType })}>Save</Button>
            <NotificationContainer />
        </div>
    )
}

NewQuestion.propTypes = {
    question: PropTypes.shape({
        questionText: PropTypes.string,
        answerType: PropTypes.string,
        _id: PropTypes.string
    }),
    parentRefresh: PropTypes.func,
    parentStopEdit: PropTypes.func
};

export default NewQuestion;
