import React, { useReducer, useCallback } from 'react';
import moment from 'moment'
import { addDays } from 'date-fns';
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
        "&:active": {
            backgroundColor: "#86af49"
        }
    }
}));

const dateReducer = (state, action) => {
    switch (action.type) {

        case "DECISION":
            const tempDate = action.tempDate;
            if (tempDate.days === 0) {
                let output = {
                    ...state,
                    isCustomDate: true
                }
                console.log(JSON.stringify(output))
                return (output)
            } else {

                let startData = moment().subtract(tempDate.days, tempDate.type)
                let result = { startDate: startData, endData: moment() };
                console.log(JSON.stringify(result))
                return ({
                    range: result,
                    isCustomDate: false

                });
            }
        // case "SELECT_NON_CUSTOM_DATE":

        //     break;
        // case "SHOW_CUSTOM_DATE":

        // break;
        case "CLOSE":
            console.log("state: ", state)
            return ({
                ...state.range,
                isCustomDate:action.isCustomDate

            });
        case "SELECT_CUSTOM_DATE":
            console.log("state: ", state)
            return ({
                ...state.isCustomDate,
                range: action.range,
                
            });
        default:
            return state;
    }
}


export function DateSelectorButtonGroup({ dateSelector, currentDate, setCurrentDate, display, updateGraph }) {
    const classes = useStyles();

    const [state, dispatch] = useReducer(dateReducer, {
        range: {
            startDate: new Date(),
            endDate: addDays(new Date(), 2),
            key: 'selection'
        },
        isCustomDate: false,
    })


    const [RangeDisplay, setRangeDisplay] = React.useState(false);
    const [range, setRange] = React.useState({
        startDate: new Date(),
        endDate: addDays(new Date(), 2),
        key: 'selection'
    });
    const handleSelect = useCallback((ranges) => {
        dispatch({
            type: "SELECT_CUSTOM_DATE",
            range: ranges.selection
        })
    }, [])
    const handleClose = () => {
        dispatch({
            type: "CLOSE",
            isCustomDate : false
        })
        // setRangeDisplay(false)
    }
    const handleChange = (event) => {

        dispatch({
            type: "DECISION",
            tempDate: dateSelector.find(d => (d.key === (event.target.innerText).toLowerCase()))
        })

    };

    if (state.isCustomDate) {
        return (
            <Modal
                show={state.isCustomDate}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                onCancle={handleClose}
                footer={<Button onClick={handleClose}>CLOSE</Button>}
            >
                <DateRangePicker
                    ranges={[state.range]}
                    onChange={handleSelect}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    direction="horizontal"
                />
            </Modal>);
    }

    if (!display) {
        return (
            <div className={classes.root}>

                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    {dateSelector.map(d => (
                        <Button className={classes.buttonHover} onClick={handleChange} key={d.key}>{d.key}</Button>
                    ))}

                </ButtonGroup>


            </div>
        );
    }
    return <React.Fragment></React.Fragment>

}


