var autoSize = $('.drops-chart').width()*0.95 > 230 ? $('.drops-chart').width()*0.95 : 230;
var pie = null;
var drawPieChart = function (data) {
  var pieHeader = {
    "title": {
      "text": "",
      "fontSize": 24,
      "font": "open sans"
    },
    "subtitle": {
      "text": "",
      "color": "#999999",
      "fontSize": 12,
      "font": "open sans"
    },
    "titleSubtitlePadding": 9
  };
  var pieFooter = {
    "color": "#999999",
    "fontSize": 10,
    "font": "open sans",
    "location": "bottom-left"
  };
  var pieSize = {
    "canvasWidth": autoSize,
    "canvasHeight": autoSize,
    "pieOuterRadius": "50%"
  };
  var pieParam = {
    "sortOrder": "value-desc",
    "content": [],
    "labels": {
      formatter: function (context) {
        var label = context.label;
        // if it's a single bird seen, add an exclamation mark to the outer label
        if (context.section === 'inner') {
            label = label + '%';
        }
        if (context.section === 'outer') {
            label = label + ' - ' + context.value + '滴';
        }
        return label;
      },
      "outer": {
        format: "label",
        "pieDistance": 30
      },
      "inner": {
        format: "percentage",
        "hideWhenLessThanPercentage": null
      },
      "mainLabel": {
        "fontSize": 11
      },
      "percentage": {
        "color": "#fff",
        "fontSize": 14,
        "decimalPlaces": 0
      },
      "value": {
        "color": "#fff",
        "fontSize": 14
      },
      "lines": {
        "enabled": true,
  			style: "curved",
  			color: "segment" // "segment" or a hex color
      },
      "truncation": {
        "enabled": true,
        truncateLength: 30
      },
    },
    "effects": {
      load: {
        effect: "default", // none / default
        speed: 500
      },
      "pullOutSegmentOnClick": {
        "effect": "elastic",
        "speed": 400,
        "size": 10
      },
  		highlightSegmentOnMouseover: true,
  		highlightLuminosity: -0.2
    },
    "misc": {
      "gradient": {
        "enabled": false,
        "percentage": 100
      },
  		canvasPadding: {
  			top: 5,
  			right: 5,
  			bottom: 5,
  			left: 5
  		},
    },
    tooltips: {
      enabled: false,
      type: "placeholder", // caption|placeholder
      string: "",
      placeholderParser: null,
      styles: {
        fadeInSpeed: 250,
        backgroundColor: "#000000",
        backgroundOpacity: 0.5,
        color: "#efefef",
        borderRadius: 2,
        font: "arial",
        fontSize: 10,
        padding: 4
      }
    },
  	"header": pieHeader,
  	"footer": pieFooter,
  	"size": pieSize,
  	"data": {
      content: [],
    },
    callbacks: {
      onload: null,
      onMouseoverSegment: null,
      onMouseoutSegment: null,
      onClickSegment: function(){
        console.log("[!]click pieChart");
      },
  	}
  };
  $(data).each(function (i, e) {
    pieParam.data.content.push({
      label: e.scent,
      value: parseInt(e.drops),
      color: e.color,
    });
  })
  if(pie) pie.destroy()
  pie = new d3pie("pieChart", pieParam);
  return pie;
}

function updatePieChart(){
  var newData = [];
  var totalDrops = 0;
  $('.scents-dropdown').each(function(index, el) {
    var idx = $(el).data('index');
    var selected = document.getElementsByName("formulaScents[" + idx + "]")[0].value;
    var inputDrop = $('.scents-drops[data-index=' + idx + ']');
    if(selected === '') return;
    var scent = selected;
    var drops = inputDrop.val();
    totalDrops = totalDrops + parseInt(drops);
    var color = $(':selected',el).data('color');
    newData.push({
      scent: scent,
      drops: drops,
      color: color,
    });
  });
  if (totalDrops > 0) {
    drawPieChart(newData);
    $('#total-drops').text(totalDrops);
  }
}
