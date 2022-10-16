d3.csv("library_visits_jan22.csv").then(data => {
    for (let d of data) {
        d.num = +d.num //convert num to a number
    };

    const height = 400,
    width = 800,
    margin = ({top: 25, right: 30, bottom: 35, left: 50});

    //chart is a CSS selector string that acts as a container and contains joined SVG elements
    let svg =
        d3.select("#chart").append("svg").attr("viewBox", [0,0,width, height]);


    /*get axis ready*/
    let x = d3.scaleBand() //scaleband divides range evenly between elements of the domain
        .domain(data.map(d => d.branch)) 
        .range([margin.left, width-margin.right]) 
        .padding(0.1);
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d.num)]).nice() //loop through values, get max as upper limit of domain
        .range([height - margin.bottom, margin.top]);
    
    //build xAxis and yAxis through g to group SVG shapes
    const xAxis = g =>g 
        .attr("transform", `translate(0, ${height - margin.bottom+5})`) //apply transform as attribute of g
        .call(d3.axisBottom(x));
    
     const yAxis = g =>g /*create a group*/
        .attr("transform", `translate(${margin.left-5}, 0)`)
        .call(d3.axisLeft(y));
    
    //append a 'g' element to svg
    svg.append("g").call(xAxis)
    svg.append("g").call(yAxis) 


    /*plot bar chart*/
    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");
    
    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => x(d.branch))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.num))
        .attr("height", d => y(0) - y(d.num))

})