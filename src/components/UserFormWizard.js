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
    const [form, setForm] = useState(null)
    const [questions, setQuestions] = useState(null)
    const [done, setDone] = useState(false)
    // console.log(form)

    useEffect(() => {
        const formPromise = getFormsFromAPI().then(forms => {
             // get only the relevant form
            const formID = match.params.formid
            const currentForm = forms.find(form => form._id === formID)
            return currentForm
        })
        const questionsPromise = getQuestions()

        // only run after received all forms and questions
        Promise.all([formPromise, questionsPromise]).then(([form, questions]) => {
            setQuestions(questions)
            setForm(form)
        })

    }, [match.params.formid])

    const completeForm = () => {
        setDone(true)
    }


    return (
        <div>
            <MHPaper>
                {form ? <h1 className={classes.lightText} >{form.title}</h1> : null}
                {form && questions && !done ? <FormWizardQuestions completeForm={completeForm} form={form} questions={questions} /> : null}
                {done ? <h1>Form Completed!</h1> : null}
            </MHPaper>
    
        </div>
    )
}

