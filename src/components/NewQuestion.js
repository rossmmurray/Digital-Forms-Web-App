import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveQuestionRequestToApi, updateQuestionRequestToApi } from '../helper/ApiDataFunctions'
import Button from '@material-ui/core/Button';
import { MHSelectField, MHTextField } from './Fields'
import { async } from 'q';


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
        try {
            if (updateFlag) {
                successResponse = await saveExistingQuestionToDB(question);
            } else {
                successResponse = await saveNewQuestionToDB(question);
            }
            NotificationManager.success(successResponse)
        } catch (error) {
            NotificationManager.warning(error)
        }
    };

    const saveExistingQuestionToDB = async (question) => {
        const response = await updateQuestionRequestToApi(props.question._id, question);
        props.parentRefresh();
        props.parentStopEdit();
        // todo: make it output a nice message
        return response.question.questionText;
    }

    const saveNewQuestionToDB = async (question) => {
        try {
            const savedQuestion = await saveQuestionRequestToApi(question);
            let successMessage = 'Saved new question: ' + savedQuestion.questionText;
            // NotificationManager.success(successMessage)
            return successMessage;
        } catch (err) {
            if (err.data) {
                console.log(err.data.error.messge)
                // NotificationManager.warning('Error: ' + err.data.error.message);
                throw 'Error: ' + err.data.error.message 
            } else {
                console.log(err)
                // NotificationManager.warning('Error: ' + err);
                throw 'Error: ' + err
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
            <Button variant="contained" onClick={() => saveQuestionToDB({ questionText: questionText, answerType: answerType })}>Save</Button>
            <NotificationContainer />
        </div>
    )

  
}

export default NewQuestion;
