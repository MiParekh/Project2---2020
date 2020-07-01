// Powers for the Real World 
// data columns: superhero, superpower, issueresolution
// issueresolution values: Medical (COVID19), Large Scale Conflict, Miscellaneous, Climate Change, 
// Infrastructure Improvements, Education Improvements, Drug Addiction,

// define /rwpowers from flaskapp.py
var rwpowers = "/rwpowers"

// get real world powers data from flaskapp.py
d3.json(rwpowers).then(function (data) {
console.log(data);
});

// // define keys in rwpowers to access values
//     var resolution = data.issueresolution;
//     var superpower = data.superpower;
//     var superhero = data.superhero;


    // define keys in rwpowers to access values a different way
    var resolution = Object.values(issueresolution);
    // var superpower = Object.superpower;
    // var superhero = Object.superhero;

// FROM D3 LIBRARY
// List of words
var myWords = resolution

// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#wordcloud").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
    .size([width, height])
    .words(myWords.map(function (d) { return { text: d }; }))
    .padding(5)        //space between words
    .rotate(-45)       // rotation angle in degrees
    .fontSize(20)      // font size of words
    .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
    svg
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", 20)
        .style("fill", "#69b3a2")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) { return d.text; });
}


// // TWO WORDCLOUD FROM ZING CHART
// let chartConfig = {
//     backgroundColor: '#ffffff',
//     graphset: [
//         {
//             type: 'wordcloud',
//             backgroundColor: '#F2F3F8',
//             width: '50%',
//             height: '100%',
//             x: '0%',
//             y: '0%',
//             title: {
//                 text: 'Real World Issue',
//                 backgroundColor: 'none',
//                 fontColor: '#000000',
//                 fontSize: '16px',
//                 y: '5%'
//             },
//             subtitle: {
//                 text: 'Most Common Issue to be Solved',
//                 backgroundColor: 'none',
//                 fontSize: '12px',
//                 y: '12%'
//             },
//             options: {
//                 text: resolution,
//                 colorType: 'palette',
//                 fontFamily: 'Arial',
//                 // ignore: ['in', 'of', 'by', 'an', 'on', 'it', 'to', 'the', 'and', 'from', 'didn', 'more', 'they', 'when', 'recently', 'come', 'which', 'dont', 'is', 'just', 'very', 'this', 'I', 'were', 'still', 'with', 'too', 'would', 'that', 'here', 'have', 'had', 'like', 'been'],
//                 maxFontSize: '30px',
//                 // maxItems: 20,
//                 minFontSize: '9px',
//                 minLength: 4,
//                 palette: ['#57aa83', '#c13f43', '#2c497d', '#8965ad', '#686d7b', '#fd625e', '#d7d7d9', '#2e67c6'],
//                 rotate: true
//             },
//             plotarea: {
//                 margin: '50px auto auto auto'
//             }
//         },
//         {
//             type: 'wordcloud',
//             backgroundColor: '#F2F3F8',
//             width: '50%',
//             height: '100%',
//             x: '51%',
//             y: '0%',
//             title: {
//                 text: 'Superpower',
//                 backgroundColor: 'none',
//                 fontColor: '#000000',
//                 fontSize: '16px',
//                 y: '5%'
//             },
//             subtitle: {
//                 text: 'Most Common Superpower',
//                 backgroundColor: 'none',
//                 fontSize: '12px',
//                 y: '12%'
//             },
//             options: {
//                 text: superpower,
//                 colorType: 'palette',
//                 fontFamily: 'Arial',
//                 // ignore: ['in', 'of', 'by', 'an', 'on', 'it', 'to', 'the', 'and', 'from', 'didn', 'more', 'they', 'when', 'recently', 'come', 'which', 'dont', 'is', 'just', 'very', 'this', 'I', 'were', 'still', 'with', 'too', 'would', 'that', 'here', 'have', 'had', 'like', 'been'],
//                 maxFontSize: '30px',
//                 // maxItems: 20,
//                 minFontSize: '9px',
//                 minLength: 4,
//                 palette: ['#57aa83', '#c13f43', '#2c497d', '#8965ad', '#686d7b', '#fd625e', '#d7d7d9', '#2e67c6'],
//                 rotate: true
//             },
//             plotarea: {
//                 margin: '50px auto auto auto'
//             }
//         }
//     ]
// };

// zingchart.render({
//     id: 'wordcloud',
//     output: "svg",
//     data: chartConfig,
//     height: '100%',
//     width: '100%',
//     cache: {
//         csv: true
//     }
// });