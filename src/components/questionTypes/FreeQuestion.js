import React, { useState } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { questionType } from '../../propTypes/propTypes'
import PropTypes from 'prop-types';
import { MHTextField } from '../Fields';

/* eslint react/prop-types: 0 */

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
}));

// 

// should only be called for valid radio quesitons
export const FreeQuestion = props => {
    const classes = useStyles()

    const form = props.form
    const question = props.question

    const [userText, setUserText] = useState(null)

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