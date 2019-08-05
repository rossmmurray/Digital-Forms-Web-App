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
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AddCircle from '@material-ui/icons/AddCircle'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 2),
        margin: theme.spacing(2, 0)
    },
}));

// TODO: change this to a class based component
const ShowQuestions = () => {
    // const initialQuestions = await getQuestions();
    const [visibleQuestionsArray, setVisibleQuestionsArray] = useState([])
    const [editQuestionsComponent, setEditQuestionsComponent] = useState(<div></div>)
    const [editQuestionId, setEditQuestionId] = useState(null)
    const [newQuestionFlag, setNewQuestionFlag] = useState(false)

    const classes = useStyles();

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
        setEditQuestionsComponent(<NewQuestion {...myProps} />)
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
        if (editQuestionId !== question._id) {
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

        } else {
            return null;
        }
    }

    return (
        <div>

            <Paper className={classes.root} >
                <h1 style={{ display: "inline" }}>Edit Questions</h1>
                <div style={{ display: "inline" }} align="right">
                    <IconButton edge="end" aria-label="Delete" onClick={refreshData} >
                        <RefreshIcon />
                    </IconButton>
                </div>
                <div>
                    <List>
                        {visibleQuestionsArray.map(questionObject =>
                            <div key={questionObject._id}>
                                <Divider />
                                {/* todo: so if statement is here */}
                                <EditQuestionRow questionObject={questionObject} />
                                <ListItem>
                                    {(questionObject._id === editQuestionId) ? editQuestionsComponent : null}
                                </ListItem>
                            </div>
                        )}

                        <Divider />
                        <ListItem>
                            {newQuestionFlag ? <NewQuestion parentRefresh={refreshData} /> :
                            <div>
                                <br/>
                                <ListItemText primary=""/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="Add New Question" onClick={() => showNewQuestion()}>
                                        <AddCircle />
                                    </IconButton>
                                </ListItemSecondaryAction>
                                </div>
                            }

                        </ListItem>
                    </List>


                </div>

            </Paper>
        </div>
    )

}

export default ShowQuestions;

