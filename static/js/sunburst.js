//Link from Flask to JS file  
var characters = "/characters";

d3.json(characters).then(function (data) {
  console.log(data);
});

// @TODO: YOUR CODE HERE!
var svgWidth = 2000;
var svgHeight = 2000;

var margin = {
  top: 20,
  right: 40,
  bottom: 150,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".sunburst")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// characters.value = "Alignment";
// characters.name = "Publisher";
// characters.children = "Name";

// Create the chart
var chart = am4core.create("sunburst", am4plugins_sunburst.Sunburst);

// Add multi-level data
chart.data = [{
  name: "First",
  children: [
    { name: "A1", value: 100 },
    { name: "A2", value: 60 }
  ]
},
{
  name: "Second",
  children: [
    { name: "B1", value: 135 },
    { name: "B2", value: 98 }
  ]
},
{
  name: "Third",
  children: [
    {
      name: "C1",
      children: [
        { name: "EE1", value: 130 },
        { name: "EE2", value: 87 },
        { name: "EE3", value: 55 }
      ]
    },
    { name: "C2", value: 148 },
    {
      name: "C3", children: [
        { name: "CC1", value: 53 },
        { name: "CC2", value: 30 }
      ]
    },
    { name: "C4", value: 26 }
  ]
},
{
  name: "Fourth",
  children: [
    { name: "D1", value: 415 },
    { name: "D2", value: 148 },
    { name: "D3", value: 89 }
  ]
},
{
  name: "Fifth",
  children: [
    {
      name: "E1",
      children: [
        { name: "EE1", value: 33 },
        { name: "EE2", value: 40 },
        { name: "EE3", value: 89 }
      ]
    },
    {
      name: "E2",
      value: 148
    }
  ]
}];

// Define data fields
chart.dataFields.value = "value";
chart.dataFields.name = "name";
chart.dataFields.children = "children";

// var level0 = chart.seriesTemplates.create("0");

// chart.colors.step = 2;

// chart.dataFields.color = "color";

// var level1 = chart.seriesTemplates.create("1");
// level1.slices.template.fillOpacity = 0.75;

// var level2 = chart.seriesTemplates.create("2");
// level2.slices.template.fillOpacity = 0.5;

// level1.labels.template.inside = false;
// level1.labels.template.fill = am4core.color("#000");

// chart.radius = am4core.percent(10);

// chart.legend = new am4charts.Legend();

// var level1 = chart.seriesTemplates.create("1");
// level1.slices.template.fillOpacity = 0.75;
// level1.hiddenInLegend = true;

// var level2 = chart.seriesTemplates.create("2");
// level2.slices.template.fillOpacity = 0.5;
// level2.hiddenInLegend = true;