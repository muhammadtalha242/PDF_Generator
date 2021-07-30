import { useEffect, useReducer, useCallback } from "react";
import moment from 'moment';

const graphDataReducer = (state, action) => {
    switch (action.type) {
        case "DATE_CHANGE":

            return ({
                ...state,
                dateRange: action.dateRange
            });
        case "SENSOR_CHANGE":

            return ({
                ...state,
                selectedSensors: action.sensors
            });

        case "SET_FORM_DATA":

            return ({
                ...state,
                data: action.data
            });
        case "UPDATE_OUTPUT":

            return ({
                ...state,
                outputData : action.output
            });

        default:
            return state;
    }
}

export const useGraphData = (inputData) => {
    const [graphData, dispatch] = useReducer(graphDataReducer, {
        data: inputData,
        outputData: [],
        selectedSensors: null,
        dateRange: null
    })

    const getOutput = useCallback((data,selectedSensors, dateRange) => {
        const outputData = []

        const dataCopy = JSON.parse(JSON.stringify(data));
        dataCopy.forEach(d => {
            if ( moment(d.Date).isBetween(dateRange['startDate'], dateRange['endDate']) ) {
                let dRow = {}  

                selectedSensors.forEach(sensor => {
                    dRow["Date"] = d.Date;
                    if (sensor in d) {
                        dRow[sensor] = d[sensor]
                    }
                })
                outputData.push(dRow);

            }
        })
        dispatch({ type: "UPDATE_OUTPUT", output: outputData })

    }, [])


    const dateChangeHandler = useCallback((dateRange) => {
        dispatch({ type: "DATE_CHANGE", dateRange: dateRange })
    }, [])

    const sensorChangeHandler = useCallback((sensors) => {
        dispatch({ type: "SENSOR_CHANGE", sensors: sensors })
    }, [])

    const setGraphData = useCallback((data) => {
        dispatch({ type: "SET_FORM_DATA", data: data })
    }, [])

    const { data, selectedSensors, dateRange } = graphData;

    useEffect(() => {
        if (data) {
            getOutput(data,selectedSensors, dateRange)
        }

    }, [data, selectedSensors, dateRange, getOutput])

    return [graphData, dateChangeHandler, sensorChangeHandler, setGraphData]

}