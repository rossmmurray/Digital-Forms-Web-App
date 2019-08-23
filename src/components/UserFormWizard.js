import React, { useEffect, useState } from 'react';
import { MHPaper } from '../styling/MHPaper'
import { getFormsFromAPI, getQuestions } from '../helper/ApiDataFunctions';
import { FormWizardQuestions } from './FormWizardQuestions';
import { makeStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

// to not highlight props validation
/* eslint react/prop-types: 0 */

const useStyles = makeStyles(theme => ({
    lightText: {
        color: grey[600]
    }
}));

export const UserFormWizard = ({ match }) => {
    const classes = useStyles();

    const [form, setForm] = useState({ title: '' })
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const formPromise = getFormsFromAPI().then(forms => {
             // get only the relevant form
            const formID = match.params.formid
            const currentForm = forms.find(form => form._id === formID)
            setForm(currentForm)
            return currentForm
        })
        const questionsPromise = getQuestions()

        // only run after received all forms and questions
        Promise.all([formPromise, questionsPromise]).then(([form, questions]) => {
            setQuestions(questions)
            const firstQuestion = questions.find(question => form.firstQuestion === question._id)
            setCurrentQuestion(firstQuestion)
        })

    }, [match.params.formid])


    return (
        <div>
            <MHPaper>
                <h1 className={classes.lightText} >{form.title}</h1>
                {currentQuestion ? <FormWizardQuestions form={form} firstQuestion={currentQuestion} questions={questions} /> : null}
            </MHPaper>
    
        </div>
    )
}

