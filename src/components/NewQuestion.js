import React, {Component} from 'react';

class NewQuestion extends Component {
    state = {
        questionText: ''
    };

    saveQuestionToDB = (questionText) => {

    };

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
                            <button className="nhsuk-button" onClick={() => this.deleteFromDB(this.state.idToDelete)}>
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
