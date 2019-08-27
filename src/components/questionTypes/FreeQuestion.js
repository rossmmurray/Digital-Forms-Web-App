import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { questionType } from '../../propTypes/propTypes'
import PropTypes from 'prop-types';
import { MHTextField } from '../Fields';

/* eslint react/prop-types: 0 */

// should only be called for valid radio quesitons
export const FreeQuestion = props => {

    // const form = props.form
    // const question = props.question

    const [userText, setUserText] = useState('')

    const clickNext = () => {
        // props.goToNextQuestion(chosenOption.questionLink)
    }

    return (
        <div>
            <MHTextField
                label="Question Answer"
                onChange={event => setUserText(event.target.value)}
                value={userText}
            />
            <br />
            <Button align="right" variant="contained" color="primary" onClick={clickNext}>Next Question</Button>
        </div>
    )
}

FreeQuestion.propTypes = {
    goToNextQuestion: PropTypes.func,
    question: questionType,
    form: PropTypes.object
}