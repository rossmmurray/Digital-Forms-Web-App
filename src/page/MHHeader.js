import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

    const drawer = (
        <div>
            <div className={classes.toolbar} >
                <Typography align='center' variant="h3" color='primary' className={classes.title}>NHS</Typography>
                {/* <IconButton onClick={handleDrawerToggle} >
                    <MenuIcon />
                </IconButton> */}
            </div>
            <Divider />
            <List>
                {routes.map(route => (
                    <ListItem button component={Link} to={route.path} key={route.path}>
                        <ListItemIcon><route.icon /></ListItemIcon>
                        <ListItemText primary={route.name} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            {/* <ListItem><ListItemText>Forms</ListItemText></ListItem> */}
            <List >
                <ListSubheader >Forms</ListSubheader>
                {forms.map(form =>
                    <ListItem button key={form._id} component={Link} to={"/form/" + form._id} onClick={handleClose}>
                        <ListItemIcon><Toc/></ListItemIcon>
                        <ListItemText primary={form.title} />
                    </ListItem>
                )}
            </List>
        </div>
    );


    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} >
                <Toolbar>
                    <IconButton onClick={handleDrawerToggle} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.subtitle}>
                        Digital Service
                    </Typography>
                    <Button component={Link} to={"/Login"} color="inherit">
                        Login
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
            <Toolbar />

            <div className={classes.root}>
                <nav className={classes.drawer} aria-label="mailbox folders">

                    {/* hidden on larger screens */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            variant="temporary"
                            // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>

                    {/* hidden on mobile i.e. xs size and down */}
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
            </div>


        </div>
    );
}