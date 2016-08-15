var length = $("label.scent").length;
var pieChartData = {
  labelArray: [],
  dropsArray: [],
  scentColorArray: []
};

for (var i = 0; i < length; i++) {
	pieChartData.labelArray.push($("label#scent-" + i).html());
	pieChartData.dropsArray.push($("label#drops-" + i).html());
	pieChartData.scentColorArray.push($("label#color-" + i).html());
}

var perfumePieConfig = {
	type: 'pie',
	data: {
		datasets: [{
			data: pieChartData.dropsArray,
			backgroundColor: pieChartData.scentColorArray,
        }],
		labels: pieChartData.labelArray,
	},
	animation: {
		animateScale: true,
	},
	options: {
		title: {
			display: true,
			text: ''
		},
		legend: {
			display: false,
		},
		circumference: 1.5 * Math.PI,
		responsive: true,
		hover: {
			mode: 'label',
		}
	}
};
var perfumePie = new Chart(document.getElementById("pieChart"), perfumePieConfig);
