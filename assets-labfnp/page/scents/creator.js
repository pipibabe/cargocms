var diameter = parseInt(d3.select('#d3-container').style('width')),
    format = d3.format(",d"),
    color = d3.scale.category20c();

// console.log(d3.scale.linear()
//     .range([10, 20])
//     .domain([0, 480])(diameter));

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .radius(function(d) { return 8 + 4*Math.random(); })
    .padding(1);

//var scale = d3.scale.linear().domain([ 5, 5 ]).range([ 10, 10 ]);

var svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

// var drawBubbles = function(root) {

//   var node = svg.selectAll(".node")
//       .data(bubble.nodes(root).filter(function(d) { return !d.children; }))
//       .enter().append("g")
//       .attr("class", "node")
//       .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

//   // node.append("title")
//   //     .text(function(d) { return d.className + ": " + format(d.value); });

//   node.append("circle")
//       .attr("r", function(d) { return d.r; })
//       .style("fill", function(d) { return d.color; });

//   // node.append("text")
//   //     //.attr("dy", ".3em")
//   //     .style("text-anchor", "middle")
//   //     .style("fill", "#ffffff")
//   //     .style("font-weight", "normal")
//   //     .style("font-size", "5px")
//   //     .text(function(d) { return d.className.substring(0, d.r / 3); });

// };

var drawBubbles = function (root) {

  var node = svg.selectAll(".node")
    .data(bubble.nodes(root).filter(function(d) { return !d.children; }));

  if (root.children && root.children.length > 0) {
    // capture the enter selection
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    // re-use enter selection for circles
    nodeEnter
      .append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return d.color; });

	  nodeEnter.append("title")
      .text(function(d) { return d.className });

		nodeEnter.on("click", function(d) {
		  if (d3.event.defaultPrevented) return; // click suppressed
		  //console.log("clicked!" + d.formIndex);

		  var $input = $('.scents-drops[data-index='+d.formIndex+']');
		  $input.val(parseInt($input.val())+1);
		  $input.trigger('change');
		});

	  node.select("circle")
      .transition()
      .attr("r", function (d) {
          return d.r;
      })
      .style("fill", function (d, i) {
          return d.color;
      });

		node.transition().attr("class", "node")
	    .attr("transform", function (d) {
	    return "translate(" + d.x + "," + d.y + ")";
		});

		node.exit().remove();
	}
	else {
		svg.selectAll(".node").remove();
	}


};

d3.select(self.frameElement).style("height", diameter + "px");

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var getScentsVisualData = function() {

  var scentsData = [];

  var totalDrops = 0;

  $('.scents-dropdown').each(function() {
    if ($(this).val()) {
      var idx = $(this).data('index');
      var drops = $('.scents-drops[data-index='+idx+']').val();

      var color = $('option:selected', this).data('color');

			for (var i = 0; i < drops; i ++) {
		    scentsData.push({
		      "packageName": "",
		      "className": $(this).val(),
		      "value": 1,
		      "color": color,
		      "formIndex": idx
		    });
			}

			totalDrops = totalDrops + parseInt(drops);
    }
  });

  // console.log(scentsData);

  $('#total-drops').text(totalDrops);

  return { children: shuffle(scentsData) };
};

var getFormulaData = function() {
  var result = [];

  $('.scents-dropdown').each(function() {
    if ($(this).val()) {
      var idx = $(this).data('index');

      var scent = $(this).val();
      var drops = $('.scents-drops[data-index='+idx+']').val();
      var color = $('option:selected', this).data('color');

	    result.push({
	      "scent": scent,
	      "drops": drops,
        "color": color
	    });
    }
  });

  return result;
};

$(function() {
	$('.scents-dropdown').change(function() {
    $(this).css('color', $('option:selected', this).data('color'));

    var idx = $(this).data('index');
    var drops = $('.scents-drops[data-index='+idx+']');

    if ($(this).val() != '') {
	    if (drops.val() == 0) {
	      drops.val(1);
	    }
    }
    else {
	    drops.val(0);
    }

    drawBubbles(getScentsVisualData());
	});

	$('.scents-drops').change(function() {
		var newVal = parseInt($(this).val(), 10) || 0
		if (newVal < 0) {
			newVal = 0;
		}
	  $(this).val(newVal);
    drawBubbles(getScentsVisualData());
	});

	$('.scents-categories').change(function() {

		var idx = $(this).data('index');
		var prefix = $(this).val();

		if (prefix) {
			var dropdown = $('.scents-dropdown[data-index='+idx+']');

			console.log(prefix);
			$('option', dropdown)
				.show()
				.filter(function(index, element) { return element.value && element.value.substring(0,1)!==prefix; })
				.hide();
		}
	});

  $('#main-form').on('submit', function(event) {

    event.preventDefault();

    var endpoint = $(this).attr('action');
    var method = $(this).attr('method');

    console.log(endpoint + ':' + method);
    console.log( $(this).serializeArray() );

    var authorName = $('input[name=authorName]').val();
    var perfumeName = $('input[name=perfumeName]').val();
    var message = $('textarea[name=message]').val();

    $.ajax({
      url: endpoint,
      method: 'post', //create
      dataType: 'json',
      //contentType: 'application/json',
      cache: false,
      data: {
        authorName: authorName,
        perfumeName: perfumeName,
        formulaLogs: '',
        formula: getFormulaData(),
        message: message
      }
    }).done(function(result) {
      console.log(result);
      location.href='/me';
    });

  });

});
