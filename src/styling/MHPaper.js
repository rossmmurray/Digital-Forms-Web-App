import Paper from '@material-ui/core/Paper'
import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 2),
        margin: theme.spacing(2, 0)
    },
}));

export const MHPaper = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.root}>
                {props.children}
            </Paper>
        </div>

    )
}