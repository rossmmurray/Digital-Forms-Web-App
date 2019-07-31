import React from 'react';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';


export const SingleAnswerOption = (props) => {

    return (
        <div>
             <MHTextField
                label="Answer"
                onChange={(e) => props.updateField(e.target.value, "answerOptions" )}
                value={props.answerOption.optionName}
            />
               <MHTextField
                label="Question Link"
                onChange={(e) => props.updateField(e.target.value, "answerOptions" )}
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
    parentRefresh: PropTypes.func,
    updateField: PropTypes.func
};
