var submitData = function (form) {
	var api = $(form).attr('action');
	var method = $(form).attr('method');

	var values = {};
	$.each($(form).serializeArray(), function (i, field) {
		values[field.name] = field.value;
	});;

	var pwd = values['password'];
	var pwdCon = values['passwordConfirm'];
	var checkPwd = typeof pwd !== 'undefined' ? pwd.length < 1 : true;
	var checkPwdCon = typeof pwdCon !== 'undefined' ? pwdCon.length < 1 : true;
	var checkFirstName = values['firstName'].length < 1;
	var checkLastName = values['lastName'].length < 1;
	var checkEmail = values['email'].length < 1;

	var checkArray = [
    checkFirstName,
    checkLastName,
    checkEmail,
    checkPwd,
    checkPwdCon
  ];
	for (var check in checkArray) {
		if (!check) {
			swal('錯誤', '姓名/信箱/密碼欄位都必須填寫！', 'warning');
			clearTimeout(time);
			return false;
		}
	}

	var checkPwdEqual = values['password'] !== values['passwordConfirm'];
	if (checkPwdEqual) {
		swal('錯誤', '請輸入兩次一致的密碼！', 'warning');
		clearTimeout(time);
		return false;
	}

	var ajaxConfig = {
		url: api,
		method: method,
		dataType: 'json',
		//contentType: 'application/json',
		cache: false,
		data: {
			username: values['username'],
			email: values['email'],
			password: values['password'],
			passwordConfirm: values['passwordConfirm'],
			firstName: values['firstName'],
			lastName: values['lastName'],
      birthday: values['birthday'],
      phone1: values['phone1'],
      phone2: values['phone2'],
      address: values['address'],
      address2: values['address2'],
      avatarImgId: values['coverPhotoId']
		}
	};
	var catchDone = function (result) {
		swal({
			title: '訊息',
			text: '更新個人資料成功！',
			type: 'success',
			confirmButtonColor: "#2ecc71",
			confirmButtonText: "ＯＫ",
		}, function (isConform) {
			location.reload();
			// open('/me', '_self');
		});
	};
	var catchFail = function (result) {
		swal('錯誤', '更新使用者資料發生錯誤，請稍候再試。', 'error');
	};
	$.ajax(ajaxConfig).done(catchDone).fail(catchFail);
};

$('input[name="updatePwd"]').change(function(event) {

	if (this.checked) {
		$('.password').removeAttr('disabled');
	} else {
		$('.password').attr('disabled', 'disabled')
		$('.password').each(function(index, el) { el.value = ''; });
	}

});

$('#birthday').datepicker({
	changeYear: true,
  dateFormat: 'yy-mm-dd',
	yearRange: "-100:+0",
  prevText: '<i class="fa fa-angle-left"></i>',
  nextText: '<i class="fa fa-angle-right"></i>'
});

$('#userProfileForm').on('submit', function (event) {
	event.preventDefault();

	var form = this;
	var time = null;
	swal({
		title: "確認",
		text: "確定要更新你的個人資料嗎？",
		type: "warning",
		confirmButtonClass: "btn-info",
		confirmButtonText: "是的",
		cancelButtonText: "先不要",
		showCancelButton: true,
		closeOnConfirm: false,
		showLoaderOnConfirm: true
	}, function () {
		time = setTimeout(submitData(form), 2000);
	});
});

$('#resendCheckEmail').on('click', function() {
	$.get('/api/user/validate/resend', function() {
		swal({
			title: '訊息',
			text: '寄送成功！',
			type: 'success',
			confirmButtonColor: "#2ecc71",
			confirmButtonText: "ＯＫ",
		});
	});
})
