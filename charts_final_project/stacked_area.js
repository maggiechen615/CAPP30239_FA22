let data = [
  {
    year: 2016,
    Rev: 170380,
    ESG: 85520
  },
  {
    year: 2017,
    Rev: 163170,
    ESG: 80650
  },
  {
    year: 2018,
    Rev: 181680,
    ESG: 72110
  },
  {
    year: 2019,
    Rev: 204532,
    ESG: 69882
  },
  {
    year: 2020,
    Rev: 270204,
    ESG: 49427
  }
];

const timeParse = d3.timeParse("%Y");
for (let d of data) {
  d.year = timeParse(d.year);
}

//console.log(data)

const color = ["#c2a5cf","#8c96c6"];

let height = 400,
    width = 860,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 })
    innerWidth = width - margin.left - margin.right;

const svg = d3
  .select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);  

const chart = svg.append("g").attr("transform", `translate(${margin.left})`);

const grp = chart
  .append("g")
  .attr("transform", `translate(-${margin.left},-${margin.top-15})`);

// Create stack
const stack = d3.stack().keys(["ESG", "Rev"]);
const stackedValues = stack(data);
const stackedData = [];
// Copy the stack offsets back into the data.
stackedValues.forEach((layer, index) => {
  const currentStack = [];
  layer.forEach((d, i) => {
    currentStack.push({
      values: d,
      year: data[i].year
    });
  });
  stackedData.push(currentStack);
});

// Create scales
const yScale = d3
  .scaleLinear()
  .range([height - margin.bottom, margin.top])
  .domain([0, d3.max(stackedValues[stackedValues.length - 1], dp => dp[1])]);

const xScale = d3
  .scaleTime()
  .domain(d3.extent(data, d => d.year))
  .range([margin.left-25, width - margin.right-30]);

const area = d3
  .area()
  .x(dataPoint => xScale(dataPoint.year))
  .y0(dataPoint => yScale(dataPoint.values[0]))
  .y1(dataPoint => yScale(dataPoint.values[1]));

const series = grp
  .selectAll(".series")
  .data(stackedData)
  .enter()
  .append("g")
  .attr("class", "series");

series
  .append("path")
  .attr("transform", `translate(${margin.left},0)`)
  .style("fill", (d, i) => color[i])
  .attr("stroke", "white")
  .attr("stroke-width", 0.5)
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("d", d => area(d));

// Add the X Axis
chart
  .append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale));

// Add the Y Axis
chart
  .append("g")
  .attr("transform", `translate(${margin.left-25},0)`)
  .call(d3.axisLeft(yScale))

//build legend
grp.append("circle").attr("cx",80).attr("cy",30).attr("r", 3).style("fill", "#8c96c6")
grp.append("circle").attr("cx",80).attr("cy",50).attr("r", 3).style("fill", "#c2a5cf")
grp.append("text").attr("x", 90).attr("y", 30).text("Revenue ($,million)").style("font-size", "10px").attr("alignment-baseline","middle")
grp.append("text").attr("x", 90).attr("y", 50).text("ESG Investment ($,million)").style("font-size", "10px").attr("alignment-baseline","middle")

//Q: X axis