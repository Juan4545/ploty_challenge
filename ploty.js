d3.json("data_samples.json").then((data) => {
	console.log(data)
//Creamos los arrglos por cada data de nuestro diccionario	
var data_samples = [];
var data_metadata = [];

data_samples=data.samples
data_metadata = data.metadata

//var top10data=data_samples.slice(0,10);
//var top10data1=data_metadata.slice(0,10);
//console.log(top10data)


//d3.selectAll("#selDataset").on("change", updatePlotly(top10data));


//Llenamos el drop down con la informacion del data.names
var dropdown = d3.select("#selDataset");
data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
//var metadatainfo = d3.select("#sample-metadata");

//metadatainfo.html("");
//console.log(data_metadata[0])

//Object.entries(data_metadata[0]).forEach((key) => {   
//            metadatainfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
//        });


//Obtenemos los valores del drop down para filtrar la información

var dropdownMenu = d3.select("#selDataset option:checked").text();
 console.log(dropdownMenu)

//Actualizamos la información de cada una de las graficas.
 d3.selectAll("#selDataset").on("change", updatePlotly);


//funcion para contruir las gráficas
function updatePlotly() {


var dropdownMenu = d3.select("#selDataset option:checked").text();

console.log(dropdownMenu)

//Filtramos la informacion por el id seleccionado
var search = data_metadata.filter(meta => meta.id.toString() === dropdownMenu)

//Seleccionamos la clase de la informacion general
var metadatainfo = d3.select("#sample-metadata");
//Limpiamos nuestra informacion en cada busqueda
metadatainfo.html("");
console.log(search)
//Mandamos nuestra infromacion  a #Sample-metadata
Object.entries(search[0]).forEach((key) => {   
            metadatainfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });

//Filtramos la información del dropdown top 10
  var search_sample = data_samples.filter(meta => meta.id.toString() === dropdownMenu)
 
 search_sample[0].sample_values.slice(0,10)
//Llenamos la variables necesarias para el pie
var pie = [{
  values: search_sample[0].sample_values.slice(0,10),
  labels: search_sample[0].otu_ids.slice(0,10),
  type: 'pie'
}];

//Mandamos la informacion a la grafica
Plotly.newPlot('pie', pie);
// Declaramos los valores para la grafica de bubble
 var trace1 = {
            x: search_sample[0].otu_ids,
            y: search_sample[0].sample_values,
            mode: "markers",
            marker: {
                size: search_sample[0].sample_values,
                color: search_sample[0].otu_ids
            },
            text:  search_sample[0].otu_labels

        };


        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

//Mandamos la infromación a la página
var data1 = [trace1];
Plotly.newPlot("bubble", data1, layout);

}


});

