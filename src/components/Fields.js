import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2),
    },
    input: {
        display: 'none',
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        fullWidth: true

    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        // marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
        // width: 200,
    }
}));


export const MHTextField = (props) => {
    // turn label into id
    const classes = useStyles();
    const label = props.label;
    const labalId = label.toLowerCase().replace(" ", "-");

    return (
        <TextField
            className={clsx(classes.textField, classes.formControl)}
            id={labalId}
            multiline
            variant="outlined"
            {...props}
        />
    )
}

export const MHSelectField = (props) => {
    // turn label into id
    const classes = useStyles();
    const label = props.label;
    const labalId = label.toLowerCase().replace(" ", "-");
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
            <InputLabel ref={inputLabel} htmlFor={labalId}>{label}</InputLabel>
            <Select
                // must be set to native = true so real options elements can be used (for testing)
                className={classes.textField}
                native={true}
                id={labalId}
                input={<OutlinedInput labelWidth={labelWidth} id={labalId} />}
                value={props.value}
                onChange={props.onChange}
                // autoWidth={true}
            >
                <option value="" disabled></option>
                {
                    // Render passed options
                    props.options.map(option => {
                        return <option key={option.value} value={option.value}>{option.displayText}</option>
                    })
                }
            </Select>
        </FormControl>
    )
}

// type checking props
MHSelectField.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        displayText: PropTypes.string
    })),
    value: PropTypes.string,
    onChange: PropTypes.func
}

MHTextField.propTypes = {
    label: PropTypes.string
}