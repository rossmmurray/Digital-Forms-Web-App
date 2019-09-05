/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getQuestions, updateFormToAPI, getFormsFromAPI, deleteFormToAPI } from '../helper/ApiDataFunctions';
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
import { InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import AddCircle from '@material-ui/icons/AddCircle'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete'
import { getQuestionsDropdown } from '../helper/DataTransformFunctions';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 2)
    },
}));

export const FormManagement = props => {
    const classes = useStyles();

    const snackbarConfig = {
        message: "User update saved to database.",
        variant: "success"
    }
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false);
        props.reRenderHeader()
    }

    const [allQuestions, setAllQuestions] = useState([])
    const [allDisplayQuestions, setAllDisplayQuestions] = useState([])
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        getQuestions().then(questions => {
            setAllQuestions(questions)
            setAllDisplayQuestions(getQuestionsDropdown(questions))
        })
        getFormsFromAPI().then(forms => {
            setFormData(forms)
        })
    }, [])

    const handleChange = index => event => {
        const tempFormData = [...formData]
        tempFormData[index] = {
            ...tempFormData[index],
            [event.target.name]: event.target.value
        }
        setFormData(tempFormData)

    }

    // send a form to the backend API, then re-render header 
    const saveForm = form => event => {
        updateFormToAPI(form).then(() => {
            setOpen(true)
            // 
        }).catch(error => {
            console.error(error)
        })
    }

    const addForm = () => {
        const tempFormData = [...formData]
        tempFormData.push({ title: '', firstQuestion: '' })
        setFormData(tempFormData)
    }

    const deleteForm = form => event => {
        if (form._id) {
            deleteFormToAPI({ _id: form._id }).then(() => {
                props.reRenderHeader()
            })
        }
    }

    return (
        <div className={classes.root}>
            <MHPaper >
                <h1>Form Management</h1>

                <List component="nav" aria-label="form list">
                    {formData.map((form, index) =>
                        <div key={index}>
                            <ListItem >
                                <ListItemIcon>
                                    <ViewList />
                                </ListItemIcon>
                                <ListItemText>

                                    <Grid container spacing={3}>

                                    <Grid item sm={12} md={6}>
                                            <MHTextField
                                                label='Form Title'
                                                onChange={handleChange(index)}
                                                name='title'
                                                value={form.title}
                                                fullWidth={true}
                                            />
                                        </Grid>

                                    <Grid item sm={12} md={6}>

                                            <MHSelectField
                                                onChange={handleChange(index)}
                                                label="Choose next question"
                                                value={form.firstQuestion}
                                                options={allDisplayQuestions}
                                                // fullWidth={false}
                                            />
                                        </Grid>


                                    </Grid>

                                </ListItemText>


                                {/* <FormControl>
                                    <InputLabel>First Question</InputLabel>
                                    <Select
                                        label={'First Question'}
                                        value={form.firstQuestion}
                                        onChange={handleChange(index)}
                                        name={'firstQuestion'}
                                        placeholder='Pick the first question'
                                    >
                                        {allQuestions.map(question =>
                                            <MenuItem key={question._id} value={question._id}>{question.questionText}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl> */}

                                <IconButton aria-label="save form" onClick={saveForm(form)}><Save /></IconButton>

                                <IconButton onClick={deleteForm({ _id: form._id })}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        </div>
                    )}
                    <ListItem>
                        <ListItemSecondaryAction>
                            <IconButton align='right' onClick={addForm} aria-label='add form' >
                                <AddCircle />
                            </IconButton>

                        </ListItemSecondaryAction>
                    </ListItem>
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