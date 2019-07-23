import React, {Component} from 'react';
import axios from "axios";
import { base_url } from "../connections";
// import MHAlert from './MHAlert';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveQuestion } from '../helper/ApiDataFunctions'


// /*eslint no-undef: 1*/
class NewQuestion extends Component {
    state = {
        questionText: '',
        saveMessage: ''
    };

    componentDidUpdate() {
        // console.log("did update");
        // console.log(this.state.questionText);
    };

    saveQuestionToDB = async (questionText) => {
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
                <h1>This is the New Question Component</h1>
                <div>
                    <label>
                        <h3>Question Text</h3>
                        {/*<div>*/}
                            <input
                                className="nhsuk-input"
                                type="text"
                                style={{ width: '400px' }}
                                onChange={(e) => this.setState({ questionText: e.target.value })}
                                placeholder="enter new question text"
                            />
                            <button className="nhsuk-button" onClick={() => this.saveQuestionToDB(this.state.questionText)}>
                                Save
                            </button>
                        {/*</div>*/}

                    </label>

                </div>

                <NotificationContainer/>
                {/*blah blah*/}
                {/*<h3>{this.state.saveMessage}</h3>*/}

            </div>

        );

    }
}

export default NewQuestion;
