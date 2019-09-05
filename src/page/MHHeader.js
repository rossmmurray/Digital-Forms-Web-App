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
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import routes from '../routes/routes';
import { Toc } from '@material-ui/icons';
import { ListSubheader } from '@material-ui/core';


const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        fontWeight: 900,
        fontStyle: "italic"
    },
    subtitle: {
        flexGrow: 1,
        fontWeight: 200,
        // fontStyle: "italic"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    //   don't display menu button if small
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: {
        display: 'flex',
        backgroundColor: "primary",
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,

    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


export default function ButtonAppBar() {
    const classes = useStyles();

    const [forms, setForms] = useState([])
    const [menuAnchor, setMenuAnchor] = useState(null)
        // const theme = useTheme();
        const [mobileOpen, setMobileOpen] = React.useState(false);

        function handleDrawerToggle() {
            setMobileOpen(!mobileOpen);
        }

    useEffect(() => {
        getFormsFromAPI().then(forms => {
            setForms(forms)
        })
    }, [])

    const handleFormsClick = event => {
        console.log('clicked')
        setMenuAnchor(event.currentTarget)
    }

    const handleClose = () => {
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
                    <Button component={Link} to={"/answers"} color="inherit">
                        View Answers
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