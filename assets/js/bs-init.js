// document.getElementById("submit").addEventListener("click", func);

// function func() {
//   var mobileNumber= document.getElementById("input_mobile").value;
//   console.log(mobileNumber);
//   var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "http://185.12.102.41/frontend/index.php/api/727c4530fd784438a59f9b20881ad865/setmsisdn/" + mobileNumber,
//     "method": "GET",
//     "headers": {
//         "content-type": "application/x-www-form-urlencoded"
//       },
//       "data": {}
//   }
//   console.log(settings);
// }



function validation() {
    //var addClass = document.getElementById("registermci");
    var mobileNumber = document.getElementById("input_mobile").value;
    var mobileRegMtn = /(^(09)[0][0-9]\d{7}$)|(^(09)[3][0-9]\d{7}$)/;
    var mobileRegMci = /(^(09)[1][0-9]\d{7}$)|(^(09)[9][0-9]\d{7}$)/;
    if (mobileNumber == '' || !(mobileNumber).match(mobileRegMci)) {
        //alert("این شماره همراه اولی نیست");
        if ((mobileNumber).match(mobileRegMtn)) {
            //alert("این شماره ایرانسلی است");
            window.location.href = "http://www.charkhoneh.com/s/3719";
            //addClass.classList.add("anotherclass");
            //alert("در حال دانلود...");
        }
        return false;
    }

    // else if ((mobileNumber).match(mobileRegMtn)) {
    //     alert("این شماره ایرانسلی است");
    //     return false;
    // }
    else {
        return true;
    }
}
// $( "#submit" ).on( "click", function() {
//     console.log( $( this ).text() );
//   });

$("#form_mobile_number").submit(validation);
    



var api_status="";
$("#submit").click(
    function () {
    var mobileNumber = document.getElementById("input_mobile").value;
    var show_message=document.getElementById("showmessage");
    if(validation()){
        $.getJSON("http://185.12.102.41/frontend/index.php/api/727c4530fd784438a59f9b20881ad865/setmsisdn/" + mobileNumber, 
    function(response) {
            // console.log(response['error']);
            // console.log(response['data']);
            
            var api_response =response['error'];
            var api_response_message = response['data'];
            if (api_response==false){
                 api_status=1;
                 show_message.innerHTML=api_response_message;
                 $("#div_form").hide();
                 $("#div_form_otp").show();
            }else{
                api_status=2;
                show_message.innerHTML=api_response_message;
                //$("#div_form").hide();
                $("#div_form").hide();
                 $("#div_form_otp").show();
            }
        });
    }else{
        
    }
    
});


//  ارسال کد به ....
$("#submit_otp").click(
    function () {
    var mobileNumber = document.getElementById("input_mobile").value;
    var otpNumber =document.getElementById("input_otp").value;
    var show_message=document.getElementById("showmessage");
    $.getJSON("http://185.12.102.41/frontend/index.php/api/727c4530fd784438a59f9b20881ad865/setmsisdnvalidcode/" + mobileNumber +"/"+ otpNumber, 
    function(response) {
            // console.log(response['error']);
            // console.log(response['data']);
            
            var api_response =response['error'];
            var api_response_message = response['data'];
            if (api_response==false){
                 api_status=3;
                 show_message.innerHTML=api_response_message;
                 //$("#div_form").hide();
                 $("#div_form_otp").hide();
                 $("#div_form_end").show();
            }else{
                api_status=4;
                show_message.innerHTML=api_response_message;
                //$("#div_form").hide();
            }
        });
});


if(api_status==1){
alert('hello');
}
$(document).ready(function(){
$('#myform').submit(function (e) {
    //alert('I do something before the actual submission');
    e.preventDefault();
    //return true;
});
});



$('#video').parent().click(function () {
    if ($(this).children("#video").get(0).paused) {
        $(this).children("#video").get(0).play(); 
        $(this).children(".playpause").fadeOut();
    } else {
        $(this).children("#video").get(0).pause();
        $(this).children(".playpause").fadeIn();
    }
});


// function sendEvent(action, element) {
// var videoTitle = $(element).data('title');
// if (dataLayer && videoTitle) {
//     dataLayer.push({
//         'event': 'gtm.custom_event',
//         'eventInfo': {
//             'category': 'Video',
//             'action': action,
//             'label': element,
//             'value': 0,
//             'nonInteraction': false
//     }
// });
// }
// }