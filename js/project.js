
$(document).ready(function(){
    var listProjectUrl = 'https://learn.landsoftapis.com/api/Project/GetAll?UID=1';
    var idToken = localStorage.getItem('idToken');
    var content = ``;
    fetch(listProjectUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + idToken,
        }

    }).then(function(response){
        if(response.status != 200){
            throw Error(status);
        }
        return response.json();
    }).then(function(data){
        //console.log(data);
        data.forEach(element => {
            content += `
            <div  class="col-lg-3 col-sm-6 col-md-6 col-6 my-2">
                <div id="${element.Id}" class="cardProject card shadow-card my-2 w-100 h-100">
                    <img src="${element.ImageUrl}" class="card-img-top" style="height:70%"></img>
                    <div class="card-body">
                        <h4 class="card-title text-primary">${element.Name}</h4>
                    </div>
                </div>
            </div>
            `;
        });
        $('#cardProject').html(content);
        $('.cardProject').on('click', function(){
            localStorage.setItem('srcImg',$(this).children('img').attr('src'));
            localStorage.setItem('Id', $(this).attr('id'));
            $(location).attr('href', './detailProject.html');
        });
        $('.image').prop('src', localStorage.getItem('srcImg'));
    }).catch(function(err){
        //alert('Hết thời gian sử dụng');
        //$(location).attr('href', './index.html');
    });
    
});