
//Renders map that countries can be chosen to follow
var color = "steelblue";

var width = 800,
	height = 1000,
	sens = 0.25,
	focused;

//Sets up my globe projection
var projection1 = d3.geo.orthographic()
    .scale(350)
    .rotate([0, 0])
    .translate([width / 2, height / 2])
    .clipAngle(90);

var path1 = d3.geo.path()
				.projection(projection1);

//SVG Container
var svgselectmap = d3.select("#selectmap")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
    .call(d3.behavior.drag()
		.origin(function() { var r = projection1.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
		.on("drag", function() {
		var rotate = projection1.rotate();
			projection1.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
			svgselectmap.selectAll("path").attr("d", path1);
			svgselectmap.selectAll(".focused").classed("focused", focused = false);
	}));


var followedCountries = [];

//Reliefweb data that lists countries with natural disasters
d3.json("countryjson", function(data) {

	//Reliefweb data that has the actual disaster info
	d3.json("countrydisasterjson", function(disasterdata) {
		
		//Geographic data for map
		d3.json("countrymapjson", function(error, json) {

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

			svgselectmap.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path1)
				.style("fill", function(d) {
				//Data value
				var value = d.properties.value;
				var conflictvalue = d.properties.war;
					if (value) {
					//If value exists…
						return color;
					} else if (conflictvalue) {
					//If value is undefined…
						return "#911919";
					} else if (value & conflictvalue) {
						return "orange";
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

				console.log(countryName);

				var dataString;

				if (d.properties.disastervalue) {
					dataString = d.properties.disastervalue;
				} else {
					dataString = " ";
				}

				$("#countryName").html("<h2>" + countryName + "</h2>");

				console.log(dataString);

				// d3.select(this)
				// 	.style("fill", "orange");
			}

			function mouseOut(d) {
				
				// var value = d.properties.value

				// if (value && !country_clicked) {
				// 	d3.select(this).style("fill", "steelblue");
				// } else {
				// 	d3.select(this).style("fill", "grey");
				// };

			}


			function countryClicked(d) {

				//console.log(d);

				var country = d.properties.name;
				var value = d.properties.value;

				console.log(followedCountries.indexOf(country));

				$("#mapselectdata").append("<h2>" + country + "</h2> <br>");

				if (followedCountries.indexOf(country) == -1) {
					if (country) {
						$(this).css({"fill": "green", "stroke": "darkgreen" });
					}

					if (country && value) {
						$(this).css({"fill": "lightblue"});
					}
					//Adds the country that the user wants to follow to the followedCountries array
					followedCountries.push(country);
					var countryIndex = followedCountries.indexOf(country);
					d.properties.index = countryIndex;
					console.log(followedCountries);
				} else {
					if (country) {
						$(this).css({"fill": "grey" });
					}
					
					if (country && value) {
						$(this).css({"fill": "steelblue"});
					}
					//Removes the country from the array if not hightlighted
					delete followedCountries[d.properties.index];
					console.log(followedCountries);
				}
			}
		});
	});
});

//End of COUNTRY JSON DATA

//Adds water to map
svgselectmap.append("path")
	.datum({type: "Sphere"})
	.attr("class", "water")
	.attr("d", path1);

//Ajax request that pushes my country array to my country model
function returnCountryArray() {
	console.log(followedCountries);
	for (i = 0; i < followedCountries.length; i++) {
		$.ajax({
			type: "POST",
			url: "/countries",
			data: { country: { name: followedCountries[i] }},
		});
	}

	$("#countryalert").html("<h3> Your country selection has been saved!</h3>");
}