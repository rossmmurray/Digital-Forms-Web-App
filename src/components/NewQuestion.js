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

const MHTextField = (props) => {
    // turn label into id
    const label = props.label;
    const labalId = label.toLowerCase().replace(" ", "-");

    return (
        <TextField
            id={labalId}
            multiline
            variant="outlined"
            {...props}
        />
    )
}

const MHSelectField = (props) => {
    // turn label into id
    const label = props.label;
    const labalId = label.toLowerCase().replace(" ", "-");
    const classes = useStyles();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor={labalId}>{label}</InputLabel>
            <Select
                // must be set to native = true so real options elements can be used (for testing)
                native={true}
                id={labalId}
                input={<OutlinedInput labelWidth={labelWidth} id={labalId} />}
                value={props.value}
                onChange={props.onChange}
            >
                <option value="" disabled></option>
                {   
                    // render passed options
                    props.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.displayText}</option>
                })}
            </Select>
        </FormControl>
    )
}


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
