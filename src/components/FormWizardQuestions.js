import React, { useEffect, useState } from 'react';
import { MHPaper } from '../styling/MHPaper'
import { getFormsFromAPI, getQuestions } from '../helper/ApiDataFunctions';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// to not highlight props validation
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


export const FormWizardQuestions = props => {
    const classes = useStyles()

    const form = props.form
    const firstQuestion = props.firstQuestion
    const questions = props.questions

    const [currentQuestion, setCurrentQuestion] = useState(firstQuestion)
    const [value, setValue] = useState(currentQuestion.answerOptions[0]._id)

    const handleChange = event => {
        console.log(event.target.value)
        setValue(event.target.value)
    }

    const goToNextQuestion = () => {
        console.log(value)
    }

    return (
        <div>
            <h2>{currentQuestion.questionText}</h2>
            <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    className={classes.group}
                    value={value}
                    onChange={handleChange}
                >
                    {currentQuestion.answerOptions.map(option =>
                        <FormControlLabel key={option._id} value={option._id} control={<Radio />} label={option.optionName} />
                    )}
                </RadioGroup>
            </FormControl>
            <br />
            <Button align="right" variant="contained" color="primary" onClick={goToNextQuestion}>Next Question</Button>

        </div>
    )
}

