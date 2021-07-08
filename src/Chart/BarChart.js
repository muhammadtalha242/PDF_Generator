import { scaleBand, scaleLinear, max } from 'd3';

import { AxisBottom } from "./Components/AxisBottom";
import { AxisLeft } from "./Components/AxisLeft";
import { Marks } from "./Components/Marks";
import { dateIsBetween } from '../util/utility'


// import { DataContext } from "../Data/DataContext";

const height = 500;
const width = 960;
const margin = {
    top: 20,
    right: 20,
    left: 200,
    bottom: 20,
};
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;


const yValue = (d) => d.country;
const xValue = (d) => d.Population;


export const BarChar = ({ data, date, sensors }) => {
    // if use want to use context
    // const value = useContext(DataContext);

    // let newData = data.forEach(element => {
    //     element.Date = new Date((element.Date).getTime() - millisecond(time))
    //     return (element)
    // });
    // newData = data.forEach(element => {

    //     return ({"date":element.Date , sensors: element["Temperature_2"]})

    // })


    const dataCopy = JSON.parse(JSON.stringify(data));

    const outputData = []
    dataCopy.forEach(d => {

        if (dateIsBetween(d.Date, date)) {
            let dRow = {}
            if (sensors === "all") {
                dRow = { ...d }
                outputData.push(dRow);
            }
            else {
                sensors.forEach(sensor => {
                    dRow["Date"] = d.Date;
                    if (sensor in d) {
                        dRow[sensor] = d[sensor]
                    }
                })
                outputData.push(dRow);
            }
        }

    })
    console.log("outputData: ", outputData)



    const yScale = scaleBand()
        .domain(data.map((d) => d.country))
        .range([0, innerHeight])
        .padding(0.15);

    const xScale = scaleLinear()
        .domain([0, max(data, (d) => d.Population)])
        .range([0, innerWidth]);
    return (
        <svg width={width} height={height}>
            <g
                transform={`translate(${margin.left},${margin.top})`}
            >
                <AxisBottom
                    innerHeight={innerHeight}
                    xScale={xScale}
                />
                <AxisLeft yScale={yScale} />
                <Marks data={data} yScale={yScale} xScale={xScale} xValue={xValue} yValue={yValue} />
            </g>
        </svg>
    );
}