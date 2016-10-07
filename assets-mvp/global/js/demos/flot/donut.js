$(function () {

	var data, chartOptions

	data = [
		{ label: "一般藥物", data: Math.floor (Math.random() * 100 + 250) },
		{ label: "臨床藥物", data: Math.floor (Math.random() * 100 + 350) },
		{ label: "不良品", data: Math.floor (Math.random() * 100 + 650) },
		{ label: "醫療器材不良", data: Math.floor (Math.random() * 100 + 50) },
		{ label: "醫療作業不良", data: Math.floor (Math.random() * 100 + 250) }
	]

	chartOptions = {
		series: {
			pie: {
				show: true,
				innerRadius: .5,
				stroke: {
					width: 4
				}
			}
		},
		legend: {
			position: 'ne'
		},
		tooltip: true,
		tooltipOpts: {
			content: '%s: %y'
		},
		grid: {
			hoverable: true
		},
		colors: mvpready_core.layoutColors
	}


	var holder = $('#donut-chart')

	if (holder.length) {
		$.plot(holder, data, chartOptions )
	}

})
