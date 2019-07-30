import React, { Component, useState } from 'react';
import axios from "axios";
import { base_url } from "../connections";
// import MHAlert from './MHAlert';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveQuestionRequestToApi, updateQuestion } from '../helper/ApiDataFunctions'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import option from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
    button: {
        // margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 250,
      },
}));

function NewQuestion(props) {
    const classes = useStyles();
    const [questionText, setQuestionText] = useState(props.question ? props.question.questionText : '')
    const [answerType, setAnswerType] = useState(props.question ? props.question.answerType : '')
    const updateFlag = props.question ? true : false;


    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

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
            <FormControl className={classes.formControl}>
            <TextField
                id="question-text"
                onChange={(e) => setQuestionText(e.target.value)}
                label="Question Text"
                multiline
                // fullWidth
                value={questionText}
                variant="outlined"
                // margin="normal"
            />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="answer-type">Answer Type</InputLabel>
                <Select
                    // must be set to native = true so real options elements can be used (for testing)
                    native={true}
                    id="answer-type"
                    onChange={(e) => setAnswerType(e.target.value)}
                    input={<OutlinedInput labelWidth={labelWidth} name="answerType" id="answer-type" />}
                    value={answerType}
                >
                    <option value="">
                        {/* <em>None</em> */}
                    </option>
                    <option value='option'>Option</option>
                    <option value='free'>Free Text</option>
                    <option value='boolean'>Boolean (true/false)</option>
                    <option value='date'>Date</option>
                    <option value='number'>Number</option>
                </Select>
            </FormControl>
            <br />
            <Button variant="contained" onClick={() => saveQuestionToDB({ questionText: questionText, answerType: answerType })}>Save</Button>
            <NotificationContainer />
        </div>
    )

}

export default NewQuestion;
