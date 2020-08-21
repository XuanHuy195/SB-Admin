$(document).ready(function () {
  $("#login").on("click", function () {
    var data = {
      phoneNumber: "0979745401",
      mode: "dev",
      type: "em",
      cksum: "string",
      dKey: "string",
    };
    // $.ajax({
    //     type:'post',
    //     url: 'https://learn.landsoftapis.com/api/accounts/verifyOTP',
    //     //headers: {  'Access-Control-Allow-Origin': 'https://learn.landsoftapis.com/api/accounts/verifyOTP' },
    //     data: JSON.stringify(data),
    //     dataType: 'jsonp',
    //     contentType: "application/json; charset=uft-8",
    //     success: function (data) {
    //         debugger
    //     },
    //     error: function (jqXHR, textStatus, errorThrown) {
    //       debugger;
    //       console.log(jqXHR, textStatus, errorThrown)
    //     }
    // });
    // var result = postJson("https://learn.landsoftapis.com/api/accounts/verifyOTP");
    // result.then(res => {
    //   debugger;
    // });
    // result.catch((err) => {
    //   debugger;
    // })
    fetch("https://learn.landsoftapis.com/api/accounts/verifyOTP", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      mode: "no-cors",
      body: {
        phoneNumber: "0979745401",
        mode: "dev",
        type: "em",
        cksum: "string",
        dKey: "string",
      },
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => alert("Error detected: " + error));
  });
});
// var postJson = async function (url) {
//   const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json, text/plain',
//         'Content-Type': 'application/json;charset=UTF-8'
//       },
//       body: {
//         "phoneNumber": "0979745401",
//         "otpCode": "@dip@123",
//         "type": "em",
//         "cksum": "string",
//         "dKey": "string"
//         },
//       mode: 'no-cors',
//       credentials: 'same-origin'
//   });
//   return await response.Json();
// }
