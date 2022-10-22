/* D3 Line Chart */
// pulled out these variables before they are not dependent on data
// JS will run these lines while getting the data from csv -- performance
const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('long-term-interest-monthly.csv').then(data => {
    let timeParse = d3.timeParse("%Y-%m") //define a function

    console.log(data) //to make sure data is on page
    //since values are in string
    for (let d of data) {
        d.Value =+ d.Value;
        d.Date = timeParse(d.Date);
    }

    let x = d3.scaleTime()
        .domain(d3.extent(data, d=> d.Date))
        .range([margin.left, width-margin.right]);
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d.Value)])
        .range([height-margin.bottom, margin.top]) 
    
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)//to put x axis on right place
      .call(d3.axisBottom(x).tickSizeOuter(0));//ticksizeouter to take the little bar out
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d=>d+'%').tickSize(-width));

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-1em") 
      .text("Year");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");
    
    let line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.Value)) //give position to each point on the line
        .curve(d3.curveBasis)
    
    //append things to svg that was created on line 8
    svg.append("path")
        .datum(data)
        .attr("d", line) //defined from 57-60
        .attr("fill", "none")
        .attr("stroke", "steelblue")
  });