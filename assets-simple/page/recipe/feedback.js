$.fn.serializeObject = function () {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

$(document).ready(function () {

  var chosenTimeout = null;

	$('.chosen-select').chosen({
		allow_single_deselect: false,
		no_results_text: '按 Enter 新增感覺',
	});

	$('.chosen-choices .search-field input').keydown(function (event) {
		event.stopPropagation();
		var feeling = $('.chosen-choices .search-field input').val().trim();
		var IsNoResult = $('.chosen-results').has('.no-results').length > 0;

		if (event.keyCode === 13 && feeling && IsNoResult) { //press ENTER

      var newItem = '<option value="' + feeling + '" selected >' + feeling + '</option>';
			$('.chosen-select').append(newItem);

      if (chosenTimeout === null) {
  			chosenTimeout = setTimeout(function () {
  				$('.chosen-select').trigger("chosen:updated");
          chosenTimeout = null;
  			}, 250);
      }
		}
	});

	$('#orderForm').submit(function (event) {
		if ($('.chosen-select').val() === null) {
			$('.error-text').addClass('show');
		} else {
			$('.error-text').removeClass('show');

			var ajaxConfig = {
				url: '/api/labfnp/recipe/feedback',
				method: 'POST',
				dataType: 'json',
				//contentType: 'application/json',
				cache: false,
				data: $('#orderForm').serializeObject()
			};
			var catchDone = function (result) {
				swal({
					title: '訊息',
					text: '完成回饋！',
					type: 'success',
					confirmButtonColor: "#2ecc71",
					confirmButtonText: "ＯＫ",
				}, function (isConform) {
					history.back();
				});
			};
			var catchFail = function (result) {
				swal('錯誤', '新增回饋資料發生錯誤，請稍候再試。', 'error');
			};
			$.ajax(ajaxConfig).done(catchDone).fail(catchFail);
		}
		return false;
	});
});
