import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(6),
    },
    elementPadding:{
        padding: theme.spacing(6),
    }
}));



export default function DataSelect({ currentSensor, setcurrentSensor, dataSetSelecots ,display, setDisplay }) {
    const classes = useStyles();

    const handleChange = (event) => {

        setcurrentSensor(event.target.value);
    };
    const clickHandler = (event) => {

        setDisplay(!display);
    };
    return (
        <div className={classes.selectEmpty}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Sensors</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={currentSensor}
                    onChange={handleChange}
                    label="Sensor"
                >
                    {
                        dataSetSelecots.map(d => (
                            <MenuItem value={d.value} key={d.key}>{d.key}</MenuItem>
                        ))
                    }

                </Select>
                <Button variant="outlined" color="primary"  onClick={clickHandler}>
                    {display? "View PDF Report" : "Back"}
                </Button>
            </FormControl>
        </div>
    );
}