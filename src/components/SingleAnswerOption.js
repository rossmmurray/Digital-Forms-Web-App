import React from 'react';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';


export const SingleAnswerOption = (props) => {
    console.log(props)
    return (
        <div>
             <MHTextField
                label="Option Name"
                onChange={(e) => props.updateAnswerOption(props.optionIndex, e.target.value, 'optionName' )}
                value={props.answerOption.optionName}
            />
               <MHTextField
                label="Question Link"
                onChange={(e) => props.updateAnswerOption(props.optionIndex, e.target.value, 'questionLink')}
                value={props.answerOption.questionLink}
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
    updateAnswerOption: PropTypes.func
};
