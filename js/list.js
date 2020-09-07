
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
       //
       $('#table tbody tr').on('click', function () {
        var id = $(this).attr('id');
        var getUrl = 'https://learn.landsoftapis.com/api/Customer/Get?Id='+id;
        fetch(getUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + idToken,
                },    
        }).then(function(response){
            if(response.status != 200){
                throw Error(status);
            }
            return response.json();
        }).then(function(data){
                $('#firstName').val(data.FirstName);
                $('#lastName').val(data.LastName);
                $('#phone').val(data.Mobile);
                $('#email').val(data.Email);
                $('#position').val(data.Position);
                $('#iDNo').val(data.IDNo);
                $('#dateOfIssue').val(data.DateOfIssue);
                $('#placeOfIssue').val(data.PlaceOfIssue);
                $('#dataOfBirth').val(data.DateOfBirth);
                $('#address1').val(data.Address1);
                $('#address2').val(data.Address2);
                $('#companyName').val(data.CompanyName);
                $('#companyTaxCode').val(data.CompanyTaxCode);
                $('#companyAddress').val(data.CompanyAddress);
                $('#jobId2').find("option[value="+data.JobId+"]").attr('selected', true);
                $('#groupId2').find("option[value="+data.GroupId+"]").attr('selected', true);
        }).catch(function(err){
            console.log(err);
            
        });
        var UpdateUrl = 'https://learn.landsoftapis.com/api/Customer/Update?Id='+id;
        $('#update').on('click', function(){
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
            var groupId2 = parseInt($('#groupId2').find(':selected').val());
            var jobId2 = parseInt($('#jobId2').find(':selected').val());
            if(firstName == ``){
                $('.errFirstName').removeClass('d-none');
                $('#firstName').addClass('is-invalid');
                $('.modal').scrollTop(0);
                return;
            } else {
                $('.errFirstName').addClass('d-none');
                $('#firstName').removeClass('is-invalid');
                $('.modal').scrollTop(0);
            }
            if(lastName == ``){
                $('.errLastName').removeClass('d-none');
                $('#lastName').addClass('is-invalid');
                $('.modal').scrollTop(0);
                return;
            } else {
                $('.errLastName').addClass('d-none');
                $('#lastName').removeClass('is-invalid');
                $('.modal').scrollTop(0);
            }
            if(phone == ``){
                $('.errPhone').removeClass('d-none');
                $('#phone').addClass('is-invalid');
                $('.modal').scrollTop(0);
                return;
            } else {
                $('.errPhone').addClass('d-none');
                $('#phone').removeClass('is-invalid');
                $('.modal').scrollTop(0);
            }
            if(email == ``){
                $('.errEmail').removeClass('d-none');
                $('#email').addClass('is-invalid');
                $('.modal').scrollTop(0);
                return;
            } else {
                $('.errEmail').addClass('d-none');
                $('#email').removeClass('is-invalid');
                $('.modal').scrollTop(0);
            }
            var data = {
                "LastName": lastName,
                "FirstName": firstName,
                "ShortName": "string",
                "Mobile": phone,
                "GroupId": (groupId2),
                "Address1": address1,
                "Address2": address2,
                "IDNo": iDNo,
                "yyyy2": dateOfIssue,
                "PlaceOfIssue": placeOfIssue,
                "JobId": (jobId2),
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
                
            }
            fetch(UpdateUrl, {
                method: 'PUT',
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + idToken,
                },
                body: JSON.stringify(data)
            }).then(function(response){
                if(response.status != 200){
                    throw Error(status);
                }
                return response.json();
            }).then(function(data){
                alert('Cập nhật tài khoản thành công!');
                console.log('Success!');
            }).catch(function(err){
                alert('Cập nhật thất bại xin thử lại!');
                console.log(err);
            });
        });
        var delUrl = 'https://learn.landsoftapis.com/api/Customer/Delete?Id='+id;
        $('#del').on('click', function(){
            fetch(delUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + idToken,
                },
            }).then(function(response){
                if(response.status != 200){
                    throw Error(status);
                }
            }).then(function(data){
                alert('Xóa tài khoản thành công!');
                console.log('Success!')
            }).catch(function(err){
                alert('Không thể xóa tài khoản này!');
            });
        });
    });
       // xảy ra lỗi
    }).catch(function(err){
        alert('Hết thời gian sử dụng');
        $(location).attr('href', './Login.html');
    });
    // get job list
    var jobList = ``;
    var jobListUrl = 'https://learn.landsoftapis.com/api/Customer/JobGetList';
    fetch(jobListUrl, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + idToken,
        }
    }).then(function(response){
        if(response.status != 200){
            throw Error(status);
        }
        return response.json();
    }).then(function(data){
        data.forEach(element => {
            jobList += `
                <option value = '${element.Id}'>${element.Name}</option>
            `;
        });
        $('#jobId').html(jobList);
        $('#jobId2').html(jobList);

    }).then(function(err){
        console.log(err);
    })
    //get group list
    var groupList = ``;
    var groupListUrl = 'https://learn.landsoftapis.com/api/Customer/GroupGetList';
    fetch(groupListUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ idToken,
        }
    }).then(function(response){
        if(response.status != 200){
            throw Error(status);
        }

        return response.json();
    }).then(function(data){
        data.forEach(element => {
            groupList += `
                <option value='${element.Id}'>${element.Name}</option>
            `;
        });
        $('#groupId').html(groupList);
        $('#groupId2').html(groupList);

    }).then(function(err){
        console.log(err);
    })
    // thêm mới người dùng 
    var addUrl = 'https://learn.landsoftapis.com/api/Customer/Insert';
    $('#submit').on('click', function(){
        var firstName = $('#firstNameNew').val();
        var lastName = $('#lastNameNew').val();
        var phone = $('#phoneNew').val();
        var email = $('#emailNew').val();
        var position = $('#positionNew').val();
        var iDNo = $('#iDNoNew').val();
        var dateOfIssue = $('#dateOfIssueNew').val();
        var placeOfIssue = $('#placeOfIssueNew').val();
        var dataOfBirth = $('#dataOfBirthNew').val();
        var address1 = $('#address1New').val();
        var address2 = $('#address2New').val();
        var companyName = $('#companyNameNew').val();
        var companyTaxCode = $('#companyTaxCodeNew').val();
        var companyAddress = $('#companyAddressNew').val();
        var groupId = parseInt($('#groupId').find(':selected').val());
        var jobId = parseInt($('#jobId').find(':selected').val());
        if(firstName == ``){
            $('.errFirstName').removeClass('d-none');
            $('#firstNameNew').addClass('is-invalid');
            $('.modal').scrollTop(0);
            return;
        } else {
            $('.errFirstName').addClass('d-none');
            $('#firstNameNew').removeClass('is-invalid');
            $('.modal').scrollTop(0);
        }
        if(lastName == ``){
            $('.errLastName').removeClass('d-none');
            $('#lastNameNew').addClass('is-invalid');
            $('.modal').scrollTop(0);
            return;
        } else {
            $('.errLastName').addClass('d-none');
            $('#lastNameNew').removeClass('is-invalid');
            $('.modal').scrollTop(0);
        }
        if(phone == ``){
            $('.errPhone').removeClass('d-none');
            $('#phoneNew').addClass('is-invalid');
            $('.modal').scrollTop(0);
            return;
        } else {
            $('.errPhone').addClass('d-none');
            $('#phoneNew').removeClass('is-invalid');
            $('.modal').scrollTop(0);
        }
        if(email == ``){
            $('.errEmail').removeClass('d-none');
            $('#emailNew').addClass('is-invalid');
            $('.modal').scrollTop(0);
            return;
        } else {
            $('.errEmail').addClass('d-none');
            $('#emailNew').removeClass('is-invalid');
            $('.modal').scrollTop(0);
        }
        var data = {
            "LastName": lastName,
            "FirstName": firstName,
            "ShortName": "string",
            "Mobile": phone,
            "GroupId": (groupId),
            "Address1": address1,
            "Address2": address2,
            "yyyy2": dateOfIssue,
            "PlaceOfIssue": placeOfIssue,
            "JobId": (jobId),
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
            alert('Thêm mới khách hàng thành công!');
            console.log('Success!');
        }).catch(function(err){
            alert('Số điện thoại đã tồn tại xin thử lại!');
            console.log(err);
        });
    }); 
    $('.exit').on('click', function(){
        location.reload();
    });
    
});