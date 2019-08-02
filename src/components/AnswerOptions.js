import React from 'react';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';
import { SingleAnswerOption } from './SingleAnswerOption'


export const AnswerOptions = (props) => {
    // todo: show all questions in dropdown

    const ExistingOptions = () => {
        return (
            <div>
                {props.question.answerOptions.map( (answerOption, optionIndex) => 
                    <div key={answerOption._id}>
                        <SingleAnswerOption 
                            answerOption={answerOption} 
                            optionIndex={optionIndex} 
                            updateAnswerOption={props.updateAnswerOption}
                            allQuestions={props.allQuestions}
                            />
                      
                    </div>
                )}
            </div>
        )
    }

    return (
        <div>
            {props.question.answerOptions && props.question.answerOptions.length > 0 ? ExistingOptions() : null}
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
    updateAnswerOption: PropTypes.func,
    allQuestions: PropTypes.array
};
