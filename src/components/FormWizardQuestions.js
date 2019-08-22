import React, { useEffect, useState } from 'react';
import { MHPaper } from '../styling/MHPaper'
import { getFormsFromAPI, getQuestions } from '../helper/ApiDataFunctions';

// to not highlight props validation
/* eslint react/prop-types: 0 */

export const FormWizardQuestions = props => {

    const form = props.form
    const firstQuestion = props.firstQuestion

    // const [form, setForm] = useState({ title: '' })
    // const [currentQuestion, setCurrentQuestion] = useState({questionText: ''})

    // useEffect(() => {
    //     const formPromise = getFormsFromAPI().then(forms => {
    //          // get only the relevant form
    //         const formID = match.params.formid
    //         const currentForm = forms.find(form => form._id === formID)
    //         setForm(currentForm)
    //         return currentForm
    //     })
    //     const questionsPromise = getQuestions()

    //     // only run after received all forms and questions
    //     Promise.all([formPromise, questionsPromise]).then(([form, questions]) => {
    //         console.log(form)
    //         const firstQuestion = questions.find(question => form.firstQuestion === question._id)
    //         setCurrentQuestion(firstQuestion)
    //         console.log(questions)
    //         // setForm(formPromise)
    //     })

    // }, [match.params.formid])


    return (
        <div>
            <h2>{firstQuestion.questionText}</h2>

        </div>
    )
}

