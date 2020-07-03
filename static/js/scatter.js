// Mitesh

var powerstats = "/powerstats"

// @TODO: YOUR CODE HERE!
var svgWidth = 1200;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 80
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "Strength";
var chosenYAxis = "Intelligence";

// function used for updating x-scale var upon click on axis label
function xScale(superheroStats, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(superheroStats, d => d[chosenXAxis]) * 0.8,
        d3.max(superheroStats, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);

    return xLinearScale;

}

// function used for updating y-scale var upon click on axis label
function yScale(superheroStats, chosenYAxis) {
    // create scales. Healthcare need own scale due to big range vs others

    var yLinearScale  = d3.scaleLinear()
        .domain([d3.min(superheroStats, d => d[chosenYAxis]) * 0.8,
        d3.max(superheroStats, d => d[chosenYAxis]) * 1.2
        ])
        .range([height, 0]);
    
    return yLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderAxesX(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// function used for updating xAxis var upon click on axis label
function renderAxesY(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]))
        .attr("cy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
}

function renderName(nameGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    nameGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]))
        .attr("y", d => newYScale(d[chosenYAxis]));

    return nameGroup;
}


// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    //xlabels
    var xlabel;

    if (chosenXAxis === "Power") {
        xlabel = "Power:";
    }
    else if (chosenXAxis === "Speed") {
        xlabel = "Speed:";
    }
    else {
        xlabel = "Strength";
    }
    //ylabels
    var ylabel;

    if (chosenYAxis === "Combat") {
        ylabel = "Combat";
    }
    else if (chosenYAxis === "Durability") {
        ylabel = "Durability";
    }
    else {
        ylabel = "Intelligence";
    }
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, 0])
        .html(function (d) {
            return (`${d.Name}<br>${xlabel}: ${d[chosenXAxis]}<br>${ylabel}: ${d[chosenYAxis]}`);
        });

    //console.log(toolTip);

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });

    return circlesGroup;
}

//pull in data from data.csv

d3.json(powerstats).then(function(superheroStats){

    console.log(superheroStats);

    superheroStats.forEach(function (data) {
        data.Power = +data.Power;
        data.Speed = +data.Speed;
        data.Strength = +data.Strength;
        data.Combat + data.Combat;
        data.Durability = +data.Durability;
        data.Intelligence = +data.Intelligence;
        data.Alignment = data.Alignment;
        data.Name = data.Name;
    });

    // X and Y LinearScale function above csv import
    var xLinearScale = xScale(superheroStats, chosenXAxis);
    var yLinearScale = yScale(superheroStats, chosenYAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    // append initial circles
    
   
    var circlesGroup = chartGroup.selectAll("circle")
        .data(superheroStats)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 10)
        .attr("opacity", ".5")
        .attr("class", function(d) {
        if (d.Alignment === "good") {
            return "heroCirclegood";
        }
        else {
            return "heroCirclebad";
        }  

        });


    //append Initial Text
    var textGroup = chartGroup.selectAll(".heroText")
        .data(superheroStats)
        .enter()
        .append("text")
        .classed("heroText", true)
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        .attr("dy", 4)
        .attr("font-size", "10px")
        .text(function (d) {
            return d.Name.slice(0,1)
        });

    // Create group for three x-axis labels
    var xlabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var powerLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "Power") // value to grab for event listener
        .classed("active", true)
        .text("Power");

    var speedLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "Speed") // value to grab for event listener
        .classed("inactive", true)
        .text("Speed");

    var strengthLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "Strength") // value to grab for event listener
        .classed("inactive", true)
        .text("Strength");

    // Create group for three y-axis labels
    var ylabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${0 - margin.left / 4}, ${height / 2})`);

    var combatLabel = ylabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 0 - 20)
        .attr("value", "Combat") // value to grab for event listener
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .classed("active", true)
        .text("Combat");

    var durabilityLabel = ylabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 0 - 40)
        .attr("value", "Durability") // value to grab for event listener
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .classed("inactive", true)
        .text("Durability");

    var intelligenceLabel = ylabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 0 - 60)
        .attr("value", "Intelligence") // value to grab for event listener
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .classed("inactive", true)
        .text("Intelligence");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // x axis labels event listener
    xlabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {

                // replaces chosenXAxis with value
                chosenXAxis = value;

                // console.log(chosenXAxis)

                // functions here found above csv import
                // updates x scale for new data
                xLinearScale = xScale(superheroStats, chosenXAxis);

                // updates x axis with transition
                xAxis = renderAxesX(xLinearScale, xAxis);

                // updates circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

                // updates text with new x values
                textGroup = renderName(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);


                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

                // changes classes to change bold text
                if (chosenXAxis === "Power") {
                    powerLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    speedLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    strengthLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "Speed") {
                    powerLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    speedLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    strengthLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    powerLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    speedLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    strengthLabel
                        .classed("active", true)
                        .classed("inactive", false);

                }
            };
        });
    // yaxis labels event listener
    ylabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {

                // replaces chosenYAxis with value
                chosenYAxis = value;

                // console.log(chosenYAxis)

                // functions here found above csv import
                // updates y scale for new data
                yLinearScale = yScale(superheroStats, chosenYAxis);

                // updates x axis with transition
                yAxis = renderAxesY(yLinearScale, yAxis);

                // updates circles with new y values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

                // updates text with new x values
                textGroup = renderName(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);


                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

                // changes classes to change bold text
                if (chosenYAxis === "Combat") {
                    combatLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    durabilityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    intelligenceLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenYAxis === "Durability") {
                    combatLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    durabilityLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    intelligenceLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    combatLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    durabilityLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    intelligenceLabel
                        .classed("active", true)
                        .classed("inactive", false);

                }
            };
        });
});


