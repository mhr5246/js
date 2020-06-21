function showErrorMessage(message, delay) {
	var $error = $("#error");
	$error.html(message);
	$error.fadeIn();
	$error.addClass('shake');
	setTimeout(function () {
		$error.fadeOut();
		$error.removeClass('shake');
	}, 3000);
	return;
}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}

var queryString;



var currentScriptPath = function () {

	var scripts = document.querySelectorAll('script[src]');
	var currentScript = scripts[scripts.length - 1].src;
	var currentScriptChunks = currentScript.split('/');
	var currentScriptFile = currentScriptChunks[currentScriptChunks.length - 1];

	return currentScript.replace(currentScriptFile, '');
}

$().ready(function () {
	getUrlVars();
	window.history.pushState(null, "", window.location.href);
	window.onpopstate = function () {
		window.history.pushState(null, "", window.location.href);
	}

	function disablePrev() { window.history.forward() }
	window.onload = disablePrev();
	window.onpageshow = function (evt) { if (evt.persisted) disableBack() }
});

var urlParams;
function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash_i = hashes[i].toLowerCase();
		hash = hash_i.split('=');
		vars.push(hash[0].toLowerCase());
		vars[hash[0]] = hash[1]
	}
	urlParams = vars;
	console.log(urlParams['seg']);

}

$(document).ready(function () {



	$("#subscribeRequest, .arowBtn").click(function () {
		var $this = $(this);
		mobileNumber = $("#usermobile").val();

		if (mobileNumber.length != 11 || !mobileNumber.toString().startsWith("09")) {
			showErrorMessage("لطفا شماره موبایل خود را به صورت صحیح وارد نمایید");
			return;

		} else if (mobileNumber.toString().startsWith("0901") ||
			mobileNumber.toString().startsWith("0902") ||
			mobileNumber.toString().startsWith("0903") ||
			mobileNumber.toString().startsWith("0905") ||
			mobileNumber.toString().startsWith("0930") ||
			mobileNumber.toString().startsWith("0933") ||
			mobileNumber.toString().startsWith("0935") ||
			mobileNumber.toString().startsWith("0936") ||
			mobileNumber.toString().startsWith("0937") ||
			mobileNumber.toString().startsWith("0938") ||
			mobileNumber.toString().startsWith("0939")) {
			showErrorMessage("لطفا شماره موبایل همراه اول خود را وارد نمایید");
			return;
		} else {
			$("#overlay").removeClass('hide');
			var settings = {
				"url": "http://soft30t.ir/webservices/otp.php?action=request&phoneNum=" + mobileNumber,
				"method": "GET",
			}


			$.ajax(settings).done(function (response) {
				console.log(response);
				var parse = JSON.parse(response);
				console.log(parse);
				$("#overlay").addClass('hide');
				if (parse.status == "true") {

					$("#step1").addClass('hide');
					$("#stepCount").addClass('hide');
					$("#sendtxt").addClass('hide');

					$("#step2").removeClass('hide');
					$("#stepCount2").removeClass('hide');
					$("#step2").removeClass('hide');

					transactionId = parse.transId;
					otpreference = parse.otpRef;
				} else {
					showErrorMessage('ارسال کد ناموفق بود لطفا مجدد تلاش کنید');
					$("#overlay").addClass('hide');
				}
			}).fail(function (err) {
				var parse = JSON.parse(err);
				$("#overlay").addClass('hide');

				console.log("#subscribeRequest error");
				showErrorMessage("متاسفانه درخواست با خطا مواجه شد لطفا مجددا تلاش نمایید");
			});



		}
	});
});



$("#subscribeConfirm").click(function () {
	if ($("#validcode").val().length != 4) {
		showErrorMessage("لطفا کد 4 رقمی پیامک شده را وارد نمایید");
		return;
	}
	$("#overlay").removeClass('hide');
	pin = $("#validcode").val();
	var settings2 = {
		"url": "http://soft30t.ir/webservices/otp.php?action=confirm&pin=" + pin + "&transcode=" + transactionId + "&otpreference=" + otpreference + "&phoneNum=" + mobileNumber + "&from=" + currentScriptPath() + "&seg=" + urlParams['seg'],
		"method": "GET",
	}

	$.ajax(settings2).done(function (response) {
		console.log(response);
		var parse = JSON.parse(response);
		$("#overlay").addClass('hide');
		if (parse.status == "true") {

			$("#step2").addClass('hide');
			$("#stepCount2").addClass('hide');
			$("#step3").removeClass('hide');

		} else {
			showErrorMessage("کد تایید نادرست وارد شده است");
		}
	}).fail(function (err) {
		console.log("#subscribeConfirm error");
		$("#overlay").addClass('hide');
		showErrorMessage("متاسفانه درخواست با خطا مواجه شد لطفا مجددا تلاش نمایید");
	});

});