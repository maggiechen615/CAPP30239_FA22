/* D3 Line Chart Homework*/
// out of performance concern, pull the variables before running promise on d3
const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('long-term-interest-canada.csv').then(data => {
    let timeParse = d3.timeParse("%Y-%m")

    //cast Month and Num to appropriate data types
    for (let d of data) {
        d.Num =+ d.Num;
        d.Month = timeParse(d.Month);
    }

    //define variable x to be called later when building x axis
    let x = d3.scaleTime()
        .domain(d3.extent(data, d=> d.Month))
        .range([margin.left, width-margin.right]);
    
    //define variable y to be called later when building y axis
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d.Num)])
        .range([height-margin.bottom, margin.top]) 
    
    //append a group to svg and pass var x and y to axisBottom, axisLeft
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(d3.timeFormat("%b")));
      //d3.timeFormat() to parse and format dates: https://github.com/d3/d3-time-format
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d=>d+'%').tickSize(-width));

    //append text to label x axis and y axis
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height+10)
      .attr("dx", "0.5em")
      .attr("dy", "-1em") 
      .style("font", "12px times") //change axis label font
      .text("Month");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .style("font", "12px times") //change axis label font
      .text("Interest rate in Canada");
    
    //define the line var
    let line = d3.line()
        .x(d => x(d.Month))
        .y(d => y(d.Num)) //give position to each point on the line
        .curve(d3.curveLinear) 
        //here I want to create straight lines between adjacent points, so curveLinear is used instead of curveBasis
    
    //append line and other attributes to svg
    svg.append("path")
        .datum(data)
        .attr("d", line) //defined from 57-60
        .attr("fill", "none")
        .attr("stroke", "steelblue")
    
  });