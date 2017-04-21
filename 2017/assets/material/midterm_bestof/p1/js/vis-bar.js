// Stacked to Grouped bar graph for Global govt. funding
// citation: https://bl.ocks.org/mbostock/3943967

// Declare variables
var n, // number of layers
    m, // number of samples per layer
    layers, yGroupMax, yStackMax,
    Layer, rect;

var dataset = [];

// Create stack layout
var stack = d3.layout.stack();

// D3 number / currency formats
var numFormat = d3.format(","),
    formatCurrency = d3.format("$");

// Create SVG drawing space
var margin = {top: 40, right: 40, bottom: 20, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svgBar = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Create x, y & bar stack color scales
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var barColor = d3.scale.ordinal()
    .range(colorbrewer.Reds["6"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("right")
    .tickFormat(d3.format(".2s"));

// Load data
d3.csv("data/global-funding.csv", function(error, data) {
    if (error) throw error;

    // Filter out the total column
    data = data.filter(function (d) { return d["Source"] != "Total" });

    // Select all row & column headers
    var years = d3.keys(data[0]).filter(function (key) { return key !== "Source"; });
    var fundSources = data.map(function(d) { return d.Source; });

    // Prepare the data for the stack layout
    data.forEach(function (d) {
        var y0 = 0;
        dataset.push(years.map(function (name, i) { return {source: d.Source, x: name, y: (!isNaN(+d[name])) ? +d[name] : 0}; }));
    });

    // Set the number of stack layers & groups
    n = dataset.length;
    m = dataset[0].length;

    // Create the stack layout
    layers = stack(dataset);

    // Calculate the Y scale based on stack vs group
    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });
    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    // Initialize tooltip
    var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.source + ": $" + numFormat(d.y) + "M"; });

    // Set the domain values for x, y and color
    x.domain(years);
    y.domain([0, yStackMax]);
    barColor.domain(fundSources);

    // Create the stacked bars
    layer = svgBar.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return barColor(i); });

    rect = layer.selectAll(".bar")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", height)
        .attr("width", x.rangeBand())
        .attr("height", 0)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    // Invoke tooltip
    rect.call(tip);

    rect.transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

    // Call x axis
    svgBar.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Call y axis & set the label
    svgBar.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ",0)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        //.attr("x", width)
        .attr("y", -11)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Funds (USD Millions)");

    // Add legend
    var legend = svgBar.selectAll(".legend")
        .data(fundSources)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + width * -1 + "," + i * 20 + ")"; });

    legend.append("rect")
        .attr("class", "legendBox")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", barColor);

    legend.append("text")
        .attr("class", "legendText")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) { return d; });

});

// Listen the radio button changes
d3.selectAll("input").on("change", change);

// Call the respective function based on user selection
function change() {
    if (this.value === "grouped") transitionGrouped();
    else transitionStacked();
}

// function to transition from stacked to grouped
function transitionGrouped() {
    y.domain([0, yGroupMax]);

    // Update Y axis
    svgBar.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis);

    rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
        .attr("width", x.rangeBand() / n)
        .transition()
        .attr("y", function(d) { return y(d.y); })
        .attr("height", function(d) { return height - y(d.y); });

}

// function to transition from grouped to stacked
function transitionStacked() {
    y.domain([0, yStackMax]);

    // Update Y axis
    svgBar.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis);

    rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .transition()
        .attr("x", function(d) { return x(d.x); })
        .attr("width", x.rangeBand());

}