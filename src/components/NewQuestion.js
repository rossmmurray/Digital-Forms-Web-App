import React, { Component, useState } from 'react';
import axios from "axios";
import { base_url } from "../connections";
// import MHAlert from './MHAlert';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveQuestionRequestToApi, updateQuestion } from '../helper/ApiDataFunctions'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
    button: {
        // margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

function NewQuestion(props) {
    const classes = useStyles();
    const [questionText, setQuestionText] = useState(props.question ? props.question.questionText : '')
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
            console.log(err.data.error.messge)
            NotificationManager.warning('Error: ' + err.data.error.message);
        }
    };

    return (
        <div>
            <TextField
                id="question-text"
                onChange={(e) => setQuestionText(e.target.value)}
                label="Question Text"
                multiline
                fullWidth
                value={questionText}
                variant="outlined"
                margin="normal"
            />
            <br />
            <Button variant="contained" onClick={() => saveQuestionToDB({questionText: questionText})}>Save</Button>
            <NotificationContainer />
        </div>
    )

}

export default NewQuestion;
