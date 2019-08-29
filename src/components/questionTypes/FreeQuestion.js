import React from 'react';
import { questionType } from '../../propTypes/propTypes'
import PropTypes from 'prop-types';
import { MHTextField } from '../Fields';


export const FreeQuestion = props => {

    const handleChange = event => {
        // transform input into expected format for parent
        const input = {
            answer: {
                value: event.target.value,
            },
            nextQuestion: props.question.nextQuestion
        }
        props.updateInput(input)
    }

    return (
        <div>
            <MHTextField
                label="Question Answer"
                onChange={handleChange}
                value={props.input.answer.value}
            />
            <br />
        </div>
    )
}

FreeQuestion.propTypes = {
    updateInput: PropTypes.func,
    question: questionType,
    input: PropTypes.shape({
        answer: PropTypes.object,
        nextQuestion: PropTypes.string
    })
}