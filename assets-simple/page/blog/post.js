$('.rrssb-buttons').each(function(index) {
  var id = $(this).data('id');
  $(this).rrssb({
    url: window.location.href + '/show/' + id,
  });
});
