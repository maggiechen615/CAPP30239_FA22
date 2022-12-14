d3.csv('ind_distribution.csv').then(data => {
    let chart = BubbleChart(data, {
        label: d => [...d.industry.split(".").pop().split(/(?=[A-Z][a-z])/g), d.count.toLocaleString("en")].join("\n"),
        value: d => d.count,
        group: d => d.industry.split(".")[1],
        title: d => `${d.industry}\n${d.count.toLocaleString("en")}`,
        link: d => `https://github.com/prefuse/Flare/blob/master/flare/src/${d.industry.replace(/\./g, "/")}.as`,
        width: 1000,
        height:600
      });

    document.getElementById("circle").appendChild(chart);
});

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/bubble-chart
function BubbleChart(data, {
    name = ([x]) => x, // alias for label
    label = name, // given d in data, returns text to display on the bubble
    value = ([, y]) => y, // given d in data, returns a quantitative size
    group, // given d in data, returns a categorical value for color
    title, // given d in data, returns text to show on hover
    link, // given a node d, its link (if any)
    linkTarget = "_blank", // the target attribute for links, if any
    width = 800, // outer width, in pixels
    height = 680, // outer height, in pixels
    padding = 3, // padding between circles
    margin = 1, // default margins
    marginTop = margin, // top margin, in pixels
    marginRight = margin, // right margin, in pixels
    marginBottom = margin, // bottom margin, in pixels
    marginLeft = margin, // left margin, in pixels
    groups, // array of group names (the domain of the color scale)
    colors = ["#8c96c6", "#7b3294","#c2a5cf","#f7f7f7","#a6dba0"], // an array of colors (for groups)
    fill = "#ccc", // a static fill color, if no group channel is specified
    fillOpacity = 0.7, // the fill opacity of the bubbles
    stroke, // a static stroke around the bubbles
    strokeWidth, // the stroke width around the bubbles, if any
    strokeOpacity, // the stroke opacity around the bubbles, if any
  } = {}) {
    // Compute the values.
    const D = d3.map(data, d => d);
    const V = d3.map(data, value);
    const G = group == null ? null : d3.map(data, group);
    const I = d3.range(V.length).filter(i => V[i] > 0);
  
    // Unique the groups.
    if (G && groups === undefined) groups = I.map(i => G[i]);
    groups = G && new d3.InternSet(groups);
  
    // Construct scales.
    const color = G && d3.scaleOrdinal(groups, colors);
  
    // Compute labels and titles.
    const L = label == null ? null : d3.map(data, label);
    const T = title === undefined ? L : title == null ? null : d3.map(data, title);
  
    // Compute layout: create a 1-deep hierarchy, and pack it.
    const root = d3.pack()
        .size([width - marginLeft - marginRight, height - marginTop - marginBottom-50])
        .padding(padding)
      (d3.hierarchy({children: I})
        .sum(i => V[i]));
  
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 150, width-100, height-350])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .attr("font-size", 12)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle");
  
    const leaf = svg.selectAll("a")
      .data(root.leaves())
      .join("a")
        .attr("transform", d => `translate(${d.x},${d.y})`);
  
    leaf.append("circle")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-opacity", strokeOpacity)
        .attr("fill", G ? d => color(G[d.data]) : fill == null ? "none" : fill)
        .attr("fill-opacity", fillOpacity)
        .attr("r", d => d.r);
  
    if (T) leaf.append("title")
        .text(d => T[d.data]);
  
    if (L) {
      // A unique identifier for clip paths (to avoid conflicts).
      const uid = `O-${Math.random().toString(16).slice(2)}`;
  
      leaf.append("clipPath")
          .attr("id", d => `${uid}-clip-${d.data}`)
        .append("circle")
          .attr("r", d => d.r);
  
      leaf.append("text")
          .attr("clip-path", d => `url(${new URL(`#${uid}-clip-${d.data}`, location)})`)
        .selectAll("tspan")
        .data(d => `${L[d.data]}`.split(/\n/g))
        .join("tspan")
          .attr("x", 0)
          .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
          .attr("fill-opacity", (d, i, D) => i === D.length - 1 ? 0.7 : null)
          .text(d => d);
    }

    return Object.assign(svg.node(), {scales: {color}});
  }