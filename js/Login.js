$(document).ready(function () {
  var requestUrl = "https://learn.landsoftapis.com/api/accounts/requestOTP";
  var verifyUrl = "https://learn.landsoftapis.com/api/accounts/verifyOTP";
  // Nhập số điện thoại và kiểm tra
  $("#login").on("click", function () {
    $('#loading-animation').removeClass('d-none');
    $('#loading').addClass('disabledbutton');
    var phone = $("#phone").val();
    var data1 = {
      'phoneNumber': phone,
      'mode': "dev",
      'type': "em",
      'cksum': "string",
      'dKey': "string",
    };
    fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    })
      .then(function (response) {
        
        if (response.status != 200) {
          throw Error(response.status);
        }
        return response;
      })
      .then(function (response) {
        localStorage.setItem('phone', phone);
        console.log("Success!");
        $(location).attr('href', './validLogin.html');
      })
      .catch(function (error) {
        $("#loading-animation").addClass('d-none');
        $('#loading').removeClass('disabledbutton');
        $("#phone").val(``);
        $("#error").removeClass('d-none');
        console.log(error);
      });
      
  });
  // Nhập mã xác thực và kiểm tra
  $("#valid").on('click', function () {
    $('#loading-animation').removeClass('d-none');
    $('#loading').addClass('disabledbutton');
    var phone = localStorage.getItem('phone');
    var otpCode = $("#otpCode").val();
    var data2 = {
      'phoneNumber': phone,
      'otpCode': otpCode,
      'type': "em",
      'cksum': "string",
      'dKey': "string",
    };
    fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    })
    .then(function(response){
      if(response.status != 200){
        throw Error(response.status);
      }
      
      return response.json();
    }).then(function(response){
      localStorage.setItem('otpCode', otpCode);
      localStorage.setItem('idToken', response.idToken);
      $(location).attr('href', './home.html');
    }).catch(function(error){
      $("#loading-animation").addClass('d-none');
      $('#loading').removeClass('disabledbutton');
      $("#otpCode").val(``);
      $("#errValid").removeClass('d-none');
      console.log(error);
    });
  });
  
});
