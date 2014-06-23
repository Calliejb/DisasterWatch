
var color = "steelblue";

var width = 1000, 
	height = 1000;

var projection = d3.geo.mercator()
    .scale((width + 1) / 2 / Math.PI)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
				.projection(projection);


var svgmap = d3.select("#map")
	.append("svg");

var mapdata = d3.select("mapdata")
	.append("svg");

var followedCountries = [];

d3.json("countryjson", function(data) {

	d3.json("countrydisasterjson", function(disasterdata) {

		d3.json("countrymapjson", function(error, json) {

			if (error) {
				console.log(error);
			} else {
				//Loops through countries taken from reliefweb api
				for (var i = 0; i < data.disasters.length; i++) {
					
					//Country name
			        var dataCountry = data.disasters[i];
			        //Corresponding disaster
			        var dataDisaster = disasterdata.disasters[i];

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

		    	var country_name = d.properties.name;

		    	console.log(country_name);

		    	var dataString;

		          if (d.properties.disastervalue) {
		            dataString = d.properties.disastervalue;
		          } else {
		            dataString = " ";
		          }

		       	console.log(dataString);

		    	d3.select(this)
				    // .style("fill", "orange")
				    .html(country_name + "<br/>" + dataString)
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
					$(this).css({"fill": "blue" });
				}

				if (country && value) {
					$(this).css({"fill": "lightblue"});
				}
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
				delete followedCountries[d.properties.index];
				console.log(followedCountries);
			  }

		    }

    	});
	});
});

function returnCountryArray() {
	console.log(followedCountries);
	return followedCountries;
}