import React, { Component } from 'react';
import axios from "axios";
import { base_url } from "../connections";
// import MHAlert from './MHAlert';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveQuestion, updateQuestion } from '../helper/ApiDataFunctions'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


// /*eslint no-undef: 1*/
class NewQuestion extends Component {
    state = {
        questionText: this.props.question ? this.props.question.questionText : '',
        saveMessage: '',
        updateFlag: this.props.question ? true : false
    };

    componentDidUpdate() {
        // console.log("did update");
        // console.log(this.state.questionText);

    };

    saveQuestionToDB = async (questionText) => {
        if (this.state.updateFlag) {
            await updateQuestion(this.props.question._id, questionText);
            this.props.parentRefresh();
            this.props.parentStopEdit();
        } else {
            this.saveNewQuestionToDB(questionText);
        }
    };

    saveNewQuestionToDB = async (questionText) => {
        try {
            const savedQuestion = await saveQuestion(questionText);
            let successMessage = 'Saved new question: ' + savedQuestion.questionText;
            NotificationManager.success(successMessage)
        } catch (err) {
            NotificationManager.warning('Error: ' + err);
        }
    };

    render() {
        return (
            <div>
                <TextField
                    id="question-text"
                    onChange={(e) => this.setState({ questionText: e.target.value })}
                    label="Question Text"
                    multiline
                    fullWidth
                    value={this.state.questionText}
                    variant="outlined"
                    margin="normal"
                />
                <br />
                <br />
                <br />
                <br />
                <button className="nhsuk-button" onClick={() => this.saveQuestionToDB(this.state.questionText)}>
                    Save
                            </button>
                <NotificationContainer />
            </div>
        );
    }
}

export default NewQuestion;
