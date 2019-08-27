import React, { useState, useEffect } from 'react';
import { RadioQuestion } from './questionTypes/RadioQuestion';
import { questionType } from '../propTypes/propTypes'
import PropTypes from 'prop-types';
import { FreeQuestion } from './questionTypes/FreeQuestion';


const components = {
    option: RadioQuestion,
    free: FreeQuestion
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

    const goToNextQuestion = nextQuestionId => {
        const nextQuestion = props.questions.find(question => question._id === nextQuestionId)
        setCurrentQuestion(nextQuestion)
    }

    useEffect(() => {
        setCurrentQuestion(firstQuestion)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.form._id])

    return (
        <div>
            <h2>{currentQuestion.questionText}</h2>
            <QuestionType goToNextQuestion={goToNextQuestion} question={currentQuestion} form={props.form} />
        </div>
    )
}

FormWizardQuestions.propTypes = {
    questions: PropTypes.arrayOf(questionType),
    form: PropTypes.object
}

QuestionType.propTypes = {
    goToNextQuestion: PropTypes.func,
    question: questionType,
    form: PropTypes.object
}
