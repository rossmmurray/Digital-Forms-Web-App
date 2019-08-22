import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import { getFormsFromAPI } from '../helper/ApiDataFunctions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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


export default function ButtonAppBar() {
    const classes = useStyles();

    const [forms, setForms] = useState([])
    const [menuAnchor, setMenuAnchor] = useState(null)

    useEffect(() => {
        getFormsFromAPI().then(forms => {
            setForms(forms)
        })
    })

    const handleFormsClick = event => {
        console.log('clicked')
        setMenuAnchor(event.currentTarget)
    }

    const handleClose = event => {
        setMenuAnchor(null)
    }

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
                    <Button component={Link} to={"/admin/manageForms"} color="inherit">
                        Manage Forms
                    </Button>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleFormsClick} color="inherit">
                        Forms
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={menuAnchor}
                        keepMounted
                        open={Boolean(menuAnchor)}
                        onClose={handleClose}
                    >
                        {forms.map(form =>
                            <MenuItem component={Link} to={"/form/" + form._id} key={form._id} onClick={handleClose}>{form.title}</MenuItem>
                        )}

                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}