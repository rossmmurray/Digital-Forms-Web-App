import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: "bold",
        fontStyle: "italic"
    },
}));

;

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    NHS
                    </Typography>
                    <Button component={Link} to={"/admin/newQuestion"} color="inherit">
                        Add Question
                    </Button>
                    <Button component={Link} to={'/editQuestions'} color="inherit">
                        Edit Questions
                    </Button>

                    <Button component={Link} to={"/Login"} color="inherit">
                        Login
                    </Button>
                    <Button component={Link} to={"/admin/userManagement"} color="inherit">
                        Users
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}