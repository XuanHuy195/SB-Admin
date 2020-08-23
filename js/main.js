$(document).ready(function () {
  var requestUrl = "https://learn.landsoftapis.com/api/accounts/requestOTP";
  var verifyUrl = "https://learn.landsoftapis.com/api/accounts/verifyOTP";
  $("#login").on("click", function () {
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
        // console.log(response.status);
        // console.log(response.type);
        // console.log(response.url);
        if (response.status != 200) {
          throw Error(response.status);
        }
        return response;
      })
      .then(function (response) {
        localStorage.setItem('phone', phone);
        console.log("Success!");
        $(location).attr('href', './ValidLogin.html');
      })
      .catch(function (error) {
        $("#error").removeClass('d-none');
        console.log(error);
      });
      
  });
  $("#valid").on('click', function () {
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
      return response;
    }).then(function(response){
      localStorage.setItem('otpCode', otpCode);
      console.log("Success!");
      $(location).attr('href', './Index.html');
    }).catch(function(error){
      $("#errValid").removeClass('d-none');
      console.log(error);
    });
  });

});

