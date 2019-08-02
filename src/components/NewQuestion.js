import React, { useState, useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveQuestionRequestToApi, updateQuestionRequestToApi } from '../helper/ApiDataFunctions'
import Button from '@material-ui/core/Button';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';
import { AnswerOptions } from './AnswerOptions'


function NewQuestion(props) {
    const updateFlag = props.question ? true : false;
    const answerTypeOptions = [
        { value: 'free', displayText: 'Free Text' },
        { value: 'boolean', displayText: 'True/False' },
        { value: 'option', displayText: 'Options' },
        { value: 'date', displayText: 'Date' },
        { value: 'number', displayText: 'Number' },
    ]

    const [unsavedQuestion, setUnsavedQuestionField] = useState(props.question || {})

    const updateField = (value, propertyToUpdate) => {
        setUnsavedQuestionField({
            ...unsavedQuestion,
            [propertyToUpdate]: value
        });
    };

    const updateAnswerOption = (optionIndex, newValue, property) => {
        setUnsavedQuestionField({
            ...unsavedQuestion,
            answerOptions:
                unsavedQuestion.answerOptions.map((option, index) =>
                    index == optionIndex ? {...option, [property]: newValue} : option
                )
        })
    }

    const saveQuestionToDB = async (question) => {
        let successResponse = '';
        let errorMessage = '';
        try {
            if (updateFlag) {
                successResponse = await saveExistingQuestionToDB(question);
            } else {
                successResponse = await saveNewQuestionToDB(question);
            }
            NotificationManager.success(successResponse)
            if (typeof props.parentRefresh == 'function') {
                props.parentRefresh()
            }
        } catch (error) {
            errorMessage = error.message ? error.message : error;
            // console.error(error)
            NotificationManager.warning(errorMessage).catch((error) => {
                console.log(error)
            })
        }
    };

    const saveExistingQuestionToDB = async (question) => {
        // we have the id here but not when saving exisitng question
        const response = await updateQuestionRequestToApi(question._id, question).catch(error => {
            console.error(error)
            throw error;
        });
        if (response.success) {
            props.parentStopEdit();
            const successMessage = "Updated question: " + response.question.questionText;
            return successMessage;
        } else {
            const failureMessage = "Error: " + response.error.message;
            return failureMessage;
        }
    }

    const saveNewQuestionToDB = async (question) => {
        try {
            const savedQuestion = await saveQuestionRequestToApi(question);
            let successMessage = 'Saved new question: ' + savedQuestion.questionText;
            return successMessage;
        } catch (err) {
            if (err.data) {
                // console.error(err.data.error.messge)
                throw new Error(err.data.error.message)
            } else {
                // console.error(err)
                throw new Error(err)
            }
        }
    };

    return (
        <div>
            <MHTextField
                label="Question Text"
                onChange={(e) => updateField(e.target.value, 'questionText')}
                value={unsavedQuestion.questionText}
            />
            <MHSelectField
                onChange={(e) => updateField(e.target.value, 'answerType')}
                label="Answer Type"
                value={unsavedQuestion.answerType || ''}
                options={answerTypeOptions}
            />
            <br />
            <AnswerOptions question={unsavedQuestion} updateAnswerOption={updateAnswerOption} allQuestions={props.allQuestions}/>
            <Button variant="contained" onClick={() => saveQuestionToDB(unsavedQuestion)}>Save</Button>
            <NotificationContainer />
        </div>
    )
}

NewQuestion.propTypes = {
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
    parentStopEdit: PropTypes.func,
    allQuestions: PropTypes.array
};

export default NewQuestion;
