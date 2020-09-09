
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
        console.log(data);
        data.forEach(element => {
            content += `
            <div class="col-lg-3 col-sm-6 col-md-6 col-6 my-2">
                <div class="card shadow shadow-card my-2 w-100 h-100">
                    <img src="${element.ImageUrl}" class="card-img-top" style="width:100%"></img>
                    <div class="card-body">
                        <h4 class="card-title text-primary">${element.Name}</h4>
                    </div>
                </div>
            </div>
            `;
        });
        $('#cardProject').html(content);
    });
});