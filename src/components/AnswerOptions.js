import React from 'react';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';


export const AnswerOptions = (props) => {
    // todo: see below
    // put functions etc in here to update answer options
    // put new function (inside or use state) within updateField
    // new function must push on

    return (
        <div>
            <MHTextField
                label="Answer"
                onChange={(e) => props.updateField(e.target.value, "answerOptions" )}
                value="this is answer options"
            />
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
    updateField: PropTypes.func
};
