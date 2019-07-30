import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveQuestionRequestToApi, updateQuestion } from '../helper/ApiDataFunctions'
import Button from '@material-ui/core/Button';
import { MHSelectField, MHTextField } from './Fields'


function NewQuestion(props) {
    const [questionText, setQuestionText] = useState(props.question ? props.question.questionText : '')
    const [answerType, setAnswerType] = useState(props.question ? props.question.answerType : '')
    const updateFlag = props.question ? true : false;

    // todo: rename these functions
    const saveQuestionToDB = async (question) => {
        if (updateFlag) {
            await updateQuestion(props.question._id, question.questionText);
            props.parentRefresh();
            props.parentStopEdit();
        } else {
            saveNewQuestionToDB(question);
        }
    };

    const saveNewQuestionToDB = async (question) => {
        try {
            const savedQuestion = await saveQuestionRequestToApi(question);
            let successMessage = 'Saved new question: ' + savedQuestion.questionText;
            NotificationManager.success(successMessage)
        } catch (err) {
            if (err.data) {
                console.log(err.data.error.messge)
                NotificationManager.warning('Error: ' + err.data.error.message);
            } else {
                console.log(err)
                NotificationManager.warning('Error: ' + err);
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
                options={[
                    { value: 'free', displayText: 'Free Text' },
                    { value: 'boolean', displayText: 'True/False' },
                    { value: 'option', displayText: 'Options' },
                    { value: 'date', displayText: 'Date' },
                    { value: 'number', displayText: 'Number' },
                ]}
            />
            <br />
            <Button variant="contained" onClick={() => saveQuestionToDB({ questionText: questionText, answerType: answerType })}>Save</Button>
            <NotificationContainer />
        </div>
    )

}

export default NewQuestion;
