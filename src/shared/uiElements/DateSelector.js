import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './DatePicker_Model.css';
import Modal from './Modal';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '& > *': {
            margin: theme.spacing(1),
        },
    },
    buttonHover: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#86af49"
        },
        "&:active":{
            backgroundColor: "#86af49"
        }
    }
}));
const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}


export function DateSelectorButtonGroup({ dateSelector, currentDate, setCurrentDate, display }) {
    const classes = useStyles();
    const [RangeDisplay, setRangeDisplay] = React.useState(false);
    const [range, setRange] = React.useState({ startDate: dateSelector[0].days, endDate: undefined });
    const handleSelect = (ranges) => {
        setCurrentDate(ranges.selection)
        setRange(ranges.selection)

    }
    const handleClose = () => {
        setRangeDisplay(false)
    }
    const handleChange = (event) => {

        const tempDate = dateSelector.find(d => (d.key === (event.target.innerText).toLowerCase()))
        if (tempDate.days === 0) {
            setRangeDisplay(true)
        } else {
            let result = { startDate: tempDate.days, endData: undefined };
            setCurrentDate(result);
        }
    };
    if (RangeDisplay) {
        return (
            <Modal
                show={RangeDisplay}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                header={`Current date: ${new Date(range.startDate).toDateString()} - ${new Date(range.endDate).toDateString()}`}
                footer={<Button onClick={handleClose}>CLOSE</Button>}
            >
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                />
            </Modal>
        )
    }


    if (!display) {
        return (
            <div className={classes.root}>

                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    {dateSelector.map(d => (
                        <Button className={classes.buttonHover}  onClick={handleChange} key={d.key}>{d.key}</Button>
                    ))}

                </ButtonGroup>


            </div>
        );
    }
    return <React.Fragment></React.Fragment>
}