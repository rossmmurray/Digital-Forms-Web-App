/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getQuestions } from '../helper/ApiDataFunctions';
import { MHPaper } from '../styling/MHPaper'
import { MHSnackbar } from './notify'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 2)
    },
}));


export const FormManagement = () => {
    const classes = useStyles();

    const snackbarConfig = {
        message: "User update saved to database.",
        variant: "success"
    }
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false);
    }

    const [allQuestions, setAllQuestions] = useState([])
    const [formData, setFormData] = useState([
        { formTitle: 'Triage study One', firstQuestion: { _id: '434980' }, name: "what is your gender" },
        { formTitle: 'Triage study One', firstQuestion: { _id: '434980' }, name: "what is your gender" },
    ]);


    useEffect(() => {
        getQuestions().then(res => {
            setAllQuestions(res)
        })
    }, [])


    return (
        <div className={classes.root}>
            <MHPaper >
                <h1>Form Management</h1>
                {allQuestions.map(question =>
                    <div key={question._id} >
                        <h3>{question.questionText}</h3>
                    </div>
                )}
            </MHPaper>
            <MHSnackbar
                open={open}
                onClose={handleClose}
                {...snackbarConfig}
            />
        </div>
    )
}