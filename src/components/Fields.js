import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        // margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 250,
    },
}));

export const MHTextField = (props) => {
    // turn label into id
    const label = props.label;
    const labalId = label.toLowerCase().replace(" ", "-");

    return (
        <TextField
            id={labalId}
            multiline
            variant="outlined"
            {...props}
        />
    )
}

export const MHSelectField = (props) => {
    // turn label into id
    const label = props.label;
    const labalId = label.toLowerCase().replace(" ", "-");
    const classes = useStyles();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor={labalId}>{label}</InputLabel>
            <Select
                // must be set to native = true so real options elements can be used (for testing)
                native={true}
                id={labalId}
                input={<OutlinedInput labelWidth={labelWidth} id={labalId} />}
                value={props.value}
                onChange={props.onChange}
            >
                <option value="" disabled></option>
                {   
                    // render passed options
                    props.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.displayText}</option>
                })}
            </Select>
        </FormControl>
    )
}

