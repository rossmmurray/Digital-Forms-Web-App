import React, {Component} from 'react';
import axios from "axios";
import { base_url } from "../connections";


class NewQuestion extends Component {
    // base_url = 'https://mhtriagebackend.azurewebsites.net/api/';
    state = {
        questionText: ''
    };

    saveQuestionToDB = (questionText) => {
        console.log("saving question");
        axios.post(base_url + '/putQuestion', {
            questionText: questionText
        })
            .catch( (err) => {
                console.log(err);
            })

    };

    // putDataToDB = (message) => {
    //     let currentIds = this.state.data.map((data) => data.id);
    //     let idToBeAdded = 0;
    //     while (currentIds.includes(idToBeAdded)) {
    //         ++idToBeAdded;
    //     }
    //
    //     axios.post(this.base_url + '/putData', {
    //         id: idToBeAdded,
    //         message: message,
    //     });
    // };

    render() {
        return (
            <div>
                <h1>This is the New Question Component</h1>
                <div>
                    <label>
                        <h3>Question Text</h3>
                        <div>
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
                        </div>

                    </label>

                </div>
            </div>

        );

    }
}

export default NewQuestion;
