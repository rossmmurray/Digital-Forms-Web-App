import React, { useState } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
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
export const RadioQuestion = props => {
    const classes = useStyles()

    const question = props.question

    const [chosenOptionId, setChosenOptionId] = useState(question.answerOptions[0]._id)

    const handleChange = event => {
        console.log(event.target.value)
        setChosenOptionId(event.target.value)
    }

    const clickNext = () => {
        const chosenOption = question.answerOptions.find(option => option._id === chosenOptionId)
        props.goToNextQuestion(chosenOption.questionLink)
    }

    return (
        <div>
            <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    className={classes.group}
                    value={chosenOptionId}
                    onChange={handleChange}
                >
                    {question.answerOptions.map(option =>
                        <FormControlLabel key={option._id} value={option._id} control={<Radio />} label={option.optionName} />
                    )}
                </RadioGroup>
            </FormControl>
            <br />
            <Button align="right" variant="contained" color="primary" onClick={clickNext}>Next Question</Button>

        </div>
    )
}

RadioQuestion.propTypes = {
    goToNextQuestion: PropTypes.func,
    question: questionType,
    form: PropTypes.object
}