import React, { useEffect, useState } from 'react';
import { MHPaper } from '../styling/MHPaper'
import { getFormsFromAPI, getQuestions } from '../helper/ApiDataFunctions';
import { FormWizardQuestions } from './FormWizardQuestions';

// to not highlight props validation
/* eslint react/prop-types: 0 */

export const UserFormWizard = ({ match }) => {

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
            console.log(form)
            setQuestions(questions)
            const firstQuestion = questions.find(question => form.firstQuestion === question._id)
            setCurrentQuestion(firstQuestion)
            console.log(questions)
            // setForm(formPromise)
        })

    }, [match.params.formid])


    return (
        <div>
            <MHPaper>
                <h1>{form.title}</h1>
                {currentQuestion ? <FormWizardQuestions form={form} firstQuestion={currentQuestion} questions={questions} /> : null}
            </MHPaper>
    
        </div>
    )
}

