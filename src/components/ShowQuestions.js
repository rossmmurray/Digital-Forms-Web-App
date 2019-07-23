import React from 'react';
import { getQuestions } from '../helper/ApiDataFunctions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'


function generate(element) {
    return [0, 1, 2, 3, 4].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

// TODO: change this to a class based component
class ShowQuestions extends React.Component {
    state = {
        visibleQuestions: '',
        dense: false,
        secondary: false,
        visibleQuestionsArray: []
    }

    async componentDidMount() {
        const allQuestions = await getQuestions();
        const questionSublist = allQuestions.slice(0, 10);
        this.setState({visibleQuestionsArray: questionSublist});
        const questions = questionSublist.map(questionObject =>
            <li key={questionObject._id}>
                {questionObject.questionText}
            </li>
        )
        this.setState({ visibleQuestions: questions })
    }

    render() {
        return (
            <div>
                <h1>Show Questions Component</h1>
                <Grid container spaceing={2}>
                    <Grid item xs={12} md={6}>
                        <div>
                            <List>
                                {this.state.visibleQuestionsArray.map(questionObject => 
                                    <ListItem key={questionObject._id}>
                                        <ListItemText
                                            primary={questionObject.questionText}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="Delete">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="Delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>,
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

