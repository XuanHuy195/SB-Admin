
$(document).ready(function(){
    //get Param url
    //const params = new URLSearchParams(window.location.search);
    var params = window.location.search;
    
    // lấy dữ liệu
    var url = 'https://learn.landsoftapis.com/api/Customer/GetAllWeb'+ params;
    var content = ``;
    var idToken = localStorage.getItem('idToken');
    if(idToken == ``){
        $(location).attr('href', './Login.html');
    }
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + idToken,
        },    
    }).then(function(response){
        if(response.status != 200){
            throw Error(response.status);
        }
        return response.json();
    }).then(function(data){
        console.log(data);
        data.forEach(element => {
            content += `<tr id="${element.Id}" role="button" data-toggle="modal" data-target="#detailModal">
                <td id='FullName'>${element.FullName}</td>
                <td id='Mobile'>${element.Mobile}</td>
                <td id='Email'>${element.Email}</td>
                <td id='GroupName'>${element.GroupName}</td>
                <td id='IDNo'>${element.IDNo}</td>
                <td id='DateOfIssue'>${element.DateOfIssue}</td>
                <td id='PlaceOfIssue'>${element.PlaceOfIssue}</td>
                <td id='DateOfBithday'>${element.DateOfBithday}</td>
                <td id='Address'>${element.Address}</td>
                <td id='Address2'>${element.Address2}</td>
                <td id='IsPersonal'>${element.IsPersonal}</td>
                <td id='HowToKnow'>${element.HowToKnow}</td>
                <td id='Level'>${element.Level}</td>
                <td id='Purpose'>${element.Purpose}</td>
                <td id='DateOfProcess'>${element.DateOfProcess}</td>
                <td id='Description'>${element.Description}</td>
                <td id='EmployeeName'>${element.EmployeeName}</td>
            <tr>
            `;
           
        });
        
        $('#body').html(content);


        // tìm kiếm dữ liệu
       $('#search').keyup(function(){
            search_table($(this).val());
       });
       function search_table(value){
           $('#body tr').each(function(){
                var check = 'false';
            $(this).each(function(){
                if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){
                    check ='true';
                }
                if(check == 'true'){
                    $(this).show();
                }else {
                    $(this).hide();
                }
            });
           });
       }
       //get element
        $('#table tbody tr').on('click', function () {
            console.log($(this).children('#Address').text());
            var content = `
                


            `;
        });
       // xảy ra lỗi
    }).catch(function(err){
        alert('Hết thời gian sử dụng');
        $(location).attr('href', './Login.html');
    });
    
    // thêm mới người dùng 
    var addUrl = 'https://learn.landsoftapis.com/api/Customer/Insert';
    $('#submit').on('click', function(){
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var position = $('#position').val();
        var iDNo = $('#iDNo').val();
        var dateOfIssue = $('#dateOfIssue').val();
        var placeOfIssue = $('#placeOfIssue').val();
        var dataOfBirth = $('#dataOfBirth').val();
        var address1 = $('#address1').val();
        var address2 = $('#address2').val();
        var companyName = $('#companyName').val();
        var companyTaxCode = $('#companyTaxCode').val();
        var companyAddress = $('#companyAddress').val();
        var data = {
            "LastName": firstName,
            "FirstName": lastName,
            "ShortName": "string",
            "Mobile": phone,
            "GroupId": 0,
            "Address1": address1,
            "Address2": address2,
            "yyyy2": dateOfIssue,
            "PlaceOfIssue": placeOfIssue,
            "JobId": 0,
            "Company": companyName,
            "Position": position,
            "Email": email,
            "Note": '',
            "StaffId": 0,
            "dd": "string",
            "MM": "string",
            "yyyy": dataOfBirth,
            "IsPersonal": true,
            "CompanyName": companyName,
            "CompanyTaxCode": companyTaxCode,
            "CompanyAddress": companyAddress,
            "UID": iDNo,
      };
        fetch(addUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken,
            },
            body: JSON.stringify(data),
        }).then(function(response){
            if(response.status != 200){;
                throw Error(response.status);
            }
            return response;
        }).then(function(response){
            console.log('Success!');
        }).catch(function(err){
            console.log(err);
        });
    }); 

});