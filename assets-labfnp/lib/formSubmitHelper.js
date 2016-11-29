var defaultFormSubmit = function(event){

  var $form = $(this);

  if( !$(this).valid() || $form.data("submitted") === true) {
    return event.preventDefault();
  }

  $form.data("submitted", true);

  $("#submit-button").prop("disabled", true);
  $("#submit-button").text("處理中...");

  setTimeout(function (){
    $("#submit-button").prop("disabled", false);
    $("#submit-button").text("送出");
  }, 1000);

  swal({
    type: "info",
    title: "處理中",
    text: "請勿進行任何操作!",
    showConfirmButton: false,
    allowEscapeKey: false,
    timer: 5000
  });
}

var defaultValidateSubmit = function(form){

  console.log($(form).data("submitted"));
  if($(form).data("submitted")) {
    return false;
  }

  $(form).data("submitted", true);
  $("#submit-button").prop("disabled", true);
  $("#submit-button").text("處理中...");

  setTimeout(function (){
    $("#submit-button").prop("disabled", false);
    $(form).data("submitted", false);
    $("#submit-button").text("送出");
  }, 1000);

  swal({
    type: "info",
    title: "處理中",
    text: "請勿進行任何操作!",
    showConfirmButton: false,
    allowEscapeKey: false,
    timer: 5000
  });
  form.submit();
}
