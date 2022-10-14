/* bar chart for covid country cases */
d3.csv("covid_data.csv").then(data => {
    for (let d of data) {
        d.cases = +d.cases /*plus sign will convert it to a number */
    };
    const height = 400,
        width = 800,
        margin = ({top: 25, right: 30, bottom: 35, left: 50})
    
    let svg =
        d3.select("#chart").append("svg").attr("viewBox", [0,0,width, height]) /*id of chart on the html page, append svg element; in development tool, should see empty svg*/

    let x = d3.scaleBand() /* can call the variable later*/
        .domain(data.map(d => d.country)) /*get each country and put it in domain, and return an array*/
        .range([margin.left, width-margin.right]) /*range should always be an array*/
        .padding(0.1);

    let y = d3.scaleLinear() /*bcos y axis are all numbers*/
        .domain([0, d3.max(data, d=>d.cases)]).nice() /*.nice rounds up, need to move through each row, loop through all the rows and get data*/
        .range([height - margin.bottom, margin.top])

    const xAxis = g =>g /*create a group*/
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x)) /*automatically run the function, when there is .call, will be immediately run, d3.axisleft is a built-in function that will build y axis*/
    
    const yAxis = g =>g /*create a group*/
        .attr("transform", `translate(${margin.left-5}, 0)`)
        .call(d3.axisLeft(y))

    svg.append("g").call(xAxis) //append the function we created, 'g' is HTML element, g is js variable
    svg.append("g").call(yAxis) 

    //get the bar
    //create a group
    let bar = svg.selectAll(".bar")
        .append("g") //append a group
        .data(data)
        .join("g") //a data join, take the data, and join it on element on pagee, add data to group, append it to class, select all .bar
        .attr("class", "bar")
    
    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => x(d.country)) //give rectangle an x position, for x scale, find where 'china' is on x axis, thats the x value for the bar
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.cases)) //where do each of the bar stops at y axis
        .attr("height", d => y(0) - y(d.cases)) //start at 0, build up to the place

}) /*get the data and use it, make a promise otherwise all things will happen concurrently*/