import React from 'react';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';
import { SingleAnswerOption } from './SingleAnswerOption'


export const AnswerOptions = (props) => {
    // todo: see below
    // put functions etc in here to update answer options
    // put new function (inside or use state) within updateField
    // new function must push on
    

    const ExistingOptions = () => {
        console.log(props.question.answerOptions)
        return (
            <div>
                {props.question.answerOptions.map( (answerOption, optionIndex) => 
                    <div key={answerOption._id}>
                        <SingleAnswerOption answerOption={answerOption} optionIndex={optionIndex} updateAnswerOption={props.updateAnswerOption}/>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div>
            {/* AnswerOptions Component */}
            {props.question.answerOptions ? ExistingOptions() : null}
        </div>
    )
}


AnswerOptions.propTypes = {
    question: PropTypes.shape({
        questionText: PropTypes.string,
        answerType: PropTypes.string,
        _id: PropTypes.string,
        answerOptions: PropTypes.arrayOf(PropTypes.shape({
            optionName: PropTypes.string,
            questionLink: PropTypes.string
        }))
    }),
    parentRefresh: PropTypes.func,
    updateAnswerOption: PropTypes.func
};
