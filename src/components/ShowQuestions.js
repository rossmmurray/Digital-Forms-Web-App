import React from 'react';
import { getQuestions } from '../helper/ApiDataFunctions'

// TODO: change this to a class based component
class ShowQuestions extends React.Component {
    state = {
        visibleQuestions: '',
        singleQuestion: ''
    }

    async componentDidMount() {
        const allQuestions = await getQuestions();
        this.setState({ singleQuestion: allQuestions[0].questionText });
        const questionSublist = allQuestions.slice(0, 10);
        const questions = questionSublist.map(questionObject =>
            <li key={questionObject._id}>
                {questionObject.questionText}
            </li>
        )
        this.setState({ visibleQuestions: questions })
    }


    render() {
        return (
            <div>
                <h1>Show Questions Component</h1>
                <h3>{this.state.singleQuestion}</h3>
                <ul>
                    {this.state.visibleQuestions}
                </ul>
            </div>
        )
    }
}

export default ShowQuestions;

