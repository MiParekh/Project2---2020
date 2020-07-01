// Mitesh

var powerstats = "/powerstats"

// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 1500 - margin.left - margin.right,
    height = 1500 - margin.top - margin.bottom,
    innerRadius = 200,
    outerRadius = Math.min(width, height) / 2;   

// append the svg object to the body of the page
var svg = d3.select("#bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 100) + ")"); // Add 100 on Y translation, cause upper bars are longer

d3.json(powerstats).then(function(superheroStats) {

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


    });

    var top10 = superheroStats.sort(function(a,b) {
        return d3.descending(+a.Power,+b.Power);
    }).slice(0,10);

       console.log(top10);

    // X scale
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    
        .align(0)                 
        .domain(superheroStats.map(function (d) { return d.Name; })); 

    // Y scale
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   
        .domain([0, 10000]); 

    // Add bars
    svg.append("g")
        .selectAll("path")
        .data(superheroStats)
        .enter()
        .append("path")
        .attr("fill", "#69b3a2")
        .attr("d", d3.arc()     
            .innerRadius(innerRadius)
            .outerRadius(function (d) { return y(d.Speed); })
            .startAngle(function (d) { return x(d.Name); })
            .endAngle(function (d) { return x(d.Name) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))

  // Add the labels
  svg.append("g")
      .selectAll("g")
      .data(superheroStats)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x(d.Name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.Name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.Speed)+10) + ",0)"; })
      .append("text")
        .text(function(d){return(d.Name)})
        .attr("transform", function(d) { return (x(d.Name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")


});
