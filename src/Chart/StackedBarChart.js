import React, { useEffect, useRef } from "react";
import { dateIsBetween, normalize_data } from '../shared/util/utility'

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
  pointer,
  min,
} from "d3";


/**
 * Component that renders a StackedBarChart
 */

const height = 500;
const width = 760;
const margin = {
  top: 20,
  right: 10,
  left: 50,
  bottom: 20,
};
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

function StackedBarChart({ data, date, sensors }) {

  const colorsArr = ['#7CFC00', "#228B22", "#4F7942", "#50C878"]
  const colors = {};
  sensors.forEach((senson, i) => {

    colors[senson] = colorsArr[i]
  });
  const svgRef = useRef();
  const wrapperRef = useRef();
  const outputData = []



  // will be called initially and on every data change
  useEffect(() => {

    const svg = select(svgRef.current);



    //Reshaping data accoring to need
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.forEach(d => {

      if (dateIsBetween(d.Date, date)) {
        let dRow = {}
        if (sensors.length === 4) {
          dRow["Date"] = d.Date;
          dRow.temperature = normalize_data(d.avg_temp, min(data, (x) => x.avg_temp), max(data, (x) => x.avg_temp))
          dRow.co2 = normalize_data(d.avg_co2, min(data, (x) => x.avg_co2), max(data, (x) => x.avg_co2))
          dRow.humitidy = normalize_data(d.avg_humitidy, min(data, (x) => x.avg_humitidy), max(data, (x) => x.avg_humitidy))
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

    console.log("outputData: ", outputData)

    // stacks / layers
    const stackGenerator = stack()
      .keys(sensors)
      .order(stackOrderAscending);
    const layers = stackGenerator(outputData);

    const extent = [
      0,
      max(layers, layer => max(layer, sequence => sequence[1]))
    ];



    // scales
    const xScale = scaleBand()
      .domain(outputData.map(d => {
        return new Date(d.Date).getTime()
      }))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = scaleLinear()
      .domain(extent)
      .range([innerHeight, 0]);


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
      .attr("height", sequence => yScale(sequence[0]) - yScale(sequence[1]))
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .on("mouseover", function () { tooltip.style("display", null); })
      .on("mouseout", function () { tooltip.style("display", "none"); })
      .on("mousemove", function (d) {
        var xPosition = pointer(d, svg.node)[0];
        var yPosition = pointer(d, svg.node)[1];
        tooltip.attr("transform", `translate( ${xPosition-200 }, ${yPosition-100})`);
        tooltip.select("text").text(layer => layer);
      });
    var tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    tooltip.append("text")
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "15px")
      .attr("font-weight", "bold");

    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 60)
      .text("Date Month");

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", (innerWidth / 2)-350)
      .attr("x", (-innerHeight / 2) + 50)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Sensor Data");

    // axes
    const xAxis = axisBottom(xScale).scale(xScale)
      .tickFormat(timeFormat("%d %b"))
      .tickValues(xScale.domain().filter(function (d, i) {
        return !(i % 400)
      }));

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);




  }, [outputData, data, date, sensors, colors]);

  return (
    <React.Fragment>

      <svg ref={svgRef} width={width} height={height}>
        <g
          transform={`translate(${margin.left},${margin.top})`}
        >
          <g className="x-axis"></g> 
          <g className="y-axis" />
        </g>

      </svg>
    </React.Fragment>
  );
}

export default StackedBarChart;