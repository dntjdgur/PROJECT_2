var stateMarkers = [];

axios.get("http://127.0.0.1:5000/api/v1.0/earth").then(function (response) {
  
  var mags = [];

  var i;
  for (i = 0; i < 3000; i++) {
    mags.push(response.data[i].magnitude);
  };

  for (i = 0; i < 3000; i++) {

    // creating markers

    stateMarkers.push(
      L.circle([response.data[i].latitude, response.data[i].longitude], {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: `rgb(255, ${255 - 255 * (response.data[i].magnitude-d3.min(mags)) / (d3.max(mags)-d3.min(mags))}, ${0})`,
        radius: (response.data[i].magnitude) * 20000
      })
    );

  }



  // Define variables for our base layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    id: "mapbox.light",
    accessToken: API_KEY
  });


  // Create two separate layer groups: one for cities and one for states
  var states = L.layerGroup(stateMarkers);

  // // Create a baseMaps object
  // var baseMaps = {
  //   "Street Map": streetmap
  // };

  // // Create an overlay object
  // var overlayMaps = {
  //   "State Population": states
  // };



  // Define a map object
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3,
    layers: [streetmap, states]
  });



  // Pass our map layers into our layer control
  // Add the layer control to the map
  // L.control.layers(baseMaps, overlayMaps, {
  //   collapsed: false
  // }).addTo(myMap);



  d3.selectAll(".leaflet-interactive").on("click", function (response) {
    console.log("click")
  });


  var layer = [streetmap, states];



  // Step 1: Append a div to the body to create tooltips, assign it a class
  // =======================================================
  var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");

  // Step 2: Add an onmouseover event to display a tooltip
  // ========================================================
  d3.selectAll(".leaflet-interactive").on("mouseover", function (d, i) {
    toolTip.style("display", "block");
    toolTip.html(`Mag: ${response.data[i].magnitude}    Depth: ${response.data[i].depth} `)
      .style("left", d3.event.pageX + "px")
      .style("top", (d3.event.pageY - 30) + "px");
  })
    // Step 3: Add an onmouseout event to make the tooltip invisible
    .on("mouseout", function () {
      toolTip.style("display", "none");
    });



  var legend = L.control({ position: 'bottomright' });
  legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<div class="strong"><b>Mag:</b></div>'],
      categories = ['Road Surface', 'Signage', 'Line Markings', 'Roadside Hazards', 'Other'];

    for (var i = 0; i < 4; i++) {
      if (i == 3) {
        var end = "+";
      } else {
        var end = "-" + Math.round((i + 1) / 3 * d3.max(mags));
      };

      div.innerHTML +=
        labels.push(`<div class="rect" style="background: rgb(255, ${255 - 255 * (i) / 3}, ${0})"> ${Math.round(i / 3 * d3.max(mags))}${end}</div>`);

    }
    div.innerHTML = labels.join('');
    return div;
  };
  legend.addTo(myMap);


  //  getColor(categories[i])





});




// onSlide: function(position, value) {
// console.log(value)
// };

// d3.json("http://127.0.0.1:5000/api/v1.0/earth").then(function (data) {
//   console.log(data)
// });



// .latitude






