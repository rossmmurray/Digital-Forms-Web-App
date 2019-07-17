import React, {Component} from 'react';
import axios from "axios";
import { base_url } from "../connections";
// import MHAlert from './MHAlert';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



class NewQuestion extends Component {
    state = {
        questionText: '',
        saveMessage: ''
    };



    saveQuestionToDB = (questionText) => {
        console.log("saving question");
        axios.post(base_url + '/putQuestion', {
            questionText: questionText
        })
            .then( response => {
                console.log(JSON.stringify(response));
                if (response.data.success) {
                    // this.setState( {saveMessage: 'Saved new question: ' + questionText});
                    // this.createNotification('success');
                    NotificationManager.success('Saved new question: ' + questionText);
                } else {
                    console.log(JSON.stringify(response));
                    this.setState( {saveMessage: 'Error, try again'});
                    NotificationManager.warning('Error, try again');

                }
                console.log('saved');
            })
            .catch( (err) => {
                console.log(err);
                this.setState( {saveMessage: 'Error: ' + err});
                NotificationManager.warning('Error: ' + err);
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

                {/*<MHAlert>{this.state.saveMessage}</MHAlert>*/}
                <NotificationContainer/>

                <h1>{this.state.saveMessage}</h1>

            </div>

        );

    }
}

export default NewQuestion;
