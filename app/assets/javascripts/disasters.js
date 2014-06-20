
var color = d3.scale.quantize()
            .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]);

var width = 400, 
	height = 400;

var projection = d3.geo.mercator()
    .scale((width + 1) / 2 / Math.PI)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
				.projection(projection);


var svg = d3.select("#map")
	.append("svg");

d3.json("aidsjson", function(data) {

    color.domain([
	        d3.min(data, function(d) { return d.HIV; }),
	        d3.max(data, function(d) { return d.HIV; })
	]);


	d3.json("disasterjson", function(error, json) {

		if (error) {
			console.log(error);
		} else {

			for (var i = 0; i < data.length; i++) {

            //State name
            var dataState = data[i].country;

            //convert value from string to float
            var dataValue = parseFloat(data[i].HIV);

            console.log(dataValue);

            	//Corresponding country inside the GeoJSON
	            for (var j = 0; j < json.features.length; j++) {

		            var jsonState = json.features[j].properties.name;

		            if (dataState == jsonState) {

		                //Copy the data value into the JSON
		                json.features[j].properties.value = dataValue;

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
           .style("fill", function(d) {
                    //Data value
                    var value = d.properties.value;

                    if (value) {
                            //If value exists…
                            return color(value);
                    } else {
                            //If value is undefined…
                            return "grey";
                    }
    		});
	})
});