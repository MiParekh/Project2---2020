// Powers for the Real World 
// data columns: superhero, superpower, issueresolution
// issueresolution values: Medical (COVID19), Large Scale Conflict, Miscellaneous, Climate Change, 
// Infrastructure Improvements, Education Improvements, Drug Addiction,

// define /rwpowers from flaskapp.py
var link = "/rwpowers"


// set the dimensions and margins of the graph
svgWidth = 2000
svgHeight = 2000

var margin = { top: 20, right: 40, bottom: 150, left: 100 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

// var svg = d3.select('body').append("svg")
//     .attr("width", layout.size()[0])
//     .attr("height", layout.size()[1])
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.json(link).then(function (data) {
    console.log(data);

    data.forEach(function (data) {
        resolution = data.issueresolution;
        // console.log(resolution);
        power = data.superpower;
        console.log(power);
        hero = data.superhero;
        // console.log(hero);
    });
    // });

    var resolution = d3.keys(d3.nest().key(function (d) { return d.issueresolution; }).map(data));
    // var color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854",
    //     "#ff33cc", "#9933ff"]);
    var fontSize = d3.scalePow().exponent(7).domain([0, 1]).range([10, 80]);

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

    var svg = d3.select("#wordcloud").append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var wordcloud = svg.append("g")
        .attr('class', 'cloud')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var x0 = d3.scaleOrdinal()
        .rangeRoundBands([0, width], .1)
        .domain(resolution);

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
            // .style("fill", function (d) {
            //     var paringObject = data.filter(function (obj) { return obj.power === d.text });
            //     return color(paringObject[0].issueresolution);
            // })
            .attr("text-anchor", "middle")
            .attr("transform", function (d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
            .text(function (d) { return d.text; });
    };

});

// // Word cloud layout by Jason Davies, http://www.jasondavies.com/word-cloud/
// // Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf
// (function () {

//     if (typeof define === "function" && define.amd) define(["d3"], cloud);
//     else cloud(this.d3);

//     function cloud(d3) {
//         d3.layout.cloud = function cloud() {
//             var size = [256, 256],
//                 text = cloudText,
//                 font = cloudFont,
//                 fontSize = cloudFontSize,
//                 fontStyle = cloudFontNormal,
//                 fontWeight = cloudFontNormal,
//                 rotate = cloudRotate,
//                 padding = cloudPadding,
//                 spiral = archimedeanSpiral,
//                 words = [],
//                 timeInterval = Infinity,
//                 event = d3.dispatch("word", "end"),
//                 timer = null,
//                 random = Math.random,
//                 cloud = {};

//             cloud.start = function () {
//                 var board = zeroArray((size[0] >> 5) * size[1]),
//                     bounds = null,
//                     n = words.length,
//                     i = -1,
//                     tags = [],
//                     data = words.map(function (d, i) {
//                         d.text = text.call(this, d, i);
//                         d.font = font.call(this, d, i);
//                         d.style = fontStyle.call(this, d, i);
//                         d.weight = fontWeight.call(this, d, i);
//                         d.rotate = rotate.call(this, d, i);
//                         d.size = ~~fontSize.call(this, d, i);
//                         d.padding = padding.call(this, d, i);
//                         return d;
//                     }).sort(function (a, b) { return b.size - a.size; });

//                 if (timer) clearInterval(timer);
//                 timer = setInterval(step, 0);
//                 step();

//                 return cloud;

//                 function step() {
//                     var start = Date.now();
//                     while (Date.now() - start < timeInterval && ++i < n && timer) {
//                         var d = data[i];
//                         d.x = (size[0] * (random() + .5)) >> 1;
//                         d.y = (size[1] * (random() + .5)) >> 1;
//                         cloudSprite(d, data, i);
//                         if (d.hasText && place(board, d, bounds)) {
//                             tags.push(d);
//                             event.word(d);
//                             if (bounds) cloudBounds(bounds, d);
//                             else bounds = [{ x: d.x + d.x0, y: d.y + d.y0 }, { x: d.x + d.x1, y: d.y + d.y1 }];
//                             // Temporary hack
//                             d.x -= size[0] >> 1;
//                             d.y -= size[1] >> 1;
//                         }
//                     }
//                     if (i >= n) {
//                         cloud.stop();
//                         event.end(tags, bounds);
//                     }
//                 }
//             }

//             cloud.stop = function () {
//                 if (timer) {
//                     clearInterval(timer);
//                     timer = null;
//                 }
//                 return cloud;
//             };

//             function place(board, tag, bounds) {
//                 var perimeter = [{ x: 0, y: 0 }, { x: size[0], y: size[1] }],
//                     startX = tag.x,
//                     startY = tag.y,
//                     maxDelta = Math.sqrt(size[0] * size[0] + size[1] * size[1]),
//                     s = spiral(size),
//                     dt = random() < .5 ? 1 : -1,
//                     t = -dt,
//                     dxdy,
//                     dx,
//                     dy;

//                 while (dxdy = s(t += dt)) {
//                     dx = ~~dxdy[0];
//                     dy = ~~dxdy[1];

//                     if (Math.min(Math.abs(dx), Math.abs(dy)) >= maxDelta) break;

//                     tag.x = startX + dx;
//                     tag.y = startY + dy;

//                     if (tag.x + tag.x0 < 0 || tag.y + tag.y0 < 0 ||
//                         tag.x + tag.x1 > size[0] || tag.y + tag.y1 > size[1]) continue;
//                     // TODO only check for collisions within current bounds.
//                     if (!bounds || !cloudCollide(tag, board, size[0])) {
//                         if (!bounds || collideRects(tag, bounds)) {
//                             var sprite = tag.sprite,
//                                 w = tag.width >> 5,
//                                 sw = size[0] >> 5,
//                                 lx = tag.x - (w << 4),
//                                 sx = lx & 0x7f,
//                                 msx = 32 - sx,
//                                 h = tag.y1 - tag.y0,
//                                 x = (tag.y + tag.y0) * sw + (lx >> 5),
//                                 last;
//                             for (var j = 0; j < h; j++) {
//                                 last = 0;
//                                 for (var i = 0; i <= w; i++) {
//                                     board[x + i] |= (last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
//                                 }
//                                 x += sw;
//                             }
//                             delete tag.sprite;
//                             return true;
//                         }
//                     }
//                 }
//                 return false;
//             }

//             cloud.timeInterval = function (_) {
//                 return arguments.length ? (timeInterval = _ == null ? Infinity : _, cloud) : timeInterval;
//             };

//             cloud.words = function (_) {
//                 return arguments.length ? (words = _, cloud) : words;
//             };

//             cloud.size = function (_) {
//                 return arguments.length ? (size = [+_[0], +_[1]], cloud) : size;
//             };

//             cloud.font = function (_) {
//                 return arguments.length ? (font = d3.functor(_), cloud) : font;
//             };

//             cloud.fontStyle = function (_) {
//                 return arguments.length ? (fontStyle = d3.functor(_), cloud) : fontStyle;
//             };

//             cloud.fontWeight = function (_) {
//                 return arguments.length ? (fontWeight = d3.functor(_), cloud) : fontWeight;
//             };

//             cloud.rotate = function (_) {
//                 return arguments.length ? (rotate = d3.functor(_), cloud) : rotate;
//             };

//             cloud.text = function (_) {
//                 return arguments.length ? (text = d3.functor(_), cloud) : text;
//             };

//             cloud.spiral = function (_) {
//                 return arguments.length ? (spiral = spirals[_] || _, cloud) : spiral;
//             };

//             cloud.fontSize = function (_) {
//                 return arguments.length ? (fontSize = d3.functor(_), cloud) : fontSize;
//             };

//             cloud.padding = function (_) {
//                 return arguments.length ? (padding = d3.functor(_), cloud) : padding;
//             };

//             cloud.random = function (_) {
//                 return arguments.length ? (random = _, cloud) : random;
//             };

//             return d3.rebind(cloud, event, "on");
//         };

//         function cloudText(d) {
//             return d.text;
//         }

//         function cloudFont() {
//             return "serif";
//         }

//         function cloudFontNormal() {
//             return "normal";
//         }

//         function cloudFontSize(d) {
//             return Math.sqrt(d.value);
//         }

//         function cloudRotate() {
//             return (~~(Math.random() * 6) - 3) * 30;
//         }

//         function cloudPadding() {
//             return 1;
//         }

//         // Fetches a monochrome sprite bitmap for the specified text.
//         // Load in batches for speed.
//         function cloudSprite(d, data, di) {
//             if (d.sprite) return;
//             c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
//             var x = 0,
//                 y = 0,
//                 maxh = 0,
//                 n = data.length;
//             --di;
//             while (++di < n) {
//                 d = data[di];
//                 c.save();
//                 c.font = d.style + " " + d.weight + " " + ~~((d.size + 1) / ratio) + "px " + d.font;
//                 var w = c.measureText(d.text + "m").width * ratio,
//                     h = d.size << 1;
//                 if (d.rotate) {
//                     var sr = Math.sin(d.rotate * cloudRadians),
//                         cr = Math.cos(d.rotate * cloudRadians),
//                         wcr = w * cr,
//                         wsr = w * sr,
//                         hcr = h * cr,
//                         hsr = h * sr;
//                     w = (Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f) >> 5 << 5;
//                     h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
//                 } else {
//                     w = (w + 0x1f) >> 5 << 5;
//                 }
//                 if (h > maxh) maxh = h;
//                 if (x + w >= (cw << 5)) {
//                     x = 0;
//                     y += maxh;
//                     maxh = 0;
//                 }
//                 if (y + h >= ch) break;
//                 c.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
//                 if (d.rotate) c.rotate(d.rotate * cloudRadians);
//                 c.fillText(d.text, 0, 0);
//                 if (d.padding) c.lineWidth = 2 * d.padding, c.strokeText(d.text, 0, 0);
//                 c.restore();
//                 d.width = w;
//                 d.height = h;
//                 d.xoff = x;
//                 d.yoff = y;
//                 d.x1 = w >> 1;
//                 d.y1 = h >> 1;
//                 d.x0 = -d.x1;
//                 d.y0 = -d.y1;
//                 d.hasText = true;
//                 x += w;
//             }
//             var pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
//                 sprite = [];
//             while (--di >= 0) {
//                 d = data[di];
//                 if (!d.hasText) continue;
//                 var w = d.width,
//                     w32 = w >> 5,
//                     h = d.y1 - d.y0;
//                 // Zero the buffer
//                 for (var i = 0; i < h * w32; i++) sprite[i] = 0;
//                 x = d.xoff;
//                 if (x == null) return;
//                 y = d.yoff;
//                 var seen = 0,
//                     seenRow = -1;
//                 for (var j = 0; j < h; j++) {
//                     for (var i = 0; i < w; i++) {
//                         var k = w32 * j + (i >> 5),
//                             m = pixels[((y + j) * (cw << 5) + (x + i)) << 2] ? 1 << (31 - (i % 32)) : 0;
//                         sprite[k] |= m;
//                         seen |= m;
//                     }
//                     if (seen) seenRow = j;
//                     else {
//                         d.y0++;
//                         h--;
//                         j--;
//                         y++;
//                     }
//                 }
//                 d.y1 = d.y0 + seenRow;
//                 d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
//             }
//         }

//         // Use mask-based collision detection.
//         function cloudCollide(tag, board, sw) {
//             sw >>= 5;
//             var sprite = tag.sprite,
//                 w = tag.width >> 5,
//                 lx = tag.x - (w << 4),
//                 sx = lx & 0x7f,
//                 msx = 32 - sx,
//                 h = tag.y1 - tag.y0,
//                 x = (tag.y + tag.y0) * sw + (lx >> 5),
//                 last;
//             for (var j = 0; j < h; j++) {
//                 last = 0;
//                 for (var i = 0; i <= w; i++) {
//                     if (((last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0))
//                         & board[x + i]) return true;
//                 }
//                 x += sw;
//             }
//             return false;
//         }

//         function cloudBounds(bounds, d) {
//             var b0 = bounds[0],
//                 b1 = bounds[1];
//             if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
//             if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
//             if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
//             if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
//         }

//         function collideRects(a, b) {
//             return a.x + a.x1 > b[0].x && a.x + a.x0 < b[1].x && a.y + a.y1 > b[0].y && a.y + a.y0 < b[1].y;
//         }

//         function archimedeanSpiral(size) {
//             var e = size[0] / size[1];
//             return function (t) {
//                 return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
//             };
//         }

//         function rectangularSpiral(size) {
//             var dy = 4,
//                 dx = dy * size[0] / size[1],
//                 x = 0,
//                 y = 0;
//             return function (t) {
//                 var sign = t < 0 ? -1 : 1;
//                 // See triangular numbers: T_n = n * (n + 1) / 2.
//                 switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
//                     case 0: x += dx; break;
//                     case 1: y += dy; break;
//                     case 2: x -= dx; break;
//                     default: y -= dy; break;
//                 }
//                 return [x, y];
//             };
//         }

//         // TODO reuse arrays?
//         function zeroArray(n) {
//             var a = [],
//                 i = -1;
//             while (++i < n) a[i] = 0;
//             return a;
//         }

//         var cloudRadians = Math.PI / 180,
//             cw = 1 << 11 >> 5,
//             ch = 1 << 11,
//             canvas,
//             ratio = 1;

//         if (typeof document !== "undefined") {
//             canvas = document.createElement("canvas");
//             canvas.width = 1;
//             canvas.height = 1;
//             ratio = Math.sqrt(canvas.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
//             canvas.width = (cw << 5) / ratio;
//             canvas.height = ch / ratio;
//         } else {
//             // Attempt to use node-canvas.
//             canvas = new Canvas(cw << 5, ch);
//         }

//         var c = canvas.getContext("2d"),
//             spirals = {
//                 archimedean: archimedeanSpiral,
//                 rectangular: rectangularSpiral
//             };
//         c.fillStyle = c.strokeStyle = "red";
//         c.textAlign = "center";
//     }

// })();

// // // get real world powers data from flaskapp.py
// // d3.json(rwpowers).then(function (realWorlddata) {
// //     console.log(realWorlddata);
// //     // });
// //     realWorlddata.forEach(function (data) {
// //         data.issueresolution = data.issueresolution;
// //         // console.log(data.issueresolution);
// //         data.superpower = data.superpower;
// //         // console.log(data.superpower);
// //         data.superhero = data.superhero;
// //         // console.log(data.superhero);
// //     })

// //     // FROM D3 LIBRARY
// //     // List of words
// //     var myWords = realWorlddata

// //     // append the svg object to the body of the page
// //     var svg = d3.select("#wordcloud").append("svg")
// //         .attr("width", width + margin.left + margin.right)
// //         .attr("height", height + margin.top + margin.bottom)
// //         .append("g")
// //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// //     // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// //     // Wordcloud features that are different from one word to the other must be here
// //    var layout =  d3.layout.cloud()
// //         .size([width, height])
// //         .words(myWords.map(function (d) { return { text: d }; }))
// //         .padding(5)        //space between words
// //         .rotate(-45)       // rotation angle in degrees
// //         .fontSize(20)      // font size of words
// //         .on("end", draw)
// //         .start();

// //     // This function takes the output of 'layout' above and draw the words
// //     // Wordcloud features that are THE SAME from one word to the other can be here
// //     function draw(words) {
// //         svg
// //             .append("g")
// //             .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
// //             .selectAll("text")
// //             .data(words)
// //             .enter().append("text")
// //             .style("font-size", 20)
// //             .style("fill", "#69b3a2")
// //             .attr("text-anchor", "middle")
// //             .style("font-family", "Impact")
// //             .attr("transform", function (d) {
// //                 return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
// //             })
// //             .text(function (d) { return d.text; });
// //     }
// // });