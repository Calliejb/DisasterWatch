
var color = "steelblue";

var width = 800, 
	height = 800;

var projection = d3.geo.mercator()
    .scale((width + 1) / 2 / Math.PI)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
				.projection(projection);


var svg = d3.select("#map")
	.append("svg");

d3.json("countryjson", function(data) {

	d3.json("countrymapjson", function(error, json) {

		if (error) {
			console.log(error);
		} else {

			for (var i = 0; i < data.disasters.length; i++) {

	            //State name
	            var dataState = data.disasters[i];

	            console.log(dataState);

	            	//Corresponding country inside the GeoJSON
		            for (var j = 0; j < json.features.length; j++) {

			            var jsonState = json.features[j].properties.name;

			            if (dataState == jsonState) {

			                //Copy the data value into the JSON
			                json.features[j].properties.value = 1;

			                //Stop looking through the JSON
			                break;

			        }
			    }
		    }
		}

        svg.selectAll("path")
           .data(json.features)
           .enter()
           .append("path")
           .attr("d", path)
           .on("click", country_clicked)
           .on("mouseover", mouseOver)
           .on("mousemove", mouseMove)
           .on("mouseout", mouseOut)
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
    		});
	})
});