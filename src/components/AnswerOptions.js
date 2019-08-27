import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SingleAnswerOption } from './AnswerSingleOption'
import { questionType } from '../propTypes/propTypes'
import AddCircle from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton';


export const AnswerOptions = (props) => {


    const [question, setQuestion] = useState(props.question)
    const optionsCheck = question.answerOptions && question.answerOptions.length > 0;

    const ExistingOptions = () => {
        return (
            <div>
                {question.answerOptions.map((answerOption, optionIndex) =>
                    <div key={optionIndex}>
                        <SingleAnswerOption
                            answerOption={answerOption}
                            optionIndex={optionIndex}
                            updateAnswerOption={props.updateAnswerOption}
                            allQuestions={props.allQuestions}
                            deleteAnswerOption={deleteAnswerOption}
                        />
                    </div>
                )}
            </div>
        )
    }

    // add new answer option
    const addOption = () => {

        const newQuestion = Object.assign({}, question)

        if (!newQuestion.answerOptions) {
            newQuestion.answerOptions = [];
        }
        newQuestion.answerOptions.push({ optionName: '', questionLink: '' })
        setQuestion(newQuestion)
    }

    const deleteAnswerOption = (optionIndex) => {
        const currentQuestion = Object.assign({}, question);
        currentQuestion.answerOptions.splice(optionIndex, 1);
        setQuestion(currentQuestion)
    }

    useEffect(() => {
        setQuestion(props.question)
    },[props.question])

    const addButton = () => {
        return (
            <IconButton edge="end" aria-label="Delete" onClick={addOption}>
                <AddCircle />
            </IconButton>
        )
    }

    return (
        <div>
            <h3>Answers</h3>
            {optionsCheck ? ExistingOptions() : null}
            <div align="right">
                {addButton()}
            </div>
        </div>
    )
}


AnswerOptions.propTypes = {
    question: questionType,
    parentRefresh: PropTypes.func,
    updateAnswerOption: PropTypes.func,
    allQuestions: PropTypes.arrayOf(questionType),
    deleteAnswerOption: PropTypes.func
};
