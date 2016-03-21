// Create SVG drawing space
var margin = {top: 20, right: 10, bottom: 20, left: 10};

var width = 960 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

var svg = d3.select("#map-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Create map projection
var projection = d3.geo.mercator()
    .center([15, 5])
    .scale(600)
    .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

// Declare variables and set default values
var selectedValue = "UN_population";

var numFormat = d3.format(",d"),
    formatInteger = d3.format(".0f"),
    formatMillions = function(d) { return formatInteger(d / 1e6) + "M";},
    formatMega = d3.format("3.0s"),
    formatPercent = d3.format(".0%");

var filteredAfrica, africaJson;
var malariaDataByCountryId = {};

// Define data columns and labels for display purpose
var tooltipText = {
    "UN_population":"Population",
    "At_risk":"Risk %",
    "At_high_risk":"High Risk %",
    "Suspected_malaria_cases":"Suspected Malaria Cases",
    "Malaria_cases":"Malaria Cases",
    "Sus_malaria_cases_by_pop_den":"Suspected Malaria Cases",
    "Malaria_cases_by_pop_den":"Malaria Cases"
};

var tooltipCol = {
    "UN_population":"UN_population",
    "At_risk":"At_risk",
    "At_high_risk":"At_high_risk",
    "Suspected_malaria_cases":"Suspected_malaria_cases",
    "Malaria_cases":"Malaria_cases",
    "Sus_malaria_cases_by_pop_den":"Suspected_malaria_cases",
    "Malaria_cases_by_pop_den":"Malaria_cases"
};

// Create scale for map colors
var color = d3.scale.quantize()
    .range(colorbrewer.Reds["6"]);

// Add legends for Choropleth map colors
// citation: http://bl.ocks.org/KoGor/5685876 <-- Legends
var ls_w = 20, ls_h = 20;

var legend = svg.selectAll('g.legendEntry')
    .data(color.range())
    .enter()
    .append('g').attr('class', 'legendEntry');

legend.append('rect')
    .attr('class', 'legendBox')
    .attr("x", 20)
    .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
    .attr("width", ls_w)
    .attr("height", ls_h)
    .style("fill", function(d){ return d; });

legend.append('text')
    .attr('class','legendText')
    .attr("x", 50)
    .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
    .attr("dy", "-.05em");

// add one static legend to represent "No Data" color
svg.append('rect')
    .attr('class', 'legendBox')
    .attr("x", 20)
    .attr("y", height - ls_h )
    .attr("width", ls_w)
    .attr("height", ls_h)
    .style("fill", "#424242");

svg.append('text')
    .attr('class','legendNA')
    .attr("x", 50)
    .attr("y", height - 4)
    .attr("dy", "-.05em")
    .text("No Data");

// Add tooltip on the mouseover on the map
// http://bl.ocks.org/chule/ac6d94c9df9919fdd4f2 <-- tooltip
var tooltip = {
    element: null,
    init: function() {
        this.element = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
    },
    show: function(t) {
        this.element.html(t).transition().duration(200).style("left", d3.event.pageX + 20 + "px").style("top", d3.event.pageY - 20 + "px").style("opacity", .9);
    },
    move: function() {
        this.element.transition().duration(30).ease("linear").style("left", d3.event.pageX + 20 + "px").style("top", d3.event.pageY - 20 + "px").style("opacity", .9);
    },
    hide: function() {
        this.element.transition().duration(500).style("opacity", 0)
    }};

tooltip.init();

// Use the Queue.js library to read two files
queue()
    .defer(d3.json, "data/africa.topo.json")
    .defer(d3.csv, "data/global-malaria-2015.csv")
    .await(function(error, mapTopJson, malariaDataCsv){

    // Filter African region only
    filteredAfrica = malariaDataCsv.filter( function(d) { return d.WHO_region == "African" });

    // --> PROCESS DATA
    filteredAfrica.forEach(function(d){

        // Convert numeric values to 'numbers'
        d.At_high_risk = d3.round(+d.At_high_risk, 0);
        d.At_risk = d3.round(+d.At_risk, 0);
        d.Malaria_cases = +d.Malaria_cases;
        d.Suspected_malaria_cases = +d.Suspected_malaria_cases;
        d.UN_population = +d.UN_population;

        // calculate malaria & suspected cases by population density to represent the color pixels appropriately
        d.Malaria_cases_by_pop_den = d3.round(+d.Malaria_cases/+d.UN_population, 2);
        d.Sus_malaria_cases_by_pop_den = d3.round(+d.Suspected_malaria_cases/+d.UN_population, 2);

        // create a new data structure for quick reference
        malariaDataByCountryId[d.Code] = {
            WHO_region : d.WHO_region,
            Country : d.Country,
            Code : d.Code,
            At_high_risk : d.At_high_risk,
            At_risk : d.At_risk,
            Malaria_cases : d.Malaria_cases,
            Suspected_malaria_cases : d.Suspected_malaria_cases,
            Malaria_cases_by_pop_den : d.Malaria_cases_by_pop_den,
            Sus_malaria_cases_by_pop_den : d.Sus_malaria_cases_by_pop_den,
            UN_population : d.UN_population
        };

    });

    // set the domain for the colors
    color.domain([0, d3.max(filteredAfrica, function (d) { return d[selectedValue]; })]);

    // --> Choropleth implementation
    // create a choropleth map regions (countries from topojson features) and fill with colors
    // first check if the country is present in the dataset and it is not null / NaN
    // then pass the selected value to the color scale to fill it
    // If country is not present or data is not available fill with default color fill
    var countries = svg.selectAll(".country")
            .data(topojson.feature(mapTopJson, mapTopJson.objects.collection).features)
            .enter()
        .append("path")
            .attr("class", "country")
            .attr("id", function(d) { return d.properties.adm0_a3_is; })
            .style("fill", function(d) {
                if (d.properties.adm0_a3_is in malariaDataByCountryId && !isNaN(malariaDataByCountryId[d.properties.adm0_a3_is][selectedValue])) {
                    return color(malariaDataByCountryId[d.properties.adm0_a3_is][selectedValue]);
                } else {
                    return "#424242"
                }
            })
            .style("opacity", 0.8)
            .attr("d", path);

    // add tooltip on the mouse over of the map regions
    countries.on("mouseover", function (d, i) {
        if (d.properties.adm0_a3_is in malariaDataByCountryId && !isNaN(malariaDataByCountryId[d.properties.adm0_a3_is][selectedValue])) {
            if (selectedValue != "UN_population") {
                tooltip.show("<b>" + malariaDataByCountryId[d.properties.adm0_a3_is]["Country"]  + "</b>" + "<br>" +
                    tooltipText["UN_population"] + ": " + numFormat(malariaDataByCountryId[d.properties.adm0_a3_is]["UN_population"]) + "<br>" +
                    tooltipText[selectedValue] + ": " + numFormat(malariaDataByCountryId[d.properties.adm0_a3_is][tooltipCol[selectedValue]]));
            } else {
                tooltip.show("<b>" + malariaDataByCountryId[d.properties.adm0_a3_is]["Country"]  + "</b>" + "<br>" +
                    tooltipText[selectedValue] + ": " + numFormat(malariaDataByCountryId[d.properties.adm0_a3_is][tooltipCol[selectedValue]]));
            }

        } else {
            tooltip.show("<b>" + d.properties.subunit  + "</b>" + "<br>No Data Available");
        }
        d3.select(this).transition().duration(300).style("opacity", 1);
    });

    countries
        .on("mousemove", function (d, i) { tooltip.move(); })
        .on("mouseout", function (d, i) { d3.select(this).transition().duration(300).style("opacity", 0.8); tooltip.hide(); });

    // Update choropleth
    updateChoropleth();

});

// Drop down box Chart Data change listener
d3.select("#map-data").on("change", function() {

    // Read the selected chart type from the drop down box
    selectedValue = d3.select("#map-data").property("value");

    // Re-draw the visualization every time user changes
    updateChoropleth();

});

function updateChoropleth() {

    // Update color domain
    color.domain([0, d3.max(filteredAfrica, function (d) { return d[selectedValue]; })]);

    // update the choropleth map colors based on user selection
    svg.selectAll(".country")
        .style("fill", function(d) {
            if (d.properties.adm0_a3_is in malariaDataByCountryId && !isNaN(malariaDataByCountryId[d.properties.adm0_a3_is][selectedValue])) {
                return color(malariaDataByCountryId[d.properties.adm0_a3_is][selectedValue]);
            } else {
                return "#424242"
            }
        })
        .style("opacity", 0.8);

    // update the legend text based on user selection
    legend.selectAll(".legendText")
        .text(function(d,i) {
            //if (selectedValue == "Sus_malaria_cases_by_pop_den" || selectedValue == "Malaria_cases_by_pop_den") {
            //    color.domain([0, d3.max(filteredAfrica, function (d) { return d[tooltipCol[selectedValue]]; })]);
            //}

            var extent = color.invertExtent(d);

            //extent will be a two-element array, format it however you want:
            var format = d3.format("0.2f");
            if (selectedValue == "At_risk" || selectedValue == "At_high_risk") {
                return formatPercent(+extent[0]/100) + " - " + formatPercent(+extent[1]/100);
            } else if (selectedValue == "Sus_malaria_cases_by_pop_den" || selectedValue == "Malaria_cases_by_pop_den") {
                return formatPercent(+extent[0]) + " - " + formatPercent(+extent[1]);
            } else {
                return formatMillions(+extent[0]) + " - " + formatMillions(+extent[1]);
            }

        });

}