import React, {Component} from 'react';
import axios from "axios";
import { base_url } from "../connections";
// import MHAlert from './MHAlert';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


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

    saveQuestionToDB = (questionText) => {
        // console.log("saving question");
        axios.post(base_url + '/putQuestion', {
            questionText: questionText
        })
            .then( response => {
                // can't do the below because response is a circular object itself
                console.log("Data sent to: " + response.config.url);
                if (response.data.success) {
                    let successMessage = 'Saved new question: ' + questionText;
                    this.setState( {saveMessage: successMessage});
                    NotificationManager.success(successMessage);
                } else {
                    // console.log(JSON.stringify(response));
                    // this.setState( {saveMessage: 'Error, try again'});
                    NotificationManager.warning('Error: ' + response.data);
                }
                // console.log('saved');
            })
            .catch( (err) => {
                NotificationManager.warning("Error: " + err.message);
            })

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
                                Add Question
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
