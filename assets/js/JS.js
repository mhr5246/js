
$serverUrl      =   'XXX';
$authKey        =   "XXXX";

$action         =   "setmsisdn";
$action_otp     =   "setmsisdnvalidcode";

$mobile         =   str_replace(' ', '', ((isset($_REQUEST['phone']) and $_REQUEST['phone'] <> '') ? $_REQUEST['phone'] : ''));
$otpValue       =   ((isset($_REQUEST['otp']) and $_REQUEST['otp'] <> '') ? $_REQUEST['otp'] : '');

$url            =   "http://" . $serverUrl . "/frontend/index.php/api/" . $authKey . "/" . $action . "/" . $mobile;
$url_otp2       =   "http://" . $serverUrl . "/frontend/index.php/api/" . $authKey . "/" . $action_otp . "/" . $mobile . "/" . $otpValue;
$url_otp = str_replace(' ', '', $url_otp2);


$(document).ready(function () {



	$("#submit").click(function () {
		var $this = $(this);
		mobileNumber = $("#input_mobile").val();

		if (mobileNumber.length != 11 || !mobileNumber.toString().startsWith("09")) {
			console.log("لطفا شماره موبایل خود را به صورت صحیح وارد نمایید");
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
			console.log("لطفا شماره موبایل همراه اول خود را وارد نمایید");
			return;
		} else {
			$("#overlay").removeClass('hide');
			var settings = {
				"url": "http://185.12.102.41/frontend/index.php/api/727c4530fd784438a59f9b20881ad865/setmsisdn/" + mobileNumber,
				"method": "POST",
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
					console.log('ارسال کد ناموفق بود لطفا مجدد تلاش کنید');
					$("#overlay").addClass('hide');
				}
			}).fail(function (err) {
				var parse = JSON.parse(err);
				$("#overlay").addClass('hide');

				console.log("#subscribeRequest error");
				console.log("متاسفانه درخواست با خطا مواجه شد لطفا مجددا تلاش نمایید");
			});



		}
	});
});