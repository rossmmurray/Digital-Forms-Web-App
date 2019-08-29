import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { questionType } from '../../propTypes/propTypes'
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(1),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
}));

// should only be called for valid radio quesitons
// pure component/function i.e. no state so very re-usable
export const RadioQuestion = props => {
    const classes = useStyles()

    // if option is null, choose the first one as default
    const optionId = props.input.answer.id || props.question.answerOptions[0]._id 

    const handleChange = event => {
        const chosenOption = props.question.answerOptions.find(option => option._id === event.target.value)

        // transform input into expected format for parent
        const input = {
            answer: {
                value: chosenOption.optionName,
                id: chosenOption._id
            },
            nextQuestion: chosenOption.questionLink
        }
        props.updateInput(input)
    }

    return (
        <div>
            <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    className={classes.group}
                    value={optionId}
                    onChange={handleChange}
                >
                    {props.question.answerOptions.map(option =>
                        <FormControlLabel key={option._id} value={option._id} control={<Radio />} label={option.optionName} />
                    )}
                </RadioGroup>
            </FormControl>
            <br />
        </div>
    )
}

RadioQuestion.propTypes = {
    updateInput: PropTypes.func,
    question: questionType,
    input: PropTypes.shape({
        answer: PropTypes.object,
        nextQuestion: PropTypes.string
    })
}