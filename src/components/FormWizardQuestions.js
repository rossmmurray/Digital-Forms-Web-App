import React, { useState, useEffect } from 'react';
import { RadioQuestion } from './questionTypes/RadioQuestion';
import { questionType } from '../propTypes/propTypes'
import PropTypes from 'prop-types';
import { FreeQuestion } from './questionTypes/FreeQuestion';
import { Button } from '@material-ui/core';


const components = {
    option: RadioQuestion,
    free: FreeQuestion,
    boolean: FreeQuestion,
    date: FreeQuestion,
    number: FreeQuestion
}

// function to choose the right component type
const QuestionType = props => {
    const questionType = props.question.answerType
    const SpecificQuestionType = components[questionType]
    return <SpecificQuestionType {...props} />
}

export const FormWizardQuestions = props => {

    // find first question
    const firstQuestion = props.questions.find(question => props.form.firstQuestion === question._id)
    const [currentQuestion, setCurrentQuestion] = useState(firstQuestion)
    const blankInput = { answer: {value: '', id: null }, nextQuestion: null}
    const [currentUserInput, setCurrentUserInput] = useState(blankInput)

    const goToNextQuestion = () => {
        if (typeof currentUserInput.nextQuestion === 'undefined') {
            console.log("finished")
            props.completeForm();
        } else {
            const nextQuestion = props.questions.find(question => question._id === currentUserInput.nextQuestion)
            setCurrentUserInput(blankInput)
            setCurrentQuestion(nextQuestion)
        }
    
    }

    const updateInput = answer => {
        console.log(answer)
        setCurrentUserInput(answer)
    }

    useEffect(() => {
        setCurrentQuestion(firstQuestion)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.form._id])

    return (
        <div>
            <h2>{currentQuestion.questionText}</h2>
            <QuestionType
                updateInput={updateInput}
                question={currentQuestion}
                input={currentUserInput}
            />
            <Button align="right" variant="contained" color="primary" onClick={goToNextQuestion}>Next Question</Button>
        </div>
    )
}

FormWizardQuestions.propTypes = {
    questions: PropTypes.arrayOf(questionType),
    form: PropTypes.object,
    completeForm: PropTypes.func
}

QuestionType.propTypes = {
    goToNextQuestion: PropTypes.func,
    question: questionType,
    form: PropTypes.object
}
