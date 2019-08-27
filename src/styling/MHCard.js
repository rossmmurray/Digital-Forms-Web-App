import React from 'react'
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 2, 1, 2),
        margin: theme.spacing(2, 0)
    },
}));

export const MHCard = (props) => {
    const classes = useStyles();
    const raisedFlag = props.raised || false

    return (
        <div>
            <Card className={classes.root} raised={raisedFlag}>
                {props.children}
            </Card>
        </div>

    )
}