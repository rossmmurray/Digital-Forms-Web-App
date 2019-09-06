import React, { useState, useEffect } from 'react';
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
import { MHSnackbar } from './notify'


function NewQuestion(props) {
    const updateFlag = props.question ? true : false;
    const answerTypeOptions = [
        { value: 'free', displayText: 'Free Text' },
        { value: 'boolean', displayText: 'True/False' },
        { value: 'option', displayText: 'Options' },
        { value: 'date', displayText: 'Date' },
        { value: 'number', displayText: 'Number' },
        { value: 'service', displayText: 'Service (User Endpoint)' },

    ]


    // state management
    const [unsavedQuestion, setUnsavedQuestionField] = useState(props.question || { answerOptions: [{ optionName: '', questionLink: '' }] })
    const [allQuestions, setAllQuestions] = useState(props.allQuestions || [])
    const [open, setOpen] = useState(false)
    const [snackbarConfig, setSnackbarConfig] = useState({ message: "", variant: "success" })

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        // if component is passed questions, don't re-retrieve
        if (props.allQuestions) {
            return;
        }
        getQuestions().then(questions => {
            if (questions.length > 0) {
                const displayQuestions = getQuestionsDropdown(questions)
                setAllQuestions(displayQuestions)
            }
        })
    }, [])

    const updateField = (value, propertyToUpdate) => {
        // if optionType is selected, add empty option unless it exists already
        if (propertyToUpdate === 'answerType') {
            if (value === 'option') {
                unsavedQuestion.answerOptions = [{ optionName: '', questionLink: '' }]
            } else if (value === 'boolean') {
                unsavedQuestion.answerOptions = [
                    { optionName: 'True', questionLink: '' },
                    { optionName: 'False', questionLink: '' }
                ]
            }
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

    const validateQuestion = question => {
        const errorArray = []

        if (typeof question.questionText === 'undefined' || ['', null].includes(question.questionText)) {
            errorArray.push("You must enter question text!")
        }

        // must link to new question
        if (['option', 'boolean'].includes(question.answerType)) {
            if (question.answerOptions.length < 1) {
                errorArray.push("You must enter at least one option with link.")
            }
        } else {
            if (typeof question.nextQuestion === 'undefined' || question.nextQuestion === null) {
                errorArray.push("You must enter the next question!")
            }
        }

        // if there are errors, notify and return false
        if (errorArray.length > 0) {
            const errorMessages = errorArray.join('\n ')
            setSnackbarConfig({ message: errorMessages, variant: 'error' })
            setOpen(true)
            return false;
        } else {
            return true;
        }
    }

    const saveQuestionToDB = async (question) => {
        let successResponse = '';
        let errorMessage = '';

        // remove empty options
        if (question.answerOptions) {
            question.answerOptions = question.answerOptions.filter(option => option.questionLink !== '')
        }

        // exit if you can't validate question
        if (!validateQuestion(question)) {
            return;
        }

        try {
            if (updateFlag) {
                successResponse = await saveExistingQuestionToDB(question);
            } else {
                successResponse = await saveNewQuestionToDB(question);
            }
            setSnackbarConfig({ message: successResponse, variant: 'success' })
            setOpen(true)
            if (typeof props.parentRefresh == 'function') {
                props.parentRefresh()
            }
        } catch (error) {
            errorMessage = error.message ? error.message : error;
            setSnackbarConfig({ message: errorMessage, variant: 'error' })
            setOpen(true)
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
                throw new Error(err.data.error.message)
            } else {
                throw new Error(err)
            }
        }
    };

    const title = () => unsavedQuestion.answerType === 'service' ? 'Service' : 'Question'
    const textLabel = () => unsavedQuestion.answerType === 'service' ? 'Service Name' : 'Question Text'


    return (
        <MHCard raised={true}>
            <Box m={2} mr={1}>
                <h3>{title()}</h3>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <MHTextField
                            label={textLabel()}
                            onChange={(e) => updateField(e.target.value, 'questionText')}
                            value={unsavedQuestion.questionText}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <MHSelectField
                            onChange={(e) => updateField(e.target.value, 'answerType')}
                            label="Type"
                            value={unsavedQuestion.answerType || ''}
                            options={answerTypeOptions}
                            fullWidth={true}
                        />
                    </Grid>
                </Grid>

                {/* if the question is option then show options, Show next question if not. If blank show nothing. */}
                {['option', 'boolean'].includes(unsavedQuestion.answerType) ?
                    <AnswerOptions
                        question={unsavedQuestion}
                        updateAnswerOption={updateAnswerOption}
                        allQuestions={allQuestions}
                    />
                    : null
                }

                {['free', 'number', 'date'].includes(unsavedQuestion.answerType) ?
                    <div>
                        <h3>Following Question</h3>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <MHSelectField
                                    onChange={(e) => updateField(e.target.value, 'nextQuestion')}
                                    label="Choose next question"
                                    value={unsavedQuestion.nextQuestion || ''}
                                    options={allQuestions}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    : null
                }

                {['service'].includes(unsavedQuestion.answerType) ?
                    <div>
                        <h3>Service HTML</h3>
                        <MHTextField
                            onChange={(e) => updateField(e.target.value, 'serviceHtml')}
                            label="Enter simple text or HTML"
                            value={unsavedQuestion.serviceHtml || ''}
                            fullWidth={true}
                            rows={10}
                        />
                    </div>
                    : null
                }

                <Box mb={2} mt={1}
                // mt={-4}
                >
                    <Button size={"large"} variant="contained" onClick={() => saveQuestionToDB(unsavedQuestion)} color={"primary"}>Save</Button>
                </Box>
            </Box>
            <MHSnackbar
                open={open}
                onClose={handleClose}
                {...snackbarConfig}
            />
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
