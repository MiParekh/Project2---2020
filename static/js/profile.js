var link = "/profile"

          d3.json(link).then( (data)=>{
            console.log(data);
          });
          
          function init(chosenCharacter){
            var dropdownMenu = d3.select("#selDataset");
            var panelbox = d3.select("#sample-metadata");
            panelbox.html("");
            d3.json("samples.json").then((data)=>{
                
                // dashboard and panelbox
                var names = data.names
                names.forEach(function(d) {
                        dropdownMenu.append("option")
                                    .text(d)
                                    .property("value", d);                        
                })
                
                var mData = data.metadata[0];
                Object.entries(mData).forEach(([key, value]) => {
                        var paneltext = `${key} : ${value}`;
                        panelbox.append("h6")
                                .append("strong")
                                .text(paneltext);
                })
                
                // bar chart values
                // values
                var sample_values = data.samples[0].sample_values.slice(0,10);
                var labels = data.samples[0].otu_ids.slice(0,10);
                var sliced_labels = labels.map(item => `OTU ${item}`);
                var hovertext = data.samples[0].otu_labels.slice(0,10);
        
                var trace1 = {
                        x: sample_values.reverse(),
                        y: sliced_labels.reverse(),
                        type: "bar",
                        orientation: "h",
                        text: hovertext.reverse(),
                };
                var bar_data = [trace1];
                var layout = {
                        title: "Bar Chart",
                        xaxis: { title: "Sample Values" },
                        yaxis: { title: "OTU ID" }
                };
                Plotly.newPlot("bar", bar_data, layout);
                
                // bubble chart
                var x_values = data.samples[0].otu_ids;
                var y_values = data.samples[0].sample_values;
                var mSize = data.samples[0].sample_values;
                var mColor = data.samples[0].sample_values;
                var hovertext = data.samples[0].otu_labels;
        
                var trace1 = {
                        x: x_values,
                        y: y_values,
                        mode: 'markers',
                        marker: {
                          size: mSize,
                          color: mColor
                        }
                      };
                      
                var bub_data = [trace1];
                
                var layout = {
                        title: 'Bubble Chart',
                        xaxis: { title: "OTU ID" },
                        yaxis: { title: "Sample Values" },
                        showlegend: false,
                        height: 600,
                        width: 1000
                };
                Plotly.newPlot('bubble', bub_data, layout);
        
                // gauge chart
                var wfreq = data.metadata[0]["wfreq"];
                var data = [
                        {
                        domain: { 
                                x: [0, 1],
                                y: [0, 1] 
                                },
                        value: wfreq,
                        title: { text: "Belly Button Washing Frequency"},
                        type: "indicator",
                        mode: "gauge+number",
                        gauge: { axis: { range: [null, 9] } }
                        }
                ];
                var layout = {
                        width: 600, 
                        height: 500, 
                        margin: {
                                t: 0, 
                                b: 0 
                        } 
                };
                Plotly.newPlot('gauge', data, layout);
            });
        }