import React from 'react';
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


// TODO: change this to a class based component
class ShowQuestions extends React.Component {
    state = {
        visibleQuestions: '',
        dense: false,
        secondary: false,
        visibleQuestionsArray: [],
        editQuestionsComponent: <div></div>,
        editQuestionId: null
    }

    refreshData = async () => {
        const allQuestions = await getQuestions();
        const questionSublist = allQuestions.slice(0, 10);
        this.setState({ visibleQuestionsArray: questionSublist });
        // this.setState({editQuestionId: null});
        // const questions = questionSublist.map(questionObject =>
        //     <li key={questionObject._id}>
        //         {questionObject.questionText}
        //     </li>
        // )
        // this.setState({ visibleQuestions: questions })
    }

    showEditQuestion(question) {
        const myProps = {
            question: question,
            parentRefresh: this.refreshData,
            parentStopEdit: this.stopEditingQuestion
        }
        this.setState({editQuestionsComponent: 
            <NewQuestion {...myProps}/>
        })
        this.setState({editQuestionId: question._id})
        this.refreshData();
    }

    // arrow function required since it's passed to child component 
    // and called (diff context so binding required)
    stopEditingQuestion = () => {
        this.setState({ editQuestionId: null })
    }

    componentDidMount() {
        this.refreshData();
    }
    
    // componentDidUpdate() {
    //     this.refreshData();
    // }

    deleteQuestionFromPage = async (questionId) => {
        await deleteQuestion(questionId);
        this.refreshData();

    }

    render() {
        return (
            <div>
                <h1>Edit Questions</h1>
                <IconButton edge="end" aria-label="Delete" onClick={this.refreshData}>
                    <RefreshIcon />
                </IconButton>
                <Grid container spaceing={2}>
                    <Grid item xs={12} md={6}>
                        <div>
                            <List>
                                {this.state.visibleQuestionsArray.map(questionObject =>
                                    <div key={questionObject._id}>
                                        <ListItem >
                                            <ListItemText
                                                primary={questionObject.questionText}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="Edit" onClick={() => this.showEditQuestion(questionObject)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="Delete" onClick={() => this.deleteQuestionFromPage(questionObject._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>

                                        </ListItem>
                                        <ListItem>
                                            {/* if questionObject._id === state.edit_question then show the below */}
                                            {/* {this.state.editQuestionsComponent} */}
                                            {(questionObject._id === this.state.editQuestionId) ? this.state.editQuestionsComponent : null}
                                        </ListItem>
                                    </div>
                                )}
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ShowQuestions;

