// Mitesh

var powerstats = "/powerstats"

//Create an SVG wrapper, append an SVG group that will hold our chart, and hold margins
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom,
    innerRadius = 100,
    outerRadius = Math.min(width, height) / 2;

var svg = d3.select("#bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 100) + ")"); // Add 100 on Y translation, cause upper bars are longer

d3.json(powerstats).then(function (superheroStats) {

    console.log(superheroStats);

    superheroStats.forEach(function (data) {
        data.Power = +data.Power;
        //console.log(data.Power);
        data.Speed = +data.Speed;
        //console.log(data.Speed);
        data.Strength = +data.Strength;
        //console.log(data.Strength);
        data.Combat + data.Combat;
        //console.log(data.Combat);
        data.Durability = +data.Durability;
        //console.log(data.Durability);
        data.Intelligence = +data.Intelligence;
        //console.log(data.Intelligence);
        data.Alignment = data.Alignment;
        //console.log(data.Alignment);
        data.Name = data.Name;
        //console.log(data.Name);
        data.Total = +data.Total;


    });

    // var powertop = superheroStats.sort(function (a, b) {
    //     return d3.descending(+a.Power, +b.Power);
    // }).slice(0, 150);

    // console.log(powertop);

    // var speedtop = superheroStats.sort(function (a, b) {
    //     return d3.descending(+a.Speed, +b.Speed);
    // }).slice(0, 150);

    // console.log(speedtop);

    // var strengthtop = superheroStats.sort(function (a, b) {
    //     return d3.descending(+a.Strength, +b.Strength);
    // }).slice(0, 150);

    // console.log(strengthtop);

    // var combattop = superheroStats.sort(function (a, b) {
    //     return d3.descending(+a.Combat, +b.Combat);
    // }).slice(0, 150);

    // console.log(combattop);

    // var durabilitytop = superheroStats.sort(function (a, b) {
    //     return d3.descending(+a.Durability, +b.Durability);
    // }).slice(0, 150);

    // console.log(durabilitytop);

    // var intelligencetop = superheroStats.sort(function (a, b) {
    //     return d3.descending(+a.Intelligence, +b.Intelligence);
    // }).slice(0, 150);

    // console.log(intelligencetop);

    var totaltop = superheroStats.sort(function (a, b) {
        return d3.descending(+a.Total, +b.Total);
    }).slice(0, 150);

    console.log(totaltop);

    //Initial X Axis


    var chosenYAxis = "Total Score"


    // X scale
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])
        .align(0)
        .domain(totaltop.map(function (d) { return d.Name; }));

    // Y scale
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])
        .domain([0, 20000]);

    // Add bars
    var barsGroup = svg.append("g")
    .selectAll("path")
    .data(totaltop)
    .enter()
    .append("path")
    .attr("class", function (d) {
        if (d.Alignment === "good") {
            return "heroBargood";
        }

        else if (d.Alignment === "bad") {
            return "heroBarbad";
        }
        else {
            return "heroBarneutral";
        }
    })
    .attr("d", d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(function (d) { return y(d.Total * 15); })
        .startAngle(function (d) { return x(d.Name); })
        .endAngle(function (d) { return x(d.Name) + x.bandwidth(); })
        .padAngle(0.01)
        .padRadius(innerRadius))


    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, 0])
        .html(function (d) {
            return (`${d.Name}<br>Total: ${d.Total}<br>Power: ${d.Power}<br>Speed: ${d.Speed}<br>Strength: ${d.Strength}<br>Combat: ${d.Combat}<br>Durability: ${d.Durability}<br>Intelligence: ${d.Intelligence}`);
        });

    //console.log(toolTip);
    barsGroup.call(toolTip);

    barsGroup.on("mouseover", function (data) {
        toolTip.show(data);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });


    // Add the labels
    svg.append("g")
        .selectAll("g")
        .data(totaltop)
        .enter()
        .append("g")
        .attr("text-anchor", function (d) { return (x(d.Name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function (d) { return "rotate(" + ((x(d.Name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d.Total) + 70) + ",0)"; })
        .append("text")
        .attr("fill", "white")
        .text(function (d) { return (d.Name) })
        .attr("transform", function (d) { return (x(d.Name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")



});