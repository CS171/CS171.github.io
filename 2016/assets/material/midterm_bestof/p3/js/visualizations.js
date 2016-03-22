var margin = {
  top: 40,
  right: 40,
  bottom: 60,
  left: 60
};

var width = 1400 - margin.left - margin.right,
  height = 900 - margin.top - margin.bottom;

var mapOptions = {
  UN_population: "UN population",
  At_risk: "% population at risk",
  At_high_risk: "% population at high risk",
  Malaria_cases: "Confirmed malaria cases",
  Suspected_malaria_cases: "Suspected malaria cases"
};

d3.select("#data-type").selectAll("option")
  .data(d3.keys(mapOptions))
  .enter()
  .append("option")
  .attr("value", function(key) {
    return key;
  })
  .text(function(key) {
    return mapOptions[key];
  });

var selected = d3.keys(mapOptions)[0];

var projection = d3.geo.azimuthalEqualArea()
  .clipAngle(180)
  // Size of the map itself, you may want to play around with this in
  // relation to your canvas size
  .scale(600)
  // Center the map in the middle of the canvas
  .translate([width / 2 - 200, height / 2])
  .precision(.1);;

var path = d3.geo.path()
  .projection(projection);

var svg = d3.select("#map-area").append("svg")
  .attr("width", width)
  .attr("height", height);

var tooltip = d3.select('#map-area').append('div')
  .attr('class', 'hidden tooltip');

var color_domain, ext_color_domain, legend_labels;

var nameById = {};
var currentRating = {};

var text;
var ls_w = 30,
  ls_h = 30;



// Second visualization

var widthB = 1200 - margin.left - margin.right,
  heightB = 500 - margin.top - margin.bottom;

var svg2 = d3.select("#chart-area").append("svg")
  .attr("width", widthB + margin.left + margin.right)
  .attr("height", heightB + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var malariaData, filteredMalariaData1, filteredMalariaData, jsonData;

var chartOptions1 = {
  Malaria_cases: "Confirmed malaria cases",
  Suspected_malaria_cases: "Suspected malaria cases"
};

var chartOptions2 = {
  At_risk: "At risk",
  At_high_risk: "At high risk"
};

var regionOpts = {
  All: "All",
  African: "African",
  Eastern_Mediterranean: "Eastern Mediterranean",
  // European: "European",
  Region_Americas: "Region of the Americas",
  South_East_Asia: "South-East Asia",
  Western_Pacific: "Western Pacific"
};

d3.select("#region-opt").selectAll("option")
  .data(d3.keys(regionOpts))
  .enter()
  .append("option")
  .attr("value", function(key) {
    return key;
  })
  .text(function(key) {
    return regionOpts[key];
  });

d3.select("#chart-opt1").selectAll("option")
  .data(d3.keys(chartOptions1))
  .enter()
  .append("option")
  .attr("value", function(key) {
    return key;
  })
  .text(function(key) {
    return chartOptions1[key];
  });

d3.select("#chart-opt2").selectAll("option")
  .data(d3.keys(chartOptions2))
  .enter()
  .append("option")
  .attr("value", function(key) {
    return key;
  })
  .text(function(key) {
    return chartOptions2[key];
  });

var padding = 64;

var selected0 = d3.keys(regionOpts)[0];

var selected1 = d3.keys(chartOptions1)[0];

var selected2 = d3.keys(chartOptions2)[0];

var xScale = d3.scale.pow().exponent(0.2).range([padding, widthB - padding]);

var yScale = d3.scale.linear().range([heightB - padding, padding]);

var rScale = d3.scale.linear().range([6, 64]);

var colorScale;

var getRisk = function(d) {
  if (!isNaN(yScale(d[selected2]))) {
    return yScale(d[selected2]);
  }
};

var getCases = function(d, i) {
  if (!isNaN(xScale(d[selected1]))) {
    return xScale(d[selected1]);
  }
};

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

var xAxisGroup = svg2.append("g")
  .attr("transform", "translate(0," + heightB + ")")
  .attr("class", "x-axis axis");

var yAxisGroup = svg2.append("g")
  .attr("class", "y-axis axis");

queue()
  .defer(d3.json, "data/africa.topo.json")
  .defer(d3.csv, "data/global-malaria-2015.csv")
  .await(function(error, mapTopJson, malariaDataCsv) {

    malariaDataCsv.forEach(function(d) {
      d.UN_population = +d.UN_population;
      d.At_risk = +d.At_risk;
      d.At_high_risk = +d.At_high_risk;
      d.Suspected_malaria_cases = +d.Suspected_malaria_cases;
      d.Malaria_cases = +d.Malaria_cases;
    });

    malariaData = malariaDataCsv;

    filteredMalariaData = malariaDataCsv.filter(function(d) {
      return (d.WHO_region == "African" || d.Code == "SDN" || d.Code == "SOM" ||
        d.Code == "DJI");
    });

    jsonData = mapTopJson;

    updateVisualization();
    updateChoropleth();
  });

var tip = d3.tip()
  .attr("class", "d3-tip tooltip")
  .offset([-10, 0])
  .html(function(d) {
    return "<b>" + d.Country + "</b><br/>" + chartOptions1[selected1] + ": " +
      d[selected1] + "<br/>" + chartOptions2[selected2] + ": " +
      d[selected2] + "%<br/>" + "Population: " + d.UN_population;
  });

function updateChoropleth() {
  selected = d3.select("#data-type").property("value");
  filteredMalariaData.forEach(function(d) {
    currentRating[d.Code] = +d[selected];
    nameById[d.Code] = d.Country;
  });

  if (selected == "At_risk" || selected == "At_high_risk") {
    color_domain = [15, 30, 45, 60, 75];
    ext_color_domain = [0, 15, 30, 45, 60, 75];
    legend_labels = ["< 15%", "15 - 30%", "30 - 45%", "45 - 60%", "60 - 75%", "75-100%"];
  } else if (selected == "UN_population") {
    color_domain = [50000, 150000, 300000, 800000, 60000000];
    ext_color_domain = [0, 50000, 150000, 300000, 800000, 60000000];
    legend_labels = ["< 50,000", "50,000 - 150,000", "150,000 - 300000", "300,000 - 800,000", "800,000 - 60,000,000", "> 60,000,000"];
  } else if (selected == "Suspected_malaria_cases") {
    color_domain = [10000, 100000, 1000000, 5000000, 15000000];
    ext_color_domain = [0, 10000, 100000, 1000000, 5000000, 15000000];
    legend_labels = ["< 10,000", "10,000 - 100,000", "100,000 - 1,000,000", "1,000,000 - 5,000,000", "5,000,000 - 15,000,000", "> 15,000,000"];
  } else if (selected == "Malaria_cases") {
    color_domain = [10000, 100000, 1000000, 5000000, 20000000];
    ext_color_domain = [0, 10000, 100000, 1000000, 5000000, 20000000];
    legend_labels = ["< 10,000", "10,000 - 100,000", "100,000 - 1,000,000", "1,000,000 - 5,000,000", "5,000,000 - 20,000,000", "> 20,000,000"];
  }

  var color = d3.scale.threshold()
    .domain(color_domain)
    .range(["#edf8fb", "#bfd3e6", "#9ebcda", "#8c96c6", "#8856a7", "#810f7c"]);

  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "countries")
    .selectAll("path")
    .data(topojson.feature(jsonData, jsonData.objects.collection).features)
    .enter().append("path")
    .attr("class", "country")
    .attr("d", path)
    .style("fill", function(d) {
      if (typeof(currentRating[d.properties.adm0_a3_is]) == 'undefined' ||
        isNaN(currentRating[d.properties.adm0_a3_is])) {
        return "lightgrey";
      }
      return color(currentRating[d.properties.adm0_a3_is]);
    })
    .style("fill-opacity", 0.7)
    .on('mousemove', function(d) {
      if (typeof(currentRating[d.properties.adm0_a3_is]) == 'undefined' ||
        isNaN(currentRating[d.properties.adm0_a3_is])) {
        text = "<b>" + d.properties.name +
          "</b><br>No available and/or relevant data";
      } else {
        text = "<b>" + nameById[d.properties.adm0_a3_is] + "</b><br>" + "<br>" +
          mapOptions[selected] + ": " + currentRating[d.properties.adm0_a3_is];
          d3.select(this).style('fill-opacity', 1);
      }

      var mouse = d3.mouse(svg.node()).map(function(d) {
        return parseInt(d);
      });

      tooltip.classed('hidden', false)
        .attr('style', 'left:' + (mouse[0] + 15) +
          'px; top:' + (mouse[1] + 1300) + 'px')
        .html(text)
    })
    .on('mouseout', function() {
      d3.selectAll('path')
        .style({
          'fill-opacity': .7
        });
      tooltip.classed('hidden', true);
    });

  var legend = svg.selectAll("g.legend")
    .data(ext_color_domain)
    .enter().append("g")
    .attr("class", "legend");

  legend.append("rect")
    .attr("x", 400)
    .attr("y", function(d, i) {
      return height - (i * ls_h) - 2 * ls_h;
    })
    .attr("width", ls_w)
    .attr("height", ls_h)
    .style("fill", function(d, i) {
      return color(d);
    })
    .style("opacity", 0.7);

  legend.append("text")
    .attr("x", 435)
    .attr("y", function(d, i) {
      return height - (i * ls_h) - ls_h - 11;
    })
    .text(function(d, i) {
      return legend_labels[i];
    });

  d3.select(self.frameElement).style("height", height + "px");
}

function updateVisualization() {
  selected0 = d3.select("#region-opt").property("value");

  filteredMalariaData1 = malariaData.filter(function(d) {
    if (selected0 != "All") {
      return (d.WHO_region == regionOpts[selected0] &&
        !isNaN(yScale(d[selected2])) &&
        !isNaN(xScale(d[selected1])) &&
        d.WHO_region != regionOpts["European"]);
    }
    return ((isNaN(yScale(d[selected2]))) == false &&
      (isNaN(xScale(d[selected1]))) == false);
  });

  filteredMalariaData1.sort(function(a, b) {
    return b.UN_population - a.UN_population;
  })

  selected1 = d3.select("#chart-opt1").property("value");
  selected2 = d3.select("#chart-opt2").property("value");

  var minX = d3.min(malariaData, function(d) {
      return d[selected1];
    }),
    maxX = d3.max(malariaData, function(d) {
      return d[selected1];
    });

  xScale.domain([minX, maxX]);

  yScale.domain([0, 100]);

  rScale.domain([d3.min(malariaData, function(d) {
      return d.UN_population;
    }),
    d3.max(malariaData, function(d) {
      return d.UN_population;
    })
  ]);

  colorScale = d3.scale.category20()
    .domain(malariaData.map(function(d) {
      return d.WHO_region;
    }));

  xAxisGroup = svg2.select(".x-axis")
    .transition()
    .duration(1000)
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "0.7em")
    .attr("transform", "rotate(-45)");

  yAxisGroup = svg2.select(".y-axis")
    .transition()
    .duration(1000)
    .call(yAxis);

  svg2.select("text.axis-title").remove();

  svg2.append("text")
    .attr("class", "axis-title")
    .attr("x", -5)
    .attr("y", 50)
    .text(function() {
      return "% " + chartOptions2[selected2];
    });

  svg2.append("text")
    .attr("class", "axis-title")
    .attr("x", widthB)
    .attr("y", heightB - 8)
    .attr("text-anchor", "end")
    .text(function() {
      return chartOptions1[selected1];
    });

  var circles = svg2.selectAll("circle")
    .data(filteredMalariaData1);

  circles.enter().append("circle")
    .attr("class", "points");

  circles
    .transition()
    .duration(1000)
    .attr("cx", getCases)
    .attr("cy", getRisk)
    .attr("r", function(d) {
      return rScale(d.UN_population);
    })
    .attr("fill", function(d) {
      return colorScale(d.WHO_region);
    })
    .attr("stroke-width", 0.5)
    .attr("stroke", "black");

  circles.exit().remove();

  circles.on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  circles.call(tip);

}

d3.select("#data-type").on("change", function() {
  d3.selectAll("g.legend").remove();
  updateChoropleth();
});

d3.select("#chart-opt2").on("change", function() {
  svg2.select("text.axis-title").remove();
  updateVisualization();
});

d3.select("#chart-opt1").on("change", function() {
  svg2.select("text.axis-title").remove();
  updateVisualization();
});

d3.select("#region-opt").on("change", function() {
  svg2.select("text.axis-title").remove();
  updateVisualization();
});
