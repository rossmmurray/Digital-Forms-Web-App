import React from 'react';
import { questionType } from '../../propTypes/propTypes'
import PropTypes from 'prop-types';
import { MHTextField } from '../Fields';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


export const DateQuestion = props => {
    const classes = useStyles();

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

    const dateVal = (props.input.answer.value === '') ? '2019-01-01' : props.input.answer.value

    return (
        <div>
            <form className={classes.container} noValidate>
                <TextField
                    label="Enter Date"
                    onChange={handleChange}
                    value={dateVal}
                    type='date'
                    className={classes.textField}
                />
            </form>
            <br />
        </div>
    )
}

DateQuestion.propTypes = {
    updateInput: PropTypes.func,
    question: questionType,
    input: PropTypes.shape({
        answer: PropTypes.object,
        nextQuestion: PropTypes.string
    })
}