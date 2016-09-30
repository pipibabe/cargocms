
var fill = d3.scale.category20b();
var w = document.getElementById('wordCloudContainer').offsetWidth,
    h = 400;

var max,
        fontSize;

var layout = d3.layout.cloud()
        .timeInterval(Infinity)
        .size([w, h])
        .fontSize(function(d) {
            return fontSize(+d.value);
        })
        .text(function(d) {
            return d.key;
        })
        .on("end", draw);

var svg = d3.select("#wordCloud").append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "wordCloud-svg");

var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");


function draw(data, bounds) {
    var w = document.getElementById('wordCloudContainer').offsetWidth,
        h = document.getElementById('wordCloudContainer').offsetHeight;



    svg.attr("width", w).attr("height", h);

    scale = bounds ? Math.min(
            w / Math.abs(bounds[1].x - w / 2),
            w / Math.abs(bounds[0].x - w / 2),
            h / Math.abs(bounds[1].y - h / 2),
            h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

    var text = vis.selectAll("text")
            .data(data, function(d) {
                return d.text.toLowerCase();
            });
    text.transition()
            .duration(1000)
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function(d) {
                return d.size + "px";
            });
    text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function(d) {
                return d.size + "px";
            })
            .style("opacity", 1e-6)
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .style("cursor", "pointer");

    text.style("font-family", function(d) {
        return d.font;
    })
            .style("fill", function(d) {
                return fill(d.text.toLowerCase());
            })
            .text(function(d) {
                return d.text;
            });

    vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
}

// function update() {
//     layout.font('impact').spiral('archimedean');
//     fontSize = d3.scale['sqrt']().range([10, 100]);
//     if (tags.length){
//         fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
//     }
//     layout.stop().words(tags).start();
// }

function update() {
  layout.font('impact').spiral('archimedean');
  fontSize = d3.scale['sqrt']().range([10, 100]);

  var w = document.getElementById('wordCloudContainer').offsetWidth,
      h = 400;
  var wordLength = parseInt(w * h / 5000);
  console.log("wordLength", wordLength);
  console.log("tags.length", tags.length);
  var maxWord = tags.length;

  if(tags.length > wordLength)
    maxWord = wordLength;

  console.log("maxWord", maxWord);
  var words = tags.slice(0, maxWord);


  if (tags.length){
    fontSize.domain([+words[words.length - 1].value || 1, +words[0].value]);
  }
  layout.stop().words(words).start();
}

var tags = [];
$(function() {
  var id = $("#wordCloud").data("id");


  $.ajax({
    url: "/api/labfnp/recipe/"+id+"/feelings",
    method: "GET",
    dataType: 'json',
    cache: false
  }).done(function(result) {
    console.log(result);
    tags = result.data.feelings
    update();


    $("#wordCloud-svg").find("text").on("click", function(){
      var clickedFeel=$(this).html();

      var foundPosition;
      tags.forEach(function(item,index) {
        if (item.key==clickedFeel) {
          foundPosition = index;
        }
      })

      var foundScents=tags[foundPosition].scent;
      //console.log(foundScents);

      // if need all Scent's Name, using this
      /*
      var sourceScent=foundScents.map((item) => {
        return item.name;
      })
      console.log("feeling "+clickedFeel+" comes from "+sourceScent);
      */

      var mostStrength = undefined;
      tags[foundPosition].scent.forEach(function (item){
        if (mostStrength === undefined || item.value > mostStrength.value )  {
          mostStrength=item;
        }
      });
      console.log("most of "+clickedFeel+" come from "+mostStrength.name)

      var targetPiePart = undefined;
      for (var pieDataIndex in pieParam.data.content) {
        if (pieParam.data.content[pieDataIndex].label===mostStrength.name) {
          console.log('found at '+pieDataIndex);
          targetPiePart = pieDataIndex;
          break;
        }
      }

      pieChart.openSegment(targetPiePart);

    })
  });

  window.onresize = function(event) {
    update();
  };
});
