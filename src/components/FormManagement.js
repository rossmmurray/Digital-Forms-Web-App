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
import Save from '@material-ui/icons/Save'
import { MHTextField, MHSelectField } from './Fields'
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

import IconButton from '@material-ui/core/IconButton';

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

    const handleChange = formID => event => {
        const indexOfItem = formData.findIndex(form => form._id == formID)
        const tempFormData = [...formData]
        tempFormData[indexOfItem] = {
            ...tempFormData[indexOfItem],
            [event.target.name]: event.target.value
        }
        setFormData(tempFormData)
        console.log(event.target.value)
    }

    // todo: speak about currying in the report, reference Chris Clack
    const saveForm = formID => event => {
        console.log('tried to save: ' + formID)
        console.log(event)
    }

    return (
        <div className={classes.root}>
            <MHPaper >
                <h1>Form Management</h1>
                <List component="nav" aria-label="form list">
                    {formData.map(form =>
                        <div key={form._id}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ViewList />
                                </ListItemIcon>
                                {/* <ListItemText primary={form.title} /> */}
                                <ListItemText>
                                    <MHTextField
                                        label='Form Title'
                                        onChange={handleChange(form._id)}
                                        name='title'
                                        value={form.title}
                                    />
                                </ListItemText>
                                {/* todo: [not loc]: why is api calls cheaper */}
                                <FormControl>
                                    <InputLabel>First Question</InputLabel>
                                    <Select
                                        label={'First Question'}
                                        value={form.firstQuestion}
                                        onChange={handleChange(form._id)}
                                        name={'firstQuestion'}
                                        placeholder='Pick the first question'
                                    >
                                        {allQuestions.map(question =>
                                            <MenuItem key={question._id} value={question._id}>{question.questionText}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <IconButton onClick={saveForm(form._id)}>
                                    <Save />
                                </IconButton>
                                {/* todo: change this to use your mh select field */}
                                {/* <MHSelectField
                                    label='firstQuestion'
                                    name='firstQuestion'
                                    options={all}
                                /> */}
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