
//Renders map that shows disasters
var color = "steelblue";

var conflictcolor = d3.scale.quantize()
            .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]);

var width = 640,
	height = 650,
	sens = 0.25,
	focused;

//Sets up my globe projection
var projection = d3.geo.orthographic()
    .scale(300)
    .rotate([0, 0])
    .translate([width / 2, height / 2])
    .clipAngle(90);

// MERCATOR PROJECTION
// d3.geo.mercator()
//     .scale((width + 1) / 2 / Math.PI)
//     .translate([width / 2, height / 2])
//     .precision(.1);

var path = d3.geo.path()
				.projection(projection);

//SVG Container
var svgmap = d3.select("#map")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
    .call(d3.behavior.drag()
		.origin(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
		.on("drag", function() {
		var rotate = projection.rotate();
			projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
			svgmap.selectAll("path").attr("d", path);
			svgmap.selectAll(".focused").classed("focused", focused = false);
	}));

//var mapdata = d3.select("#map").append("div").attr("id", "mapdata");

var countryTooltip = d3.select("#svgmap").append("div").attr("class", "countryTooltip"),
  countryList = d3.select("#svgmap").append("select").attr("name", "countries");

var selectedCountries = [];

//Reliefweb data that lists countries with natural disasters
d3.json("countryjson", function(data) {
	
	//Reliefweb data that has the actual disaster info
	d3.json("countrydisasterjson", function(disasterdata) {
		
		//Geographic data for map
		d3.json("countrymapjson", function(error, json) {


				conflictcolor.domain([
					d3.min(json, function(d) { return d.properties.war.deaths; }),
					d3.max(json, function(d) { return d.properties.war.deaths; })
				]);

				if (error) {
					console.log(error);
				} else {
					
					//Loops through countries taken from reliefweb api
					for (var i = 0; i < data.disasters.length; i++) {

						//Country name
						var dataCountry = data.disasters[i];
						
						//Corresponding disaster
						var dataDisaster = disasterdata.title[i] + disasterdata.description[i];

						//Corresponding country inside the GeoJSON
						for (var j = 0; j < json.features.length; j++) {

							var jsonCountry = json.features[j].properties.name;

							if (dataCountry == jsonCountry) {

							//Copy the data value into the JSON
							json.features[j].properties.value = 1;
							json.features[j].properties.disastervalue = dataDisaster;
							
							//console.log(json.features[j].properties.disastervalue);
							//Stop looking through the JSON
							break;

							}
						}
					}
				}


			svgmap.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("fill", function(d) {
				//Data value
				var value = d.properties.value;
				var conflictvalue = d.properties.war;

					if (value & conflictvalue) {
					//If value exists…
						return color;
					} else if (conflictvalue) {
						console.log(conflictvalue.deaths);
						return "#911919";
						//return conflictcolor(conflictvalue.deaths);
					} else if (value) {
						return color;
					} else {
						return "grey";
					}
				})
				.style("stroke", "#544E4E")
				.on("click", countryClicked)
				.on("mouseover", mouseOverCountry)
				.on("mouseout", mouseOut);


			function mouseOverCountry(d) {

				var countryName = d.properties.name;
				var countryInfo = d.properties.info;

				var dataString;

				if (d.properties.disastervalue) {
					dataString = d.properties.disastervalue;
				} else {
					dataString = " ";
				}

				$("#mapdata").html("<h2>" + countryName + "</h2> <br>" + "<p class = 'datastring'>" + countryInfo + "</p>");

				//console.log(dataString);

				d3.select(this)
					.style("fill", "orange");
			}

			function mouseOut(d) {
				
				var value = d.properties.value;
				var conflictvalue = d.properties.war;

				if (conflictvalue) {
					d3.select(this).style("fill", "#911919");
				} else if (value) {
					d3.select(this).style("fill", "steelblue");
				} else {
					d3.select(this).style("fill", "grey");
				}

			}


			function countryClicked(d) {

				if (d.properties.disastervalue || d.properties.war) {
					$('#myModal').foundation('reveal', 'open');
				}


				selectedCountries = [];
				var countryName = d.properties.name;
				var dataString;
				var conflictTitle;

				//var countryInfo = d.properties.countryInfo;

				if (d.properties.disastervalue) {
					dataString = d.properties.disastervalue;
				} else {
					dataString = "";
				}

				if (d.properties.war) {
					conflictTitle = d.properties.war.title;
					conflictInfo = "This conflict began in " + d.properties.war.began + " and in 2013 there were " + d.properties.war.deaths + " casualties.";
				} else {
					conflictTitle = "";
					conflictInfo = "";
				}

				$("#disasters").html("<h2>" + countryName + "</h2> <br>" + "<p class = 'datastring'>" + dataString + "</p>" + "<h4>" + conflictTitle + "</h4> <p>" + conflictInfo + "</p>");
				//ADD COUNTRY INFO HERE

				console.log(d);

				var country = d.properties.name;
				var value = d.properties.value;

				console.log(selectedCountries.indexOf(country));

				if (selectedCountries.indexOf(country) == -1) {

					// if (country) {
					// 	$(this).css({"fill": "darkgreen" });
					// }

					// if (country && value) {
					// 	$(this).css({"fill": "lightblue"});
					// }
					//Adds the country that the user wants to follow to the followedCountries array
					selectedCountries.push(country);
					// var countryIndex = followedCountries.indexOf(country);
					// d.properties.index = countryIndex;
					// console.log(followedCountries);

				} else {


					// if (country) {
					// 	$(this).css({"fill": "grey" });
					// }
					
					// if (country && value) {
					// 	$(this).css({"fill": "steelblue"});
					// }
					// //Removes the country from the array if not hightlighted
					// delete followedCountries[d.properties.index];
					// console.log(followedCountries);
				}
			}
		});
	});
});

$("#myModal").click(function(){
	$('#myModal').foundation('reveal', 'close');
});


//End of COUNTRY JSON DATA

//Adds water to map
svgmap.append("path")
	.datum({type: "Sphere"})
	.attr("class", "water")
	.attr("d", path);


