import React, { useEffect, useState } from 'react';
import { getQuestions, deleteQuestion } from '../helper/ApiDataFunctions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import RefreshIcon from '@material-ui/icons/Refresh'
import NewQuestion from './NewQuestion';
import { getQuestionsDropdown } from '../helper/DataTransformFunctions'
import AddCircle from '@material-ui/icons/AddCircle'
import { MHPaper } from '../styling/MHPaper'
import { MHCard } from '../styling/MHCard'


const ShowQuestions = () => {
    const [visibleQuestionsArray, setVisibleQuestionsArray] = useState([])
    const [newQuestionWrapper, setNewQuestionWrapper] = useState(<div></div>)
    const [editQuestionId, setEditQuestionId] = useState(null)
    const [newQuestionFlag, setNewQuestionFlag] = useState(false)

    const refreshData = async () => {
        const allQuestions = await getQuestions();
        setVisibleQuestionsArray(allQuestions);
        setNewQuestionFlag(false);
    }

    const showEditQuestion = question => {
        const questionsDropdownData = getQuestionsDropdown(visibleQuestionsArray)

        const myProps = {
            question: question,
            parentRefresh: refreshData,
            parentStopEdit: stopEditingQuestion,
            allQuestions: questionsDropdownData
        }
        setNewQuestionWrapper(<NewQuestion {...myProps} />)
        setEditQuestionId(question._id)
        refreshData();
    }

    const stopEditingQuestion = () => {
        setEditQuestionId(null);
    }

    // empty array as 2nd argument means it only runs on first render
    useEffect(() => {
        refreshData();
    }, []);

    const deleteQuestionFromPage = async (questionId) => {
        await deleteQuestion(questionId);
        refreshData();
    }

    const showNewQuestion = () => {
        setNewQuestionFlag(true);
    }

    const EditQuestionRow = (props) => {
        const question = props.questionObject;
        return <div>
            <ListItem >
                <ListItemText
                    primary={question.questionText}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Edit" onClick={() => showEditQuestion(question)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="Delete" onClick={() => deleteQuestionFromPage(question._id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    }

    return (
        <div>
            <MHPaper>
                <h1 style={{ display: "inline" }}>Edit Questions</h1>
                <div style={{ display: "inline" }} align="right">
                    <IconButton edge="end" aria-label="Delete" onClick={refreshData} >
                        <RefreshIcon />
                    </IconButton>
                </div>

                <List>
                    {visibleQuestionsArray.map(questionObject =>
                        <div key={questionObject._id}>

                            <MHCard raised={(questionObject._id === editQuestionId)}>
                                {(questionObject._id === editQuestionId) ?
                                    newQuestionWrapper
                                    :

                                    <EditQuestionRow questionObject={questionObject} />

                                }
                            </MHCard>

                        </div>
                    )}

                    {/* part which shows new question */}
                    {newQuestionFlag ?
                        <NewQuestion parentRefresh={refreshData} />
                        :
                        <ListItem>
                            <div>
                                <br />
                                <ListItemText primary="" />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="Add New Question" onClick={() => showNewQuestion()}>
                                        <AddCircle />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </div>
                        </ListItem>
                    }

                </List>

            </MHPaper>
        </div>
    )
}

export default ShowQuestions;

