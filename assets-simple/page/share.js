$('.rrssb-buttons').each(function(index) {
  var url = $(this).data('url');
  var title = $(this).data('title');
  var description = $(this).data('description');
  var params = {
    url: url,
    title: title,
    description: description

  }
  console.log(params);
  $(this).rrssb(params);
});
