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
    const [formCompletionFlag, setFormCompletionFlag] = useState(false)

    // Triggers on change of url parameter (i.e. form choice)
    useEffect(() => {
        setFormCompletionFlag(false)

         // Get only the relevant form
        const formPromise = getFormsFromAPI().then(forms => {
            return forms.find(form => form._id === match.params.formid)
        })
    
        // Get all questions
        const questionsPromise = getQuestions()

        // Only run after received all forms and questions. 
        Promise.all([formPromise, questionsPromise]).then(([form, questions]) => {
            setQuestions(questions)
            setForm(form)
        })
    }, [match.params.formid])

    const completeForm = () => {
        setFormCompletionFlag(true)
    }


    return (
        <div>
            <MHPaper>
                {form ? <h1 className={classes.lightText} >{form.title}</h1> : null}
                {form && questions && !formCompletionFlag ? <FormWizardQuestions completeForm={completeForm} form={form} questions={questions} /> : null}
                {formCompletionFlag ? <div><h1>Form Completed</h1><p>Somone will get in touch with you in due course.</p></div> : null}
            </MHPaper>
    
        </div>
    )
}

