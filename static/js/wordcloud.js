// Powers for the Real World 
// data columns: superhero, superpower, issueresolution
// issueresolution values: Medical (COVID19), Large Scale Conflict, Miscellaneous, Climate Change, 
// Infrastructure Improvements, Education Improvements, Drug Addiction,

// define /rwpowers from flaskapp.py
var rwpowers = "/rwpowers"


// set the dimensions and margins of the graph
svgWidth = 1000
svgHeight = 1000

var margin = { top: 100, right: 100, bottom: 100, left: 100 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

d3.json(rwpowers, function (error, data) {

    var categories = d3.keys(d3.nest().key(function (d) { return d.issueresolution; }).map(data));
    var color = d3.scale.ordinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854",
    "#ff33cc","#9933ff","#009900","#00ccff","#cc99ff"]);
    var fontSize = d3.scale.pow().exponent(5).domain([0, 1]).range([10, 80]);

    var layout = d3.layout.cloud()
        .timeInterval(10)
        .size([width, height])
        .words(data)
        .rotate(function (d) { return 0; })
        .font('monospace')
        .fontSize(function (d, i) { return fontSize(Math.random()); })
        .text(function (d) { return d.superpower; })
        .spiral("archimedean")
        .on("end", draw)
        .start();

    var svg = d3.select('body').append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var wordcloud = svg.append("g")
        .attr('class', 'wordcloud')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(issueresolution);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll('text')
        .style('font-size', '20px')
        .style('fill', function (d) { return color(d); })
        .style('font', 'sans-serif');

    function draw(words) {
        wordcloud.selectAll("text")
            .data(words)
            .enter().append("text")
            .attr('class', 'word')
            .style("font-size", function (d) { return d.size + "px"; })
            .style("font-family", function (d) { return d.font; })
            .style("fill", function (d) {
                var paringObject = data.filter(function (obj) { return obj.superpower === d.text });
                return color(paringObject[0].category);
            })
            .attr("text-anchor", "middle")
            .attr("transform", function (d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
            .text(function (d) { return d.text; });
    };

});


// // get real world powers data from flaskapp.py
// d3.json(rwpowers).then(function (realWorlddata) {
//     console.log(realWorlddata);
//     // });
//     realWorlddata.forEach(function (data) {
//         data.issueresolution = data.issueresolution;
//         // console.log(data.issueresolution);
//         data.superpower = data.superpower;
//         // console.log(data.superpower);
//         data.superhero = data.superhero;
//         // console.log(data.superhero);
//     })

//     // FROM D3 LIBRARY
//     // List of words
//     var myWords = realWorlddata

//     // append the svg object to the body of the page
//     var svg = d3.select("#wordcloud").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
//     // Wordcloud features that are different from one word to the other must be here
//    var layout =  d3.layout.cloud()
//         .size([width, height])
//         .words(myWords.map(function (d) { return { text: d }; }))
//         .padding(5)        //space between words
//         .rotate(-45)       // rotation angle in degrees
//         .fontSize(20)      // font size of words
//         .on("end", draw)
//         .start();

//     // This function takes the output of 'layout' above and draw the words
//     // Wordcloud features that are THE SAME from one word to the other can be here
//     function draw(words) {
//         svg
//             .append("g")
//             .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
//             .selectAll("text")
//             .data(words)
//             .enter().append("text")
//             .style("font-size", 20)
//             .style("fill", "#69b3a2")
//             .attr("text-anchor", "middle")
//             .style("font-family", "Impact")
//             .attr("transform", function (d) {
//                 return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//             })
//             .text(function (d) { return d.text; });
//     }
// });