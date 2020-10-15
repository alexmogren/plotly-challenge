//Connect data
console.log(`app.js`);

function DrawBubbleChart(sampleId)
{
    console.log(`DrawBubbleChart(${sampleId})`);
}

function DrawBargraph(sampleId)
{
    console.log(`DrawBargraph(${sampleId})`);
}




//Create bar plot
function DrawBargraph(sampleId)
{
    d3.json("samples.json").then((data) => 
    {

        var samples = data.samples;
        var outputArray = samples.filter(s => s.id == sampleId);
        var result = outputArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}` ).reverse();
//Populate bar graph
        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }
//Create bar layout
        var barLayout = {
            title: "Top Ten Bacteria Cultures Found",
            margin: {t: 35, l: 140}
        }
        Plotly.newPlot("bar", [barData], barLayout);
    });

}
//Create bubble plot
function DrawBubbleChart(sampleId)
{   console.log("For Bubbleplot")

    d3.json("samples.json").then((data) => 
    {
        var samples = data.samples.filter(s => s.id == sampleId);
        var otu_Ids = samples.otu_ids;
        var otu_titles = samples.otu_labels;
        var bub_sample_values = samples.sample_values;
//Populate bubble plot with correct data
        var bubbledata = {
            x: otu_Ids,
            y: bub_sample_values,
            text: otu_titles,
            type: "bubble",
            mode: "markers",
            marker: {
                size: bub_sample_values,
                color: otu_Ids
                
            }
        };
//Create bubble layout
        var bubbleLayout = {
            title: "All Microbial Cultures Found in Sample",
            xaxis: {title: "OTU IDs"},
            yaxis: {title: "Sample Values"},
            

        };
        Plotly.newPlot("bubble", [bubbledata], bubbleLayout);
    });
}
//Create option changed website feature
function optionChanged(newSampleId)
{
    console.log(`User selected ${newSampleId}`);

    DrawBargraph(newSampleId);
    DrawBubbleChart(newSampleId);
    ShowDemographics(newSampleId);

}
//Create InitDashboard to display charts
function InitDashboard()
{
    console.log(`Calling InitDashboard()`);

}

InitDashboard();
{

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {

        var sample_Names = data.names;

        sample_Names.forEach((sampleId) => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });
            
        var sampleId = sample_Names[0];
        console.log("Starting sample:", sampleId);

        DrawBargraph(sampleId);
        DrawBubbleChart(sampleId);
        ShowDemographics(sampleId);
        
    });
}
console.log("this is d3");