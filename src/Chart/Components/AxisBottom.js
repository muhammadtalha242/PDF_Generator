export const AxisBottom = ({ xScale, innerHeight }) =>
  xScale.ticks().map((tickValue) => (
    <g
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} stroke="black" />
      <text
        y={innerHeight + 2}
        style={{ textAnchor: 'middle' }}
        dy="0.71em"
      >
        {tickValue}
      </text>
    </g>
  ));