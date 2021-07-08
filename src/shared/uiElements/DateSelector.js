import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));




export function DateSelectorButtonGroup({ dateSelector, currentDate, setCurrentDate }) {
    const classes = useStyles();

    const handleChange = (event) => {
        const tempDate = dateSelector.find(d => (d.key === (event.target.innerText).toLowerCase()))
    
        let result={startDate: tempDate.days, endData:undefined};
        setCurrentDate(result);
    };
    return (
        <div className={classes.root}>

            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                {dateSelector.map(d => (
                    <Button onClick={handleChange} key={d.key}>{d.key}</Button>
                ))}

            </ButtonGroup>
        </div>
    );
}