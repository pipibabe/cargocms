
var pieChart = null
var apiRecipe = '/api/labfnp/recipe/';
var recipeId = $('input[name="id"]').val();
var minSize = 240;
var autoSize = $('.col.col-md-12').width() * 0.75 > minSize ? $('.col.col-md-12').width() * 0.75 : minSize;
var autoOuter = autoSize > minSize ? "60%" : "40%";
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
	"pieOuterRadius": autoOuter
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
			// console.log('context=>', context);
			return label;
		},
		"outer": {
			format: "label",
			"pieDistance": 10
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
			truncateLength: 10
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
			"percentage": 0
		},
		canvasPadding: {
			top: 5,
			right: 5,
			bottom: 5,
			left: 5
		},
	},
	tooltips: {
		enabled: true,
		type: "placeholder", // caption|placeholder
		string: "{label}: {value}滴({percentage}%)",
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
		onClickSegment: function () {
			console.log("[!]click pieChart");
		},
	}
};
var ajaxSuccess = function (result) {
	// console.log('result=>', result);
	var formula = result.data.item.formula;
	for (var i = 0; i < formula.length; i++) {
		pieParam.data.content.push({
			label: formula[i].scent,
			value: parseInt(formula[i].drops),
			color: formula[i].color,
		});
	}
	pieChart = new d3pie("pieChart", pieParam);
}; // end ajaxSuccess
var ajaxError = function (requestObject, error, errorThrown) {
		sweetAlert("錯誤", "目前無法取得此配方成份！", "error");
		console.log('[requestObject]=>', requestObject);
		console.log('[error]=>', errorThrown);
		console.log('[errorThrown]=>', error);
	} // end ajaxError

if (recipeId) {
	$.get(apiRecipe + recipeId).done(ajaxSuccess).fail(ajaxError);
}
