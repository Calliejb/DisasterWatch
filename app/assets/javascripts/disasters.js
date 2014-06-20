
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

	// d3.json("countrydisasterjson", function(disasterdata) {

	d3.json("countrymapjson", function(error, json) {

		if (error) {
			console.log(error);
		} else {
			//Loops through countries taken from reliefweb api
			for (var i = 0; i < data.disasters.length; i++) {
				
				//Country name
	            var dataCountry = data.disasters[i];

	            console.log(dataCountry);

	            	//Corresponding country inside the GeoJSON
		            for (var j = 0; j < json.features.length; j++) {

			            var jsonCountry = json.features[j].properties.name;

			            if (dataCountry == jsonCountry) {

			                //Copy the data value into the JSON
			                json.features[j].properties.value = 1;

			                //Stop looking through the JSON
			                break;

			        }

				//Loops through disasters taken from reliefweb api
				// for (var d = 0; d < disasterdata.disasters.length; d++) {


				// }

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
                            return color;
                    } else {
                            //If value is undefined…
                            return "grey";
                    }
            })
           .on("click", country_clicked)
           .on("mouseover", mouseOver)
           .on("mousemove", mouseMove)
           .on("mouseout", mouseOut);


    function mouseOver(d) {

    	var country_name = d.properties.name;
    	console.log(country_name);

    	d3.select(this)
		    .style("fill", "orange");
      // var value = d.properties.value;
      // var DisasterData = "url(#no_data)";

      // if(value)
      //   {
      //   HIVOppositeColor =  "rgba(0,255,0," +  (value/30) + ")";
      //   };

      // d3.select(this).style("fill", HIVOppositeColor);

      // div.transition()
      // .duration(200)
      // .style("opacity", 1);
    }

    function mouseMove(d) {

    }

    function mouseOut(d) {
		
		var value = d.properties.value

      if(value)
      {
        d3.select(this).style("fill", "steelblue");
      } else {
      	d3.select(this).style("fill", "grey");
      };

    }


    function country_clicked(d) {
      // var value = d.properties.value;
      // var HIVColor = "url(#no_data)";
      // var HIVOppositeColor = "url(#no_data)";
      // if(value){
      //       HIVColor =  "rgba(255,0,0," +  (value/30) + ")";
      //   };

      // if(value){
      //   HIVOppositeColor =  "rgba(0,255,0," +  (value/30) + ")";
      // };

      console.log(d);

      var country = d.properties.name;
      var value = d.properties.value;

      if (country) {
        $(this).css({"fill": "blue" });
      }

      if (country && value) {
      	$(this).css({"fill": "lightblue"});
      }

    };

    function get_country(d) {
      var bounds = path.bounds(d);
      var w_scale = (bounds[1][0] - bounds[0][0]) / width;
      var h_scale = (bounds[1][1] - bounds[0][1]) / height;
      var z = .96 / Math.max(w_scale, h_scale);
      var x = (bounds[1][0] + bounds[0][0]) / 2;
      var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
      return [x, y, z];
    }
	});
});