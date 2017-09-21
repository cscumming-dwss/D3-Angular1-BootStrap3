'use strict';

/**
 * @ngdoc directive
 * @name d3OnAngularSeedApp.directive:simpleBarChart
 * @description
 * # simpleBarChart
 */
angular.module('d3OnAngularSeedApp')
  .directive('simpleBarChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

/*        	var margin = {top: 15, right: 15, bottom: 15, left: 20};*/
        	var margin = {top: 20, right: 20, bottom: 70, left: 40},
		    width = 400 - margin.left - margin.right,
		    height = 400 - margin.top - margin.bottom;

/*        	var svg = d3.select("#container")*/
    		var svg = d3.select(element[0])        	
        		.append("svg")
/*        		.attr("preserveAspectRatio", "xMinYMin meet")
        		.attr("viewBox", " -15 -15 50 100")
        		.classed("svg-content", true)*/
        	     .attr("width", width + margin.left + margin.right) 
        	/*.attr("width", "100%")*/
        	     .attr("height", height + margin.top + margin.bottom) 
        	/*.attr("height", "100%")*/
        	.append("g") 
        	.attr("transform", 
        	      "translate(" + margin.left + "," + margin.top + ")");


/*        	var width = parseInt(d3.select("svg").style("width")) - margin.left - margin.right;
        	var height = parseInt(d3.select("svg").style("height")) - margin.top - margin.bottom;
*/        	//var height = parseInt(d3.select("svg").style("height"));

        	var	parseDate = d3.time.format("%Y-%m-%d").parse;

        	var x = d3.scale.ordinal().rangeRoundBands([0, width], .10);

        	var y = d3.scale.linear().range([height, 0], .10);

        	var xAxis = d3.svg.axis()
        	    .scale(x)
        	    .orient("bottom")
        	    .tickFormat(d3.time.format("%Y-%m-%d"));

        	var yAxis = d3.svg.axis()
        	    .scale(y)
        	    .orient("left")
        	    .ticks(10);
        	
        	
        	d3.csv("bar-data.csv", function(error, data) {

        	    data.forEach(function(d) {
        	        d.date = parseDate(d.date);
        	        d.value = +d.value;
        	    });
        		
        	  x.domain(data.map(function(d) { return d.date; }));
        	  y.domain([0, d3.max(data, function(d) { return d.value; })]);

        	  svg.append("g")
        	      .attr("class", "x axis")
        	      .attr("transform", "translate(0," + height + ")")
        	      .call(xAxis)
        	      .selectAll("text")
        	      .style("text-anchor", "end")
        	      .attr("dx", "-.8em")
        	      .attr("dy", "-.55em")
        	      .attr("transform", "rotate(-90)" );

        	  svg.append("g")
        	      .attr("class", "y axis")
        	      .call(yAxis)
        	    .append("text")
        	      .attr("transform", "rotate(-90)")
        	      .attr("y", 6)
        	      .attr("dy", ".71em")
        	      .style("text-anchor", "end")
        	      .text("Records");

        	  svg.selectAll("bar")
        	      .data(data)
        	      .enter().append("rect")
        	      .style("fill", "steelblue")
        	      .attr("x", function(d) { return x(d.date); })
        	      .attr("width", x.rangeBand())
        	      .attr("y", function(d) { return y(d.value); })
        	      .attr("height", function(d) { return height - y(d.value); });
        	}); //end csv data
        	
        	 // Define the format function
        	 function format(d) {
        	   d.total = +d.total;
        	   return d;
        	 }

            });
        }};
    }]);