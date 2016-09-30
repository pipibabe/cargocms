$(document).ready(function () {
	var diameter = 0, //parseInt(d3.select('#d3-container').style('width')),
			format = d3.format(",d"),
			color = d3.scale.category20c();


	var bubble = d3.layout.pack()
		.sort(null)
		.size([diameter, diameter])
		.radius(function (d) {
			return 8 + 1.25 * Math.random();
		})
		.padding(1);

	var svg = d3.select("#d3-container")
		.append("svg")
		.attr("width", diameter)
		.attr("height", diameter)
		.attr("class", "bubble");

	var drawBubbles = function (root) {

		var node = svg.selectAll(".node")
			.data(bubble.nodes(root).filter(function (d) {
				return !d.children;
			}));

		if (root.children && root.children.length > 0) {
			// capture the enter selection
			var nodeEnter = node.enter().append("g")
				.attr("class", "node")
				.attr("transform", function (d) {
					return "translate(" + d.x + "," + d.y + ")";
				});

			// re-use enter selection for circles
			nodeEnter
				.append("circle")
				.attr("r", function (d) {
					return d.r;
				})
				.style("fill", function (d) {
					return d.color;
				});

			nodeEnter.append("title")
				.text(function (d) {
					return d.className
				});

			nodeEnter.on("click", function (d) {
				if (d3.event.defaultPrevented) return; // click suppressed
				//console.log("clicked!" + d.formIndex);

				var $input = $('.scents-drops[data-index=' + d.formIndex + ']');
				$input.val(parseInt($input.val()) + 1);
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
		} else {
			svg.selectAll(".node").remove();
		}


	};

	d3.select(self.frameElement).style("height", diameter + "px");

	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue, randomIndex;

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

	var getScentsVisualData = function () {

		var scentsData = [];
		var totalDrops = 0;

		$('.scents-dropdown').each(function () {
			if ($(this).val()) {
				var idx = $(this).data('index');
				var drops = $('.scents-drops[data-index=' + idx + ']').val();

				var color = $('option:selected', this).data('color');

				for (var i = 0; i < drops; i++) {
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


		$('#total-drops').text(totalDrops);

		if (totalDrops > 50) {
			$('#total-drops').css('color', 'red');
			$('#orver-drops').css('visibility', 'visible')
		} else {
			$('#total-drops').css('color', '#555');
			$('#orver-drops').css('visibility', 'hidden')
		}

		return {
			children: shuffle(scentsData)
		};
	};

	var getFormulaData = function (createdBy) {
		var result = [];
		var isFromFeeling = createdBy === 'feeling';

		$('.scents-dropdown').each(function () {
			if ($(this).val()) {
				var idx = $(this).data('index');

				// var scent = $(this).val();
				var scent = document.getElementsByName("formulaScents[" + idx + "]")[0].value;
				var drops = $('.scents-drops[data-index=' + idx + ']').val();
				var color = $('option:selected', this).data('color');
				var feeling = '';
				var formulaObj = {
					"scent": scent,
					"drops": drops,
					"color": color
				};

				if (isFromFeeling) {
					feeling = $('.feeling-dropdown[data-index=' + idx + ']').val();
					formulaObj.feeling = feeling;
					// console.log('feeling=>', feeling);
				}
				// console.log('formulaObj=>', formulaObj);

				result.push(formulaObj);
			}
		});

		return result;
	};

	var allScentOptions = $('option', $('.scents-dropdown[data-index=0]'));
	var allScents = []

	for (var i = 0; i < allScentOptions.length; i++) {
		var scent = $(allScentOptions[i]);
		var scentData = {
			val: scent.val(),
			color: scent.data('color'),
			title: scent.data('title'),
			description: scent.data('description')
		}

		allScents.push(scentData);

		// allScents.push($("<option></option>")
		// 	.attr("value", scent.val())
		// 	.data('color', scent.data('color'))
		// 	.data('title', scent.data('title'))
		// 	.data('description', scent.data('description'))
		// 	.text(scent.val()));
	}

	$('.scents-categories').change(function () {
		var idx = $(this).data('index');
		var prefix = $(this).val();
		var filterOptions = [$("<option selected='selected'></option>").attr("value", "").text("請選擇")]
		var dropdown = $('.scents-dropdown[data-index=' + idx + ']');
		$('option', dropdown).detach();

		if (prefix) {
			for (var i = 0; i < allScents.length; i++) {
				if (allScents[i].val.substring(0, 1) == prefix)
					filterOptions.push($("<option></option>")
						.attr("value", allScents[i].val)
						.data('color', allScents[i].color)
						.data('title', allScents[i].title)
						.data('description', allScents[i].description)
						.text(allScents[i].val));
			}
		} else {
			for (var i = 0; i < allScents.length; i++) {
				filterOptions.push($("<option></option>")
					.attr("value", allScents[i].val)
					.data('color', allScents[i].color)
					.data('title', allScents[i].title)
					.data('description', allScents[i].description)
					.text(allScents[i].val));
			}
		}

		dropdown.append(filterOptions);
		dropdown.change();
	});

	$('.scents-dropdown').change(function () {
		var idx = $(this).data('index');
		var selected = document.getElementsByName("formulaScents[" + idx + "]")[0].value;
		$(this).val(selected);

		for (var id=0; id<5; id++) {
			if (id !== idx && selected !== '') {
				var otherSelectedScent =
				document.getElementsByName("formulaScents[" + id + "]")[0].value;

				if (selected == otherSelectedScent) {
					swal('注意', '香味分子 ‘' + selected + '’ 已經被選過了，請選擇其他香味分子！');
					$(this).val('');
					return false;
				}
			}
		}

		// console.log("idx", idx);
		// var selectedScent = $('option:selected', this);
		var selectedScent = $('.scents-dropdown[data-index=' + idx + '] option:selected');
		var scentDetail = $('.scent-detail[data-index=' + idx + ']');
		var feelingScentsCategories = $('.feeling-dropdown[data-index=' + idx + ']');
		var drops = $('.scents-drops[data-index=' + idx + ']');
		var title = "";
		var description = "";
		var api = '/api/labfnp/feeling?serverSidePaging=true&draw=0&columns%5B0%5D%5Bdata%5D=scentName&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=score&columns%5B1%5D%5Bsearchable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=1&order%5B0%5D%5Bdir%5D=desc&start=0&length=10&search%5Bvalue%5D=' + selected;
		var successCatch = function (e) {
			var tags = [];
			$(e.data).each(function (i, e) {
				tags.push(e.title);
			});
			$(tags).each(function (i, e) {
				scentDetail.find(".tags").append('<div class="tag">' + e + '</div>')
			});
			var Text = feelingScentsCategories.val();
			// console.log('=>',feelingScentsCategories[0]);
			if(Text != undefined && tags.indexOf(Text) === -1){
				scentDetail.find(".tags").append('<div class="tag">' + Text + '</div>')
			}
		};
		var failCatch = function (e) {
			console.log('error=>', e);
		};

		if (selected !== '') {

			$.get(api).done(successCatch).fail(failCatch);

			var color = selectedScent.data('color');
			title = selectedScent.data('title');
			description = selectedScent.data('description');

			scentDetail.removeClass("hidden");
			scentDetail.find("#scent-content").css('border-top', 'solid 2px ' + color);
			scentDetail.find(".tags").empty();

			if (drops.val() < 1) drops.val(1);

		} else {
			scentDetail.addClass("hidden");
			drops.val(0);
		}

		scentDetail.find("#scent-title").html(title)
		scentDetail.find("#scent-description").html(description)
			// drawBubbles(getScentsVisualData());
		updatePieChart();
	});

	$('.scents-drops').change(function () {
		var newVal = parseInt($(this).val(), 10) || 0
		if (newVal < 0) {
			newVal = 0;
		}
		$(this).val(newVal);
		// drawBubbles(getScentsVisualData());
		updatePieChart();
	});

	$('#recipeDeleteButton').on('click', function (event) {
		event.preventDefault();
		var id = $(this).data('id');

		swal({
			title: '確認',
			text: '確定刪除此配方？',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: "#e6caa8",
			confirmButtonText: "刪除",
			cancelButtonText: "取消",
			closeOnConfirm: true,
			closeOnCancel: true,
		},function(isConform){
			if(isConform){
				$.ajax({
					url: '/api/labfnp/recipe/' + id,
					method: "delete", //create
					dataType: 'json',
					cache: false
				}).done(function (result) {
					// console.log(result);
					// alert(result.message);
					swal({
						title: '訊息',
						text: '刪除成功',
						type: 'success',
						confirmButtonColor: "#e6caa8",
						confirmButtonText: "回創作列表",
						closeOnConfirm: true,
					},function(isConform){
						location.href = '/me/' + result.data.userId;
					});
				});
			}else{
				swal.close();
			}
		});

	});

	$('#main-form').on('submit', function (event) {

		event.preventDefault();

		var totalDrops = parseInt($('#total-drops').text(), 10);
		if (totalDrops > 50) {
			swal('提示','單一配方請勿超過 50 滴！', 'warning');
			return false;
		}

		var endpoint = $(this).attr('action');
		var method = $(this).attr('method');

		// console.log(endpoint + ':' + method);
		// console.log( $(this).serializeArray() );

		var authorName = $('input[name=authorName]').val();
		var perfumeName = $('input[name=perfumeName]').val();
		var message = $('textarea[name=message]').val();
		var visibility = $('select[name=visibility]').val();
		var description = $('textarea[name=description]').val();
		var coverPhotoId = $('input[name=coverPhotoId]').val();
		var createdBy = $('input[name=createdBy]').val();

		var formula = getFormulaData(createdBy);
		// console.log("=== formula ===", formula);
		var formIsValid = true;

		if (authorName === '') {
			swal('提示','請填寫創作者姓名', 'warning');
			formIsValid = false;
		}

		if (perfumeName === '') {
			swal('提示','請填寫香水品名', 'warning');
			formIsValid = false;
		}

		if (formula.length == 0) {
			swal('提示','未選定任一配方', 'warning')
			formIsValid = false;
		};

		formula.forEach(function (oneFormula) {
			if (oneFormula.drops == 0) {
				swal('提示','選擇配方後，滴數不可為 0', 'warning');
				formIsValid = false;
			}
		});

		if (!formIsValid) return false;

    var $form = $(this);
    if ($form.data('submitted') === true) {
      // Previously submitted - don't submit again
      event.preventDefault();
      return false;
    } else {
      // Mark it so that the next submit can be ignored
      $form.data('submitted', true);
      $('.submittedInfo').fadeIn();
    }

		$.ajax({
			url: endpoint,
			method: method, //create
			dataType: 'json',
			//contentType: 'application/json',
			cache: false,
			data: {
				authorName: authorName,
				perfumeName: perfumeName,
				formulaLogs: '',
				formula: formula,
				message: message,
				visibility: visibility,
				description: description,
				coverPhotoId: coverPhotoId,
				createdBy: createdBy,
			}
		}).done(function (result) {
      location.href = '/recipe/' + result.data.hashId;
		});

	});

	$('.scents-dropdown').change();
	$('.scents-drops').change();

});
