$(document).ready(function () {

	$('.btn-create-recipe').click(showBox);

	$('#btn-cancel').click(hideBox);

	$('#btn-byFeeling').click(linkByFeeling);

	$('#btn-byScent').click(linkByScent);

	$(document).click(clickOutOfBox);

});

// -------------------------------------------------------------------------- //

var linkByFeeling = function (event) {
	location.href = '../creator?from=feeling';
};

// -------------------------------------------------------------------------- //

var linkByScent = function (event) {
	location.href = '../creator?from=scent'
};

// -------------------------------------------------------------------------- //

var showBox = function (event) {
	$('.box-wrapper').fadeIn(250);
	$('.container.content').animate({
		opacity: 0.1
	}, 150);
}

// -------------------------------------------------------------------------- //

var hideBox = function (event) {
	$('.box-wrapper').fadeOut(175);
	$('.container.content').animate({
		opacity: 1
	}, 125);
}

// -------------------------------------------------------------------------- //

var clickOutOfBox = function (event) {
  var checkTarget1 = !$(event.target).closest('.box-inner').length;
  var checkTarget2 = !$(event.target).closest('.btn-create-recipe').length;
  var checkVisable = $('.box-wrapper').is(":visible");

  if (checkTarget1 && checkTarget2 && checkVisable) {
    hideBox();
  }
}
