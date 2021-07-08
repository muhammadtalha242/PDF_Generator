import React, { useEffect, useRef } from "react";
import { dateIsBetween,normalize_data } from '../util/utility'
import "./Test.css"

import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
  timeFormat,
  min,
  color
} from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a StackedBarChart
 */

function StackedBarChart({ data, date, sensors }) {

  const colorsArr = ['purple', "orange", "green","black" ]
  const colors = {};
  sensors.forEach((senson, i) => {
    
    colors[senson] = colorsArr[i]
  });
  console.log("colors: ",colors)
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const outputData = []

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();



    //Reshaping data accoring to need
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.forEach(d => {

      if (dateIsBetween(d.Date, date)) {
        let dRow = {}
        if (sensors.length ===4) {
          dRow["Date"] = d.Date;          
          dRow.temperature = normalize_data(d.avg_temp, min(data,(x) => x.avg_temp), max(data, (x) => x.avg_temp))
          dRow.co2 = normalize_data(d.avg_co2, min(data, (x) => x.avg_co2), max(data, (x) => x.avg_co2))
          dRow.humitidy =  normalize_data(d.avg_humitidy, min(data, (x) => x.avg_humitidy), max(data, (x) => x.avg_humitidy))
          dRow.vpd = normalize_data(d.avg_vpd, min(data, (x) => x.avg_vpd), max(data, (x) => x.avg_vpd))

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
    console.log("outputData =>: ", outputData)




    // stacks / layers
    const stackGenerator = stack()
      .keys(sensors)
      .order(stackOrderAscending);
    const layers = stackGenerator(outputData);
    console.log("layer:=>", layers)

    const extent = [
      0,
      max(layers, layer => max(layer, sequence => sequence[1]))
    ];


    console.log("extent:=>", extent)

    // scales
    const xScale = scaleBand()
      .domain(outputData.map(d => new Date(d.Date).getTime()))
      .range([0, width])
      .padding(0.4);

    const yScale = scaleLinear()
      .domain(extent)
      .range([height, 0]);

    // rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", layer => colors[layer.key])
      .selectAll("rect")
      .data(layer => layer)
      .join("rect")
      .attr("x", sequence => xScale(new Date(sequence.data.Date).getTime()))
      .attr("width", xScale.bandwidth())
      .attr("y", sequence => yScale(sequence[1]))
      .attr("height", sequence => yScale(sequence[0]) - yScale(sequence[1]));

    // axes
    const xAxis = axisBottom(xScale).scale(xScale)
      .tickFormat(timeFormat("%d %b"))
      .tickValues(xScale.domain().filter(function (d, i) { return !(i % 600) }));
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

  }, [outputData, data, date, sensors, dimensions,colors]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default StackedBarChart;