import React, { useState, useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { saveQuestionRequestToApi, updateQuestionRequestToApi } from '../helper/ApiDataFunctions'
import Button from '@material-ui/core/Button';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';
import { AnswerOptions } from './AnswerOptions'
import { questionType } from '../propTypes/propTypes'
import { getQuestions } from '../helper/ApiDataFunctions'
import { getQuestionsDropdown } from '../helper/DataTransformFunctions'
import Grid from '@material-ui/core/Grid';
import { MHCard } from '../styling/MHCard'
import Box from '@material-ui/core/Box';


// const components = {
//     option: AnswerOptions,
//     date: AnswerOptions,
//     number: AnswerOptions,
//     boolean: AnswerOptions,
//     free: AnswerOptions
// }

// // function to choose the right component type
// const AnswerType = props => {
//     console.error(props)
//     const questionType = props.question.answerType
//     const SpecificQuestionType = components[questionType]
//     return <SpecificQuestionType {...props} />
// }

function NewQuestion(props) {
    const updateFlag = props.question ? true : false;
    const answerTypeOptions = [
        { value: 'free', displayText: 'Free Text' },
        { value: 'boolean', displayText: 'True/False' },
        { value: 'option', displayText: 'Options' },
        { value: 'date', displayText: 'Date' },
        { value: 'number', displayText: 'Number' },
    ]

    const [unsavedQuestion, setUnsavedQuestionField] = useState(props.question || { answerOptions: [{optionName: '', questionLink: ''}] })
    const [allQuestions, setAllQuestions] = useState([])

    useEffect(() => {
        getQuestions().then(questions => {
            const displayQuestions = getQuestionsDropdown(questions)
            setAllQuestions(displayQuestions)
        })
    }, [])

    const updateField = (value, propertyToUpdate) => {
        // if optionType is selected, add empty option unless it exists already
        if (propertyToUpdate === 'answerType' && value === 'option' && (unsavedQuestion.answerOptions.length < 1 )) {
                unsavedQuestion.answerOptions.push({optionName: '', questionLink: ''})
        }
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
                    index === optionIndex ? { ...option, [property]: newValue } : option
                )
        })
    }

    // const update

    const saveQuestionToDB = async (question) => {
        let successResponse = '';
        let errorMessage = '';

        // remove empty options
        if (question.answerOptions) {
            question.answerOptions = question.answerOptions.filter(option => option.questionLink != '')
        }

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
            NotificationManager.warning(errorMessage)
        }
    };



    const saveExistingQuestionToDB = async (question) => {
        // we have the id here but not when saving exisitng question
        try {
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
        } catch (error) {
            throw new Error(error)
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
        <MHCard raised={true}>
            <h3>Question</h3>
            <Grid container spacing={3}>
                <Grid item xs>
                    <MHTextField
                        label="Question Text"
                        onChange={(e) => updateField(e.target.value, 'questionText')}
                        value={unsavedQuestion.questionText}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MHSelectField
                        onChange={(e) => updateField(e.target.value, 'answerType')}
                        label="Answer Type"
                        value={unsavedQuestion.answerType || ''}
                        options={answerTypeOptions}
                        fullWidth={true}
                    />
                </Grid>
            </Grid>

            {/* if the question is option then show options, Show next question if not */}
            {unsavedQuestion.answerType === 'option' ?
                <AnswerOptions
                    question={unsavedQuestion}
                    updateAnswerOption={updateAnswerOption}
                    allQuestions={allQuestions}
                />
                :
                null
            }
            <Box mb={2}
            // mt={-4}
            >
                <Button variant="contained" onClick={() => saveQuestionToDB(unsavedQuestion)}>Save</Button>
            </Box>
            <NotificationContainer />
        </MHCard>

    )
}

NewQuestion.propTypes = {
    question: questionType,
    parentRefresh: PropTypes.func,
    parentStopEdit: PropTypes.func,
    allQuestions: PropTypes.arrayOf(questionType)
};

export default NewQuestion;
