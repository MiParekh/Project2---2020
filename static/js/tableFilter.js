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
d3.json(rwpowers).then(function (hero) {
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
    button.on("click", function () {

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

// Radar chart
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Medical (COVID-19)', "Large Scale Conflict", "Infrastructure Improvements", "Miscellaneous",
            "Climate Change", "Education Improvements", "Drug Addiction"],
        datasets: [
            {
                label: 'SuperHeros',
                backgroundColor: 'rgba(255, 80, 80,0.2)',
                borderColor: 'rgba(255, 80, 80,1)',
                data: [531, 492, 432, 337, 244, 148, 121]

            },
            {
                label: 'Spectre',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'pink',
                data: [11, 4, 12, 7, 4, 6, 5]

            },
            {
                label: 'Amazo',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                data: [14, 8, 11, 6, 2, 3, 0]

            },
            {
                label: 'Living Tribunal',
                backgroundColor: 'rgba(255, 204, 0,0.2)',
                borderColor: 'rgba(255, 204, 0,1)',
                data: [7, 8, 9, 5, 2, 3]

            },
            {
                label: 'Martian Manhunter',
                backgroundColor: 'rgba(51, 204, 51,0.2)',
                borderColor: 'rgba(51, 204, 51,1)',
                data: [11, 5, 8, 6, 0, 3, 2]

            },
            {
                label: 'Captain Marvel',
                backgroundColor: 'rgba(204, 51, 0,0.2)',
                borderColor: 'rgba(204, 51, 0,1)',
                data: [12, 4, 7, 4, 1, 3, 2]

            },
            {
                label: 'Franklin Richards',
                backgroundColor: 'rgba(204, 102, 255,0.2)',
                borderColor: 'rgba(204, 102, 255,1)',
                data: [12, 2, 6, 2, 0, 5, 2]

            },
            {
                label: 'Wonder Woman',
                backgroundColor: 'rgba(153, 51, 102,0.2)',
                borderColor: 'rgba(153, 51, 102,1)',
                data: [9, 8, 3, 6, 0, 3, 1]

            },
            {
                label: 'Galactus',
                backgroundColor: 'rgba(0, 0, 255,0.2)',
                borderColor: 'rgba(0, 0, 255,1)',
                data: [12, 3, 8, 4, 1, 3, 1]

            },
            {
                label: 'Supergirl',
                backgroundColor: 'rgba(255, 0, 102,0.2)',
                borderColor: 'rgba(255, 0, 102,1)',
                data: [10, 4, 5, 4, 1, 2, 1]

            },
            {
                label: 'Superman',
                backgroundColor: 'rgba(153, 204, 255,0.2)',
                borderColor: 'rgba(153, 204, 255,1)',
                data: [10, 4, 6, 5, 1, 2, 1]

            }],
        options: {
            title: {
                display: true,
                text: 'Top Superheros Who Can Help'
            }
        }
    }

});
