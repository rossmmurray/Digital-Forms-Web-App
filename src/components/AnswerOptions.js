import React from 'react';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';


export const AnswerOptions = (props) => {

    return (
        <div>
            <MHTextField
                label="Answer"
                onChange={(e) => console.log(e.target.value)}
                value="this is answer options"
            />
        </div>
    )
}

AnswerOptions.propTypes = {
    question: PropTypes.shape({
        questionText: PropTypes.string,
        answerType: PropTypes.string,
        _id: PropTypes.string
    }),
    parentRefresh: PropTypes.func
};
