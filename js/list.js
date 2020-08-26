
$(document).ready(function(){
    // lấy dữ liệu
    var url = 'https://learn.landsoftapis.com/api/Customer/GetAllWeb';
    var content = ``;
    var idToken = localStorage.getItem('idToken');
    if(idToken == ``){
        $(location).attr('href', './Login.html');
    }
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + idToken,
        },    
    }).then(function(response){
        if(response.status != 200){
            throw Error(response.status);
        }
        return response.json();
    }).then(function(data){
        data.forEach(element => {
            content += `<tr>
                <td>${element.FullName}</td>
                <td>${element.Mobile}</td>
                <td>${element.Email}</td>
                <td>${element.GroupName}</td>
                <td>${element.IDNo}</td>
                <td>${element.DateOfIssue}</td>
                <td>${element.DateOfBithday}</td>
                <td>${element.Address}</td>
                <td>${element.Address2}</td>
                <td>${element.EmployeeName}</td>
                <td>${element.PlaceOfIssue}</td>
                <td>${element.Level}</td>
                <td>${element.Purpose}</td>
                <td>${element.DateOfProcess}</td>
                <td>${element.HowToKnow}</td>
                <td><input type="checkbox" checked === ${element.IsPersonal}></td>
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
       // xảy ra lỗi
    }).catch(function(err){
        alert('Hết thời gian sử dụng');
        $(location).attr('href', './Login.html');
    });
    // thêm mới người dùng 
    // get api tỉnh thành 
   
});