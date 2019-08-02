import React from 'react';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';


export const SingleAnswerOption = (props) => {
    return (
        <div>
            <MHTextField
                label="Option Name"
                onChange={(e) => props.updateAnswerOption(props.optionIndex, e.target.value, 'optionName')}
                value={props.answerOption.optionName}
            />
            <MHSelectField
                onChange={(e) => props.updateAnswerOption(props.optionIndex, e.target.value, 'questionLink')}
                label="Question Link"
                value={props.answerOption.questionLink}
                options={props.allQuestions}
            />
        </div>
    )
}

SingleAnswerOption.propTypes = {
    answerOption: PropTypes.shape({
        optionName: PropTypes.string,
        questionLink: PropTypes.string
    }),
    optionIndex: PropTypes.number,
    updateAnswerOption: PropTypes.func,
    allQuestions: PropTypes.array
};
