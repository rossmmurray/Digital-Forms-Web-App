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
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import routes from '../routes/routes';
import Toc from '@material-ui/icons/Toc'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { ListSubheader } from '@material-ui/core';
import { getUserFromLocalStorage } from '../helper/AuthFunctions';


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


export default function MHHeader(props) {
    const classes = useStyles();

    const [forms, setForms] = useState([])
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState(null)


    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    // run only on initial mount
    useEffect(() => {
        console.log('MHHeader useeffect ran')

        // get forms to show
        getFormsFromAPI().then(forms => {
            setForms(forms)
        })

        // check if user is logged in
        const user = getUserFromLocalStorage()
        setUser(user)
    }, [props.headerRenderTrigger])


    const drawer = (
        <div>
            <div className={classes.toolbar} >
                <Typography align='center' variant="h3" color='primary' className={classes.title}>NHS</Typography>
            </div>
            <Divider />
            <List>
                {routes.map(route =>
                    route.role.includes(user && user.role) &&
                    <ListItem button component={Link} to={route.path} key={route.path}>
                        <ListItemIcon><route.icon /></ListItemIcon>
                        <ListItemText primary={route.name} />
                    </ListItem>

                )}
            </List>
            <Divider />
            <List >
                <ListSubheader >Forms</ListSubheader>
                {forms.map(form =>
                    user &&
                    <ListItem button key={form._id} component={Link} to={"/form/" + form._id} >
                        <ListItemIcon><Toc /></ListItemIcon>
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
                    <Hidden xsDown implementation="css">
                        <Typography variant="h6" className={classes.subtitle}>
                            Digital Forms
                    </Typography>
                    </Hidden>

                    {user ? <Button component={Link} to={"/Login"} color="inherit">
                        {user.email} ({user.role})
                    </Button>
                        :
                        <Button component={Link} to={"/Login"} color="inherit">
                            Log in
                        </Button>
                    }
                    <IconButton component={Link} to={"/Login"} color="inherit" aria-label="Login">
                        <AccountCircle />
                    </IconButton>


                    {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleFormsClick} color="inherit">
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

                    </Menu> */}
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