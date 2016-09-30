$(document).ready(function () {

	var showOption = function (options, prefix) {
		var doShow = function (o, prefix) {
			var checkWrap = $(o).parent('span').length !== 0;
			var feelings = $(o).data('feelings');
			var checkFeelings = feelings === '[]';
			if (checkFeelings) return false;

			for (var k = 0; k < feelings.length; k++) {
				var checkFeeling = feelings[k].key === prefix;
				var checkAll = checkFeeling && checkWrap;
				checkAll && $(o).unwrap().show();
			}
		};

		hideOption(options, prefix, doShow);
	};

	var hideOption = function (options, prefix, cb) {
		$(options).each(function (i, o) {
			var checkDefault = o.value !== '';
			var checkWrap = $(o).parent('span').length === 0;
			var checkAll = checkWrap && checkDefault;
			checkAll && $(o).wrap('<span>').hide();

			if (typeof cb !== 'undefined') checkDefault && cb(o, prefix);
		});
	};

	var hideAllOption = function () {
		$('.scents-dropdown').each(function (i, e) {
			var selectedVal = $(e).val()
			var options = $(e).find('option');
			$(options).each(function (i, o) {
				var checkWrap = $(o).parent('span').length === 0;
				var checkDefault = $(o).val() !== '';
				var checkVal = $(o).val() !== selectedVal;
				var checksVals = checkDefault && checkVal;
				var checkAll = checksVals && checkWrap;
				checkAll && $(o).wrap('<span>');
			});
		});
	};

	var config = {
		'.chosen-select': {
			allow_single_deselect: false,
			width: "100%",
		},
	}
	for (var selector in config) {
		$(selector).chosen(config[selector]);
	}

	var styles = {
		'background-color': 'white',
		'border-radius': '0px 0px 0px 0px',
		'-moz-border-radius': '0px 0px 0px 0px',
		'-webkit-border-radius': '0px 0px 0px 0px',
		'border': '1px solid #bbb',
		'height': '33px',
		'background': 'white',
		'margin-bottom': '10px',
		'padding-top': '1%',
	}
	for (var style in styles) {
		$('a.chosen-single').css(style, styles[style]);
	}

	$('.chosen-select').change(function () {
		for (var style in styles) {
			$('a.chosen-single').css(style, styles[style]);
		}
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
	});

	$('.feeling-dropdown').change(function () {
		var idx = $(this).data('index');
		var prefix = $(this).val();

		var options = $('.scents-dropdown[data-index=' + idx + '] option');
		if (prefix) {
			showOption(options, prefix);
		} else {
			hideOption(options);
		}
		$('.scents-dropdown').change();
	});

	hideAllOption();

});
