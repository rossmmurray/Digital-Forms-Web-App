import React from 'react';
import { MHPaper } from '../styling/MHPaper'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import PersonIcon from '@material-ui/icons/Person'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
    },
}));

const usersArray = [{email: 'Ross', role: 'admin'}, {email: 'Jane', role: 'patient'}, {email: 'Emma', role: 'patient'}]


export const UserManagement = () => {
    const classes = useStyles();
    return (
        <div>
            <MHPaper>
                <h1>User Management</h1>
                <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                        {usersArray.map((user, index) =>
                            <div key={index}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={user.email}/>
                                    <Select
                                        value={user.role}
                                    >
                                        <MenuItem value={'admin'}>Admin</MenuItem>
                                        <MenuItem value={'patient'}>Patient</MenuItem>
                                        <MenuItem value={'clinician'}>Clinician</MenuItem>
                                    </Select>
                                </ListItem>
                                
                            </div>
                        )}


                    </List>
                </div>

            </MHPaper>
        </div>
    )
}