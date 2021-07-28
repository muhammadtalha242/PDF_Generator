import React, { useReducer, useCallback,useEffect } from 'react';
import { addDays, sub } from 'date-fns';
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

                return ({
                    range: { ...state.range },
                    isCustomDate: true
                })
            } else {

                let result = { startDate: sub(new Date(), { [tempDate.type]: [tempDate.days] }), endDate: new Date(), key: 'selection' };
                return ({
                    range: result,
                    isCustomDate: state.isCustomDate

                });
            }
        case "CLOSE":
            return ({
                range: { ...state.range },
                isCustomDate: action.isCustomDate
            });
        case "SELECT_CUSTOM_DATE":

            return ({
                range: action.range,

                isCustomDate:state.isCustomDate 

            });
        default:
            return state;
    }
}


export function DateSelectorButtonGroup({ dateSelector, display, dateChangeHandler }) {
    const classes = useStyles();

    const [state, dispatch] = useReducer(dateReducer, {
        range: {
            startDate: new Date(),
            endDate: addDays(new Date(), 2),
            key: 'selection'
        },
        isCustomDate: false,
    })

    const handleSelect = useCallback((ranges) => {
        dispatch({
            type: "SELECT_CUSTOM_DATE",
            range: ranges.selection
        })
    }, [])
    const handleClose = () => {
        dispatch({
            type: "CLOSE",
            isCustomDate: false
        })
    }
    const handleChange = (event) => {

        dispatch({
            type: "DECISION",
            tempDate: dateSelector.find(d => (d.key === (event.target.innerText).toLowerCase()))
        })

    };

    const {range}=state
    useEffect(()=>{
        dateChangeHandler(range)
    },[dateChangeHandler, range])

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


