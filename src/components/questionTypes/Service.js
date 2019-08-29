import React from 'react';
import { questionType } from '../../propTypes/propTypes'
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        fullWidth: true

    },
    textField: {
        // marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
        // width: 200,
    }
}));


export const Service = props => {
    const classes = useStyles()
    console.log(props.question.serviceHtml)

    return (
        <div>

            <div dangerouslySetInnerHTML={{ __html: props.question.serviceHtml }} />
            
        </div>
    )
}

Service.propTypes = {
    updateInput: PropTypes.func,
    question: questionType,
    input: PropTypes.shape({
        answer: PropTypes.object,
        nextQuestion: PropTypes.string
    })
}