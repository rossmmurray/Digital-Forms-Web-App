import React from 'react';
import { questionType } from '../../propTypes/propTypes'
import PropTypes from 'prop-types';
import { MHTextField } from '../Fields';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        fullWidth: true

    },
    textField: {
        // marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
        // width: 200,
    }
}));


export const NumberQuestion = props => {
    const classes = useStyles()

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
            <TextField
                type='number'
                label="Question Answer"
                onChange={handleChange}
                value={props.input.answer.value}
                variant='outlined'
                className={clsx(classes.textField, classes.formControl)}
            />
            <br />
        </div>
    )
}

NumberQuestion.propTypes = {
    updateInput: PropTypes.func,
    question: questionType,
    input: PropTypes.shape({
        answer: PropTypes.object,
        nextQuestion: PropTypes.string
    })
}