import React from 'react';
import { MHSelectField, MHTextField } from './Fields'
import PropTypes from 'prop-types';
import { questionType, answerOptionType } from '../propTypes/propTypes';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

// shows single answer option and related next question link
export const SingleAnswerOption = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <MHTextField
                        label="Option Name"
                        onChange={(e) => props.updateAnswerOption(props.optionIndex, e.target.value, 'optionName')}
                        value={props.answerOption.optionName}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs>
                    <MHSelectField
                        onChange={(e) => props.updateAnswerOption(props.optionIndex, e.target.value, 'questionLink')}
                        label="Question Link"
                        value={props.answerOption.questionLink}
                        options={props.allQuestions}
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton edge="end" aria-label="Delete Option" onClick={() => props.deleteAnswerOption(props.optionIndex)}  >
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
        // 
    )
}

SingleAnswerOption.propTypes = {
    answerOption: answerOptionType,
    optionIndex: PropTypes.number,
    updateAnswerOption: PropTypes.func,
    allQuestions: PropTypes.arrayOf(questionType),
    deleteAnswerOption: PropTypes.func
};
