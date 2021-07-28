import { useReducer, useCallback } from "react";
// import { dateIsBetween } from '../shared/util/utility'

const graphDataReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_DATA":
            const data = state.data;
            const { sensors, dateRange } = action;

            // const dataCopy = JSON.parse(JSON.stringify(data));
            // dataCopy.forEach(d => {

            //     if (dateIsBetween(d.Date, dateRange)) {
            //         let dRow = {}
            //         if (sensors.length === 4) {
            //             dRow["Date"] = d.Date;
            //             dRow.temperature = d.temperature;
            //             dRow.co2 = d.co2
            //             dRow.humitidy = d.humitidy
            //             dRow.vpd = d.vpd

            //             outputData.push(dRow);
            //         }
            //         else {
            //             sensors.forEach(sensor => {
            //                 dRow["Date"] = d.Date;
            //                 if (sensor in d) {
            //                     dRow[sensor] = d[sensor]
            //                 }
            //             })
            //             outputData.push(dRow);
            //         }
            //     }


            // })
            // return ({

            // })
            break;

        default:
            return state;
    }
}

export const useGraphData = (inputData, dateRange, sensors) => {
    const [graphData, dispatch] = useReducer(graphDataReducer, {
        inputData: inputData,
        outputData: {},
        selectedSensors: sensors,
        dateRange: dateRange
    })


    const updateGraphData = useCallback((update) => {
        dispatch({ type: "UPDATE_DATA", dateRange: update.dateRange, sensors: update.sensors })
    })

    return [graphData, updateGraphData]

}