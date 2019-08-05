import React, { useEffect, useState } from 'react';
import { getQuestions, deleteQuestion } from '../helper/ApiDataFunctions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import RefreshIcon from '@material-ui/icons/Refresh'
import NewQuestion from './NewQuestion';
import { getQuestionsDropdown } from '../helper/DataTransformFunctions'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 2),
        margin: theme.spacing(2, 0)
    },
}));

// TODO: change this to a class based component
const ShowQuestions = () => {
    const [visibleQuestionsArray, setVisibleQuestionsArray] = useState([])
    const [editQuestionsComponent, setEditQuestionsComponent] = useState(<div></div>)
    const [editQuestionId, setEditQuestionId] = useState(null)

    const classes = useStyles();

    const refreshData = async () => {
        const allQuestions = await getQuestions();
        setVisibleQuestionsArray(allQuestions);
    }

    // todo: get rid of visibleQuestionsArray
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

            <NewQuestion parentRefresh={refreshData} />
            <Paper className={classes.root} >
                <h1 style={{display: "inline"}}>Edit Questions</h1>
                <div style={{display: "inline"}} align="right">
                    <IconButton edge="end" aria-label="Delete" onClick={refreshData} >
                        <RefreshIcon />
                    </IconButton>
                </div>
                <div>
                    <List>
                        {visibleQuestionsArray.map(questionObject =>
                            <div key={questionObject._id}>
                                <Divider />
                                <EditQuestionRow questionObject={questionObject} />
                                <ListItem>
                                    {(questionObject._id === editQuestionId) ? editQuestionsComponent : null}
                                </ListItem>
                            </div>
                        )}
                    </List>
                </div>

            </Paper>
        </div>
    )

}

export default ShowQuestions;

