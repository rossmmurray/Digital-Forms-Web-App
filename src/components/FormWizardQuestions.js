import React, { useState, useEffect } from 'react';
import { RadioQuestion } from './questionTypes/RadioQuestion';
import { DateQuestion } from './questionTypes/DateQuestion';
import { questionType } from '../propTypes/propTypes'
import PropTypes from 'prop-types';
import { FreeQuestion } from './questionTypes/FreeQuestion';
import { NumberQuestion } from './questionTypes/NumberQuestion';
import { Service } from './questionTypes/Service';
import { Button } from '@material-ui/core';


const components = {
    option: RadioQuestion,
    free: FreeQuestion,
    boolean: RadioQuestion,
    date: DateQuestion,
    number: NumberQuestion,
    service: Service
}

// function to choose the right component type
const QuestionType = props => {
    const questionType = props.question.answerType
    const SpecificQuestionType = components[questionType]
    return <SpecificQuestionType {...props} />
}

const getDefaultInput = question => {
    if (['option', 'boolean'].includes(question.answerType)) {
        const option = question.answerOptions[0]
        return { answer: { value: option.optionName, id: option._id }, nextQuestion: option.questionLink }
    } else {
        return { answer: { value: ''}, nextQuestion: question.nextQuestion }
    }
}

export const FormWizardQuestions = props => {

    // find first question
    const firstQuestion = props.questions.find(question => props.form.firstQuestion === question._id)
    const blankInput = getDefaultInput(firstQuestion)

    // state
    const [currentQuestion, setCurrentQuestion] = useState(firstQuestion)
    const [currentUserInput, setCurrentUserInput] = useState(blankInput)

    const goToNextQuestion = () => {
        if (typeof currentUserInput.nextQuestion === 'undefined') {
            console.log("finished")
            props.completeForm();
        } else {
            const nextQuestion = props.questions.find(question => question._id === currentUserInput.nextQuestion)
            console.log(nextQuestion)
            setCurrentUserInput(blankInput)
            setCurrentQuestion(nextQuestion)
            setCurrentUserInput(getDefaultInput(nextQuestion))
        }

    }

    const updateInput = answer => {
        console.log(answer)
        setCurrentUserInput(answer)
    }

    useEffect(() => {
        console.log("run")
        setCurrentQuestion(firstQuestion)
        setCurrentUserInput(getDefaultInput(firstQuestion))
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
            <br />
            {currentQuestion.answerType === 'service' ? null : <Button align="right" variant="contained" color="primary" onClick={goToNextQuestion}>Next Question</Button>}
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
