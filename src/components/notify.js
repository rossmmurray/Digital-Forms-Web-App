import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { green, red } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: red[600],
    }
}));

export const MHSnackbar = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Snackbar
                {...props}
              
                // className={classes.success}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                autoHideDuration={2000}
                ContentProps={{
                    'aria-describedby': 'message-id',
                    classes: {
                        root: classes[props.variant]
                    }
                }}
                // message={<span id="message-id">Note archived</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={props.onClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    );
}

MHSnackbar.propTypes = {
    variant: PropTypes.string,
    onClose: PropTypes.func
};