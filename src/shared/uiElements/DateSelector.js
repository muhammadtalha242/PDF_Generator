import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

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
const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}


export function DateSelectorButtonGroup({ dateSelector, currentDate, setCurrentDate }) {
    const classes = useStyles();
    const [display, setDisplay] = React.useState(false);
    const [range, setRange] = React.useState({ startDate: dateSelector[0].days, endDate: undefined }); 
    const handleSelect = (ranges) => {
        console.log("Range ", ranges);
        setRange(ranges)
        setDisplay(false)
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    }
    const handleChange = (event) => {

        const tempDate = dateSelector.find(d => (d.key === (event.target.innerText).toLowerCase()))

        console.log(tempDate.days === 0)
        if (tempDate.days === 0) {
            setDisplay(!display)
        }
        let result = { startDate: tempDate.days, endData: undefined };
        setCurrentDate(result);

    };
    if (display) {
        return (<DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
        />)
    }

    return (
        <div className={classes.root}>

            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                {dateSelector.map(d => (
                    <Button onClick={handleChange}  key={d.key}>{d.key}</Button>
                ))}

            </ButtonGroup>


        </div>
        );

}