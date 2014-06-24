
var color = "steelblue";

var width = 1000, 
	height = 1000,
	sens = 0.25,
	focused;

//Sets up my globe projection
var projection = d3.geo.orthographic()
    .scale(350)
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

var mapdata = d3.select("#mapdata")
	.append("svg");

var countryTooltip = d3.select("#mapdata").append("div").attr("class", "countryTooltip"),
  countryList = d3.select("#mapdata").append("select").attr("name", "countries");

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
							
							console.log(json.features[j].properties.disastervalue);
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
					if (value) {
					//If value exists…
					return color;
					} else {
					//If value is undefined…
					return "grey";
					}
				})
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

				console.log(dataString);

				d3.select(this)
					// .style("fill", "orange")
					.html(countryName + "<br/>" + dataString)
					.style("left", (d3.event.pageX + 10) + "px")
					.style("top", (d3.event.pageY - 20) + "px");
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

				console.log(d);

				var country = d.properties.name;
				var value = d.properties.value;

				console.log(followedCountries.indexOf(country));

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
svgmap.append("path")
	.datum({type: "Sphere"})
	.attr("class", "water")
	.attr("d", path);

//Ajax request that pushes my country array to my country model
function returnCountryArray() {
	console.log(followedCountries);
	$.ajax({
		type: "POST",
		url: "/countries",
		//data: { country: { name: followedCountries[0] }},
		data: { country: { name: JSON.stringify(followedCountries) }},
		// Saves data as an array in name.. maybe could be worked with?

		// data: 
		//	country: function() { for (var i = 0; i < followedCountries.length; i++) {
		//			{ name: followedCountries[i] } }},
		success: function() { alert("Success!"); }
	});
}

