import React from 'react';
import { questionType } from '../../propTypes/propTypes'
import PropTypes from 'prop-types';


export const Service = props => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: props.question.serviceHtml }} />
        </div>
    )
}

Service.propTypes = {
    updateInput: PropTypes.func,
    question: questionType,
    input: PropTypes.shape({
        answer: PropTypes.object,
        nextQuestion: PropTypes.string
    })
}