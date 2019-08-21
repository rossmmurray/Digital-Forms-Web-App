import React, { useState, useEffect } from 'react';
import { MHPaper } from '../styling/MHPaper'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getUsers, updateUser } from '../helper/ApiDataFunctions';
import { MHSnackbar } from './notify'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
}));

export const UserManagement = () => {
    const classes = useStyles();
    const snackbarConfig = {
        message: "User update saved to database.",
        variant: "success"
    }

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(cbUsers => {
            setUsers(cbUsers)
        }).catch(error => {
            console.error(error)
        });
    }, [])

    const handleRoleChange = index => event => {
        const newUsers = [...users]
        newUsers[index].role = event.target.value

        // show notification if change saved to database
        updateUser(newUsers[index]).then(setOpen(true))
        setUsers(newUsers)
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <MHPaper>
                <h1>User Management</h1>
                <div className={classes.root}>
                    <List component="nav" aria-label="users list">
                        {users.map((user, index) =>
                            <div key={index}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={user.email} />
                                    <Select
                                        value={user.role}
                                        onChange={handleRoleChange(index)}
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
            <MHSnackbar
                open={open}
                onClose={handleClose}
                {...snackbarConfig}
            />
        </div>
    )
}