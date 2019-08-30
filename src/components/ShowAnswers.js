/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getAnswersFromAPI } from '../helper/ApiDataFunctions';
import { MHPaper } from '../styling/MHPaper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 2)
    },
}));


export const ShowAnswers = () => {
    const classes = useStyles();

    const [allAnswers, setAllAnswers] = useState([])

    useEffect(() => {
        getAnswersFromAPI().then(answers => {
            // console.log(answers)
            const displayAnswers = answers.map(answer => {
                const timeObj = new Date(answer.updatedAt)
                const timeFormatted = timeObj.toDateString()
                console.log(timeFormatted)
                return {
                    user: answer.user.email,
                    form: answer.form.title,
                    question: answer.question.questionText,
                    answer: answer.value.answer.value,
                    id: answer._id,
                    time: timeFormatted
                }
            })
            setAllAnswers(displayAnswers)
        })
    }, [])

    return (
        <div className={classes.root}>
            <MHPaper >
                <h1>View User Answers</h1>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Question</TableCell>
                            <TableCell align="right">Form</TableCell>
                            <TableCell align="right">Answer</TableCell>
                            <TableCell align="right">Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allAnswers.map(answer => (
                            <TableRow key={answer.id}>
                                <TableCell component="th" scope="row">
                                    {answer.user}
                                </TableCell>
                                <TableCell align="right">{answer.form}</TableCell>
                                <TableCell align="right">{answer.question}</TableCell>
                                <TableCell align="right">{answer.answer}</TableCell>
                                <TableCell align="right">{answer.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </MHPaper>

        </div>
    )
}