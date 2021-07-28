import React, { useEffect, useRef } from "react";
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
} from "d3";


/**
 * Component that renders a StackedBarChart
 */

const height = 600;
const width = 760;
const margin = {
  top: 100,
  right: 10,
  left: 50,
  bottom: 20,
};
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

function StackedBarChart({ data, date, sensors }) {

  const colorsArr = ['#d53e4f', "#3288bd", "#66c2a5", "#f46d43"]
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
        tooltip.attr("transform", `translate( ${xPosition - 10}, ${yPosition - 10})`);
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
      .attr("y", height + 20)
      .text("Date Month");

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", (innerWidth / 2) - 350)
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

    var legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(' + (innerWidth - 90) + ', 20)');
    legend.selectAll('text')
      .data(sensors)
      .enter()
      .append('text')
      .text(function (d) {
        return d;
      })
      .attr('x', 18)
      .attr('y', function (d, i) {
        return i * 18;
      })
      .attr('text-anchor', 'start')
      .attr('alignment-baseline', 'hanging');
    legend.selectAll('rect')
      .data(sensors)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', function (d, i) {
        return i * 18;
      })
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', function (d, i) {
        return colors[d];
      });




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