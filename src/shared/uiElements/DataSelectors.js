import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(6),
    },
    elementPadding: {
        padding: theme.spacing(6),
    }
}));



export default function DataSelect({ dataSetSelector, sensorChangeHandler }) {
    const classes = useStyles();
    const [currentSensor, setcurrentSensor] = React.useState(dataSetSelector[0].value);

    const handleChange = (event) => {
        setcurrentSensor(event.target.value);
        
    };
    React.useEffect(()=>{
        sensorChangeHandler(currentSensor)
    },[sensorChangeHandler,currentSensor])

    return (
        <div className={classes.selectEmpty}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="Sensor Selectors">Sensors</InputLabel>
                <Select
                    labelId="Sensor Selectors"
                    value={currentSensor}
                    onChange={handleChange}
                    label="Sensor"
                >
                    {
                        dataSetSelector.map(d => (
                            <MenuItem value={d.value} key={d.key}>{d.key}</MenuItem>
                        ))
                    }

                </Select>

            </FormControl>
        </div>
    );
}