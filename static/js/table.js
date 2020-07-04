// define /rwpowers from flaskapp.py
var rwpowers = "/rwpowers"

// get real world powers data from flaskapp.py
d3.json(rwpowers).then(function (hero) {
    console.log(hero);

    var button = d3.select("#filter-btn");
    var selection = d3.select("#resolution")
    // Grab the text in the input field
    // Declare a variable for that text so it will be the point of reference of the filter
    var tbody = d3.select("tbody");

    hero.forEach((info) => {
        var row = tbody.append("tr");
        Object.entries(info).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
    console.log("hey");
    button.on("click", function () {
        d3.select("tbody").html("")
        d3.event.preventDefault();
        // var chosenHero = d3.select("#hero").property("value");
        // console.log(chosenHero);

        var inputElement = d3.select("#hero");
        // Get the value property of the input element
        var chosenHero = inputElement.property("value");
        // Print the value to the console
        console.log(chosenHero);

        console.log("hello world");
        // var chosenResolution = d3.select("#resolution").property("value");
        if (chosenHero) {
            var filteredData = hero.filter(info => info.superhero === chosenHero);
        }
        else {
            var filteredData = hero;
        }
        // if (chosenResolution) {
        //     var filteredData = filteredData.filter(info => info.issueresolution === chosenResolution);
        // }
        if (filteredData.length > 0) {
            var tbody = d3.select("tbody");
            console.log("test");
            filteredData.forEach((info) => {
                var row = tbody.append("tr");
                Object.entries(info).forEach(([key, value]) => {
                    var cell = row.append("td");
                    cell.text(value);
                });
            });
        }

        else {
            var tbody = d3.select("tbody").append("h6").text("Does not exist.");
        }
    });

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#resolution").on("click", tableUpdate);

    function tableUpdate() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#resolution");

        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");

        // var data = [];

        // if (dataset === 'Medical (COVID-19)'){
        //     data = issueresolution.
        // };

        var option = [];

        if (dataset === 'Medical (COVID-19)') {
            var option = hero.filter(info => info.issueresolution === 'Medical (COVID-19)');
        }

        if (dataset === 'Large Scale Conflict') {
            var option = hero.filter(info => info.issueresolution === 'Large Scale Conflict');
        }

        if (dataset === 'Infrastructure Improvements') {
            var option = hero.filter(info => info.issueresolution === 'Infrastructure Improvements');
        }

        if (dataset === 'Miscellaneous') {
            var option = hero.filter(info => info.issueresolution === 'Miscellaneous');
        }

        if (dataset === 'Climate Change') {
            var option = hero.filter(info => info.issueresolution === 'Climate Change');
        }

        if (dataset === 'Education Improvements') {
            var option = hero.filter(info => info.issueresolution === 'Education Improvements');
        }

        else (dataset === 'Drug Addiction')
        var option = hero.filter(info => info.issueresolution === 'Drug Addiction');

        // return option;
        if (option.length > 0) {
            var tbody = d3.select("tbody");
            console.log("test");
            filteredData.forEach((info) => {
                var row = tbody.append("tr");
                Object.entries(info).forEach(([key, value]) => {
                    var cell = row.append("td");
                    cell.text(value);
                });
            });
        }
    }
});