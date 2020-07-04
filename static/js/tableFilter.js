// define "/rwpowers" from flaskapp.py
var rwpowers = "/rwpowers"

// show new filtered table 
function showTable(data, tbody) {
    if (data.length > 0) {
        updateTable(data, tbody);
    } else {
        var tbody = d3.select("tbody").append("h6").text("Does not exist.");
    }
}

// update when hero input and dropdown values change 
function updateTable(data, tbody) {
    data.forEach((info) => {
        var row = tbody.append("tr");
        Object.entries(info).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

// get real world powers data from flaskapp.py
d3.json(rwpowers).then(function(hero) {
    console.log(hero);

    // select hero input element and issue resolution dropdown
    var button = d3.select("#filter-btn");
    var selection = d3.select("#resolution");

    // select tbody to place the table
    var tbody = d3.select("tbody");
    updateTable(hero, tbody);

    // empty list to store the result after it's unpacked
    let result = [];

    // action when button is clicked
    button.on("click", function() {
        
        // clear table
        tbody.html("")

        // input for new
        var inputElement = d3.select("#hero");
        
        // define input value 
        var chosenHero = inputElement.property("value");
        
        // if hero is in input field, unpack and filter table to new hero, else stay the same
        if (chosenHero) {
            result = [...hero.filter(info => info.superhero === chosenHero)];
        } else {
            result = hero;
        }

        // define option value for dropdown. nothing happens if it's not picked
        var dataset = selection.property("value");
        if (dataset) {
            result = result.filter(info => info.issueresolution === dataset);
        }

        // call showTable function 
        showTable(result, tbody);

    });

});