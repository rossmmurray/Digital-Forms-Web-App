/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getQuestions, postFormToAPI, getFormsFromAPI } from '../helper/ApiDataFunctions';
import { MHPaper } from '../styling/MHPaper'
import { MHSnackbar } from './notify'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ViewList from '@material-ui/icons/ViewList'

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
    const [formData, setFormData] = useState([]);   

    useEffect(() => {
        getQuestions().then(questions => {
            setAllQuestions(questions)
        })
        getFormsFromAPI().then(forms => {
            setFormData(forms)
        })
    }, [])

    const handleChange = (param) => {
        console.log(param)
    }

    return (
        <div className={classes.root}>
            <MHPaper >
                <h1>Form Management</h1>
                <List component="nav" aria-label="users list">
                    {formData.map((form, index) =>
                        <div key={index}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ViewList />
                                </ListItemIcon>
                                <ListItemText primary={form.title} />
                                <Select
                                    value={form.firstQuestion}
                                    onChange={handleChange(index)}
                                >
                                    {allQuestions.map(question =>
                                        <div key={question._id}>
                                            <MenuItem value={question._id}>{question.questionText}</MenuItem>
                                        </div>
                                        )}
                                </Select>
                            </ListItem>
                        </div>
                    )}
                </List>


            </MHPaper>
            <MHSnackbar
                open={open}
                onClose={handleClose}
                {...snackbarConfig}
            />
        </div>
    )
}